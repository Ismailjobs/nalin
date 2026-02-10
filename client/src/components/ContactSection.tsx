'use client';

import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

export function ContactSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.contact;
  return (
    <section id="kontakt" className="w-full border-t border-charcoal/10 bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-2 text-charcoal-muted">{t.subtitle}</p>
        </motion.div>
        <div className="flex justify-start">
          <ContactForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
