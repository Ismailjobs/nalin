import { Router, Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import { sendContactEmail, sendConfirmationEmail, isEmailConfigured } from '../lib/email.js';

const router = Router();

/** Formdan gelen mailler bu adrese gider (Brevo ile). */
const RECIPIENT = process.env.CONTACT_EMAIL || 'office@nalin.at';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

export interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaToken: string;
}

function sanitize(str: string): string {
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} }).trim();
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= MAX_EMAIL;
}

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const raw = req.body as ContactBody;

  const name = typeof raw.name === 'string' ? sanitize(raw.name).slice(0, MAX_NAME) : '';
  const email = typeof raw.email === 'string' ? sanitize(raw.email).slice(0, MAX_EMAIL) : '';
  const subject = typeof raw.subject === 'string' ? sanitize(raw.subject).slice(0, MAX_SUBJECT) : '';
  const message = typeof raw.message === 'string' ? sanitize(raw.message).slice(0, MAX_MESSAGE) : '';
  const captchaToken = typeof raw.captchaToken === 'string' ? raw.captchaToken : '';

  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: 'Name, email and message are required' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ success: false, error: 'Invalid email address' });
    return;
  }

  const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
  if (HCAPTCHA_SECRET && !captchaToken) {
    res.status(400).json({ success: false, error: 'Captcha is required' });
    return;
  }
  if (HCAPTCHA_SECRET) {
    const form = new URLSearchParams();
    form.set('secret', HCAPTCHA_SECRET);
    form.set('response', captchaToken);
    const verifyRes = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(() => null);
    const data = verifyRes ? (await verifyRes.json()) as { success?: boolean } : {};
    if (!data.success) {
      res.status(400).json({ success: false, error: 'Invalid or expired captcha' });
      return;
    }
  }

  if (!isEmailConfigured()) {
    console.warn('Brevo API key not configured; skipping email send');
    res.json({ success: true, message: 'Message received (email not sent)' });
    return;
  }

  const emailSubject = subject ? `[Nalin] ${subject}` : `[Nalin] Nachricht von ${name}`;
  const textContent = `Von: ${name} <${email}>\n\n${message}`;
  const htmlContent = `
    <p><strong>Von:</strong> ${sanitizeHtml(name)} &lt;${sanitizeHtml(email)}&gt;</p>
    ${subject ? `<p><strong>Betreff:</strong> ${sanitizeHtml(subject)}</p>` : ''}
    <hr />
    <p>${sanitizeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  try {
    await sendContactEmail({
      to: RECIPIENT,
      replyTo: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });
    // Formu dolduran kişiye onay maili (hata olsa bile ofise giden mail gitti sayılır)
    sendConfirmationEmail(email, name).catch((err) =>
      console.error('Confirmation email error:', err)
    );
    res.json({ success: true, message: 'Message sent' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

export { router as contactRouter };
