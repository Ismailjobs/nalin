'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, ShoppingBag } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const ORDER_LINKS = [
  { key: 'orderOnlineFoodora' as const, url: 'https://www.foodora.at/restaurant/baev/nalin-keepup-1160', image: '/foodora.jpg' },
  { key: 'orderOnlineLieferando' as const, url: 'https://www.lieferando.at/speisekarte/nalin-kebap-und-mehr#kategorie_ffbac4ab-145a-490e-a7a9-a6c05fe9e821', image: '/lieferando.jpg' },
  { key: 'orderOnlineWolt' as const, url: 'https://wolt.com/de-at/aut/vienna/restaurant/nalin-16?no_universal_links=true', image: '/wolt.jpg' },
] as const;

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const base = `/${locale}`;
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOrderMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
          className="mt-8 flex flex-col items-center justify-center"
          ref={dropdownRef}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center gap-2 border-2 border-orange bg-orange px-8 py-3.5 font-serif text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-orange-dark hover:border-orange-dark"
            >
              {t.cta}
              <ChevronRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setOrderMenuOpen((o) => !o); }}
              className="inline-flex items-center gap-2 border-2 border-white/90 bg-white/10 px-8 py-3.5 font-serif text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-expanded={orderMenuOpen}
              aria-haspopup="true"
            >
              {t.orderOnline}
              <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${orderMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {orderMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 flex items-center justify-center px-4"
              >
                <div
                  className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
                  aria-hidden
                  onClick={() => setOrderMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative z-10 w-full max-w-[320px]"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/20 bg-cream-bright shadow-2xl shadow-charcoal/40 ring-2 ring-white/10">
                    <div className="flex items-center gap-3 border-b border-charcoal/10 bg-gradient-to-b from-white/70 to-white/40 px-5 py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange/15 text-orange">
                        <ShoppingBag size={18} strokeWidth={2} />
                      </span>
                      <p className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/80">
                        {t.orderOnline}
                      </p>
                    </div>
                    <ul className="divide-y divide-charcoal/5 p-3">
                      {ORDER_LINKS.map((item) => (
                        <li key={item.key} className={item.key === 'orderOnlineFoodora' ? 'mb-4' : ''}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center py-3 transition-opacity hover:opacity-80 active:opacity-70"
                          >
                            {'image' in item && item.image ? (
                              <Image
                                src={item.image}
                                alt=""
                                width={item.key === 'orderOnlineWolt' ? 88 : 120}
                                height={item.key === 'orderOnlineWolt' ? 35 : 48}
                                className="object-contain"
                              />
                            ) : (
                              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-charcoal/8">
                                <ChevronRight size={24} strokeWidth={2.5} className="text-orange" />
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
