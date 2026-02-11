'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/featured';
import { getMenuItemTranslation } from '@/data/menu-translations';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { ImageWithLoading } from '@/components/ImageWithLoading';

export function FeaturedProducts({ dict, locale }: { dict: Dictionary; locale: string }) {
  const t = dict.home;
  const base = `/${locale}`;
  const menuHref = `${base}/menu`;
  const localeTyped = locale as Locale;
  return (
    <section className="relative w-full overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divider-orange mb-6 max-w-[120px]" aria-hidden />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl font-bold tracking-wide text-charcoal md:text-5xl lg:text-6xl"
        >
          {t.beliebt}
        </motion.h2>
        <p className="mt-4 font-sans text-lg text-charcoal-muted md:text-xl">
          {t.viewMenuLabel}
        </p>
        <div className="mt-16 grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => {
            const tr = getMenuItemTranslation(localeTyped, product.id);
            const name = tr?.name ?? product.name;
            const description = tr?.description ?? product.description;
            return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-charcoal/10 bg-cream-bright shadow-lg transition-all duration-300 hover:shadow-xl hover:border-orange/30 hover:-translate-y-2"
            >
              <div className="relative z-10 h-[320px] sm:h-[340px] md:h-[380px] lg:h-[400px]">
                <div className="h-full w-full overflow-hidden">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <ImageWithLoading
                      src={product.image}
                      alt={name}
                      containerClassName="relative h-full w-full overflow-hidden bg-cream"
                      className="object-cover opacity-95"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.img-fallback')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'img-fallback absolute inset-0 flex items-center justify-center bg-orange-muted text-5xl';
                          fallback.innerHTML = '🍽️';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </motion.div>
                </div>
                <div
                  className="absolute bottom-0 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-4 border-orange bg-cream-bright shadow-lg"
                >
                  <UtensilsCrossed className="h-7 w-7 text-orange" strokeWidth={2} />
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col items-center border-t-2 border-charcoal/10 px-6 pb-8 pt-12 sm:px-8">
                <h3 className="text-center font-serif text-2xl font-bold tracking-wide text-charcoal md:text-3xl">
                  {name}
                </h3>
                <div className="mt-4 h-1 w-14 shrink-0 rounded-full bg-orange" aria-hidden />
                <p className="mt-4 text-center font-sans text-base leading-relaxed text-charcoal-muted line-clamp-2 md:text-lg">
                  {description}
                </p>
              </div>
            </motion.article>
          );
          })}
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            href={menuHref}
            className="inline-flex items-center gap-3 rounded-xl border-2 border-orange bg-orange px-10 py-4 font-serif text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:bg-orange-dark hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange focus:ring-offset-2"
          >
            <span>{t.viewFullMenu}</span>
            <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
