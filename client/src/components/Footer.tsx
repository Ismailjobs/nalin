'use client';

import Link from 'next/link';
import { MapPin, Clock, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const address = 'Wilheminenstraße 69, 1160 Wien';
const hours = ['Mon–Fri: 10:30–22:00', 'Sat–Sun: 12:00–22:00'];
const phone = '+43 1 481 88 21';
const email = 'info@nalin.at';
const social = [
  { name: 'Facebook', href: 'https://www.facebook.com', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const base = `/${locale}`;
  return (
    <footer className="w-full border-t border-charcoal/10 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl font-semibold tracking-wide text-charcoal">Nalin</h3>
            <p className="mt-3 font-sans text-sm text-charcoal-muted">{t.tagline}</p>
          </div>
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-orange">
              {t.address}
            </h4>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2 font-sans text-sm text-charcoal-muted transition-colors hover:text-orange"
            >
              <MapPin size={18} className="mt-0.5 shrink-0" />
              {address}
            </a>
          </div>
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-orange">
              {t.hours}
            </h4>
            <div className="mt-3 flex items-start gap-2 font-sans text-sm text-charcoal-muted">
              <Clock size={18} className="mt-0.5 shrink-0" />
              <div>
                {hours.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-orange">
              {t.contact}
            </h4>
            <div className="mt-3 space-y-2 font-sans text-sm text-charcoal-muted">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-orange">
                <Phone size={18} className="shrink-0" />
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors hover:text-orange">
                <Mail size={18} className="shrink-0" />
                {email}
              </a>
            </div>
            <div className="mt-4 flex gap-4">
              {social.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal-muted transition-colors hover:text-orange"
                  aria-label={name}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-charcoal/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans text-xs text-charcoal-muted">
              © {new Date().getFullYear()} Nalin Wien. {t.rights}
            </p>
            <Link
              href={`${base}/impressum`}
              className="font-sans text-xs text-charcoal-muted transition-colors hover:text-orange"
            >
              {t.impressum}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
