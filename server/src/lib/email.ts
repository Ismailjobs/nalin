const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export function isEmailConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}

export interface SendContactEmailParams {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

interface SendMailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

async function sendMail(params: SendMailParams): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY not set');
  const fromEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@nalin.at';
  const fromName = process.env.BREVO_SENDER_NAME || 'Nalin - Keep Up';
  const payload: Record<string, unknown> = {
    sender: { name: fromName, email: fromEmail },
    to: [{ email: params.to }],
    subject: params.subject,
    htmlContent: params.html,
    textContent: params.text,
  };
  if (params.replyTo) payload.replyTo = { email: params.replyTo };
  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo API ${res.status}: ${err}`);
  }
}

export async function sendContactEmail(params: SendContactEmailParams): Promise<void> {
  await sendMail({
    to: params.to,
    replyTo: params.replyTo,
    subject: params.subject,
    text: params.text,
    html: params.html,
  });
}

/** Formu dolduran kişiye "Mesajınız alındı" onay maili (Almanca, Nalin - Keep Up tasarımı). */
export async function sendConfirmationEmail(to: string, recipientName: string): Promise<void> {
  const name = recipientName || 'Sie';
  const subject = 'Ihre Nachricht wurde erhalten – Nalin - Keep Up';
  const text = `Hallo ${name},\n\nvielen Dank für Ihre Nachricht. Wir haben sie erhalten und melden uns in Kürze bei Ihnen.\n\nMit freundlichen Grüßen\nIhr Nalin - Keep Up Team`;
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nachricht erhalten</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0e8; font-family: Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 480px; background-color:#ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
          <tr>
            <td style="background: linear-gradient(135deg, #c45c26 0%, #a84a1e 100%); padding: 28px 32px; text-align: center;">
              <span style="font-size: 20px; font-weight: bold; letter-spacing: 0.08em; color: #ffffff;">Nalin – Keep Up</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 28px; color: #2c2c2c; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 16px; font-size: 18px;">Hallo ${escapeHtml(name)},</p>
              <p style="margin: 0 0 20px;">vielen Dank für Ihre Nachricht. Wir haben sie erhalten und melden uns in Kürze bei Ihnen.</p>
              <p style="margin: 0; color: #6b6b6b; font-size: 14px;">Bei Rückfragen erreichen Sie uns unter <a href="mailto:office@nalin.at" style="color: #c45c26; text-decoration: none;">office@nalin.at</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 28px; border-top: 1px solid #eee; text-align: center; color: #8a8a8a; font-size: 12px;">
              Mit freundlichen Grüßen<br>Ihr Nalin – Keep Up Team
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
  await sendMail({ to, subject, text, html });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
