import nodemailer from 'nodemailer';

const host = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const port = Number(process.env.BREVO_SMTP_PORT) || 587;
const user = process.env.BREVO_SMTP_USER;
const pass = process.env.BREVO_SMTP_PASS;

export const transporter =
  user && pass
    ? nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: { user, pass },
      })
    : null;

export function isEmailConfigured(): boolean {
  return Boolean(transporter);
}
