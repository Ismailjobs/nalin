import { Router, Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import { transporter, isEmailConfigured } from '../lib/email.js';

const router = Router();

const RECIPIENT = process.env.CONTACT_EMAIL || 'office@nalin.at';

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

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const raw = req.body as ContactBody;

  const name = typeof raw.name === 'string' ? sanitize(raw.name) : '';
  const email = typeof raw.email === 'string' ? sanitize(raw.email) : '';
  const subject = typeof raw.subject === 'string' ? sanitize(raw.subject) : '';
  const message = typeof raw.message === 'string' ? sanitize(raw.message) : '';
  const captchaToken = typeof raw.captchaToken === 'string' ? raw.captchaToken : '';

  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: 'Name, email and message are required' });
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
    console.warn('Brevo SMTP not configured; skipping email send');
    res.json({ success: true, message: 'Message received (email not sent)' });
    return;
  }

  try {
    await transporter!.sendMail({
      from: process.env.BREVO_SMTP_FROM || (process.env.BREVO_SMTP_USER ?? 'noreply@nalin.at'),
      to: RECIPIENT,
      replyTo: email,
      subject: subject ? `[Nalin] ${subject}` : `[Nalin] Nachricht von ${name}`,
      text: `Von: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>Von:</strong> ${sanitizeHtml(name)} &lt;${sanitizeHtml(email)}&gt;</p>
        ${subject ? `<p><strong>Betreff:</strong> ${sanitizeHtml(subject)}</p>` : ''}
        <hr />
        <p>${sanitizeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });
    res.json({ success: true, message: 'Message sent' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

export { router as contactRouter };
