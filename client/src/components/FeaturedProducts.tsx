'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/featured';
import type { Dictionary } from '@/i18n/get-dictionary';

export function FeaturedProducts({ dict, locale }: { dict: Dictionary; locale: string }) {
  const t = dict.home;
  const base = `/${locale}`;
  const menuHref = `${base}/menu`;
  return (
    <section className="relative w-full overflow-hidden bg-cream py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="divider-orange mb-12 max-w-[100px]" aria-hidden />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl font-semibold tracking-wide text-charcoal md:text-4xl"
        >
          {t.beliebt}
        </motion.h2>
        <div className="mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col overflow-hidden border border-charcoal/10 bg-cream-bright shadow-sm"
              whileHover={{ y: -2 }}
            >
              <div className="relative z-10 h-[280px] sm:h-[260px] md:h-[220px]">
                <div className="h-full w-full overflow-hidden">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover opacity-90"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.img-fallback')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'img-fallback absolute inset-0 flex items-center justify-center bg-orange-muted text-4xl';
                          fallback.innerHTML = '🍽️';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </motion.div>
                </div>
                <div
                  className="absolute bottom-0 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center border-2 border-orange bg-cream-bright rounded-none"
                >
                  <UtensilsCrossed className="h-6 w-6 text-orange" strokeWidth={1.8} />
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col items-center border-t border-charcoal/10 px-4 pb-4 pt-10 sm:px-6">
                <h3 className="text-center font-serif text-xl font-semibold text-charcoal md:text-2xl">
                  {product.name}
                </h3>
                <div className="mt-3 h-0.5 w-8 shrink-0 bg-orange" aria-hidden />
                <p className="mt-3 text-center font-sans text-sm leading-snug text-charcoal-muted line-clamp-2">
                  {product.description}
                </p>
              </div>

              <Link href={menuHref} className="relative z-10 block w-full border-t border-charcoal/10">
                <motion.div
                  className="flex w-full items-center justify-center gap-2 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300"
                  style={{ backgroundColor: '#E65100' }}
                  whileHover={{ backgroundColor: '#BF360C' }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>{t.viewFullMenu}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
