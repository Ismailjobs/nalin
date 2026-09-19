'use client';

import { motion } from 'framer-motion';
import type { Dictionary } from '@/i18n/get-dictionary';

const PARTNER_URL = 'https://sofortentrumpelung.at';

export function TipSection({ dict }: { dict: Dictionary }) {
  const t = dict.homeTip;
  return (
    <section className="w-full border-t border-charcoal/10 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
            {t.title}
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal-muted md:text-base">
            {t.beforeLink}{' '}
            <a
              href={PARTNER_URL}
              target="_blank"
              rel="noopener"
              className="font-medium text-orange underline decoration-orange/40 underline-offset-2 transition-colors hover:text-orange-dark hover:decoration-orange"
            >
              {t.linkText}
            </a>
            {t.afterLink}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
