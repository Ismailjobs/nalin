'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const base = `/${locale}`;
  return (
    <section className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[calc(50%-90px)_center] md:bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-charcoal/40" aria-hidden />
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        <motion.p
          className="font-serif text-sm italic tracking-wide text-white/90 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.qualitySlogan}
        </motion.p>
        <motion.h1
          className="mt-3 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          className="mt-4 font-sans text-base text-white/85 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href={`${base}/menu`}
            className="group inline-flex items-center gap-2 border-2 border-orange bg-orange px-8 py-3.5 font-serif text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-orange-dark hover:border-orange-dark"
          >
            {t.cta}
            <ChevronRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
