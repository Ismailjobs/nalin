'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import type { Dictionary } from '@/i18n/get-dictionary';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || '';

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const captchaRef = useRef<HCaptcha>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const subject = (data.get('subject') as string)?.trim();
    const message = (data.get('message') as string)?.trim();
    const token = data.get('captchaToken') as string;

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage(t.errorRequired);
      return;
    }
    const hasRealCaptcha = !!process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;
    if (!token && hasRealCaptcha) {
      setStatus('error');
      setErrorMessage(t.errorCaptcha);
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          captchaToken: token || '',
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setStatus('success');
        form.reset();
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus('error');
        setErrorMessage(json.error || t.errorSend);
      }
    } catch {
      setStatus('error');
      setErrorMessage(t.errorNetwork);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-charcoal-muted">
            {t.name} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-charcoal/20 bg-cream-bright px-4 py-3 font-sans text-charcoal placeholder:text-charcoal-muted/60 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
            placeholder={t.namePlaceholder}
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-charcoal-muted">
            {t.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-charcoal/20 bg-cream-bright px-4 py-3 font-sans text-charcoal placeholder:text-charcoal-muted/60 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
            placeholder={t.emailPlaceholder}
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-charcoal-muted">
            {t.subject}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full border border-charcoal/20 bg-cream-bright px-4 py-3 font-sans text-charcoal placeholder:text-charcoal-muted/60 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
            placeholder={t.subjectPlaceholder}
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal-muted">
            {t.message} *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full resize-y border border-charcoal/20 bg-cream-bright px-4 py-3 font-sans text-charcoal placeholder:text-charcoal-muted/60 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
            placeholder={t.messagePlaceholder}
            disabled={status === 'sending'}
          />
        </div>
        <div>
          {SITEKEY ? (
            <>
              <HCaptcha
                ref={captchaRef}
                sitekey={SITEKEY}
                onVerify={(token) => {
                  const input = document.querySelector('input[name="captchaToken"]') as HTMLInputElement;
                  if (input) input.value = token;
                }}
                onExpire={() => {
                  const input = document.querySelector('input[name="captchaToken"]') as HTMLInputElement;
                  if (input) input.value = '';
                }}
                theme="light"
              />
              <input type="hidden" name="captchaToken" />
            </>
          ) : (
            <p className="rounded border border-charcoal/15 bg-charcoal/5 px-3 py-2 text-sm text-charcoal-muted">
              <code className="font-mono text-xs">NEXT_PUBLIC_HCAPTCHA_SITEKEY</code> in <code className="font-mono text-xs">client/.env.local</code> eintragen, dann Dev-Server neu starten.
            </p>
          )}
        </div>
        {status === 'success' && (
          <p className="text-sm text-green-500">{t.success}</p>
        )}
        {status === 'error' && errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-2 border-2 border-orange bg-orange px-8 py-3.5 font-serif text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-orange-dark disabled:opacity-50"
        >
          {status === 'sending' ? t.sending : t.send}
        </button>
      </form>
    </motion.div>
  );
}
