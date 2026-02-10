'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import type { Dictionary } from '@/i18n/get-dictionary';

const STAR_COUNT = 5;

export function Testimonials({ dict }: { dict: Dictionary }) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext]);

  const review = testimonials[index];

  return (
    <section className="relative w-full overflow-hidden border-y border-charcoal/10 bg-cream py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <span className="font-serif text-[min(20rem,40vw)] font-normal italic leading-none text-orange" style={{ opacity: 0.06 }}>
          ❝
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8">
        <div className="flex items-center justify-center gap-6">
          <span className="h-px flex-1 max-w-[80px] bg-orange/50" aria-hidden />
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl font-semibold tracking-wide text-charcoal md:text-3xl"
          >
            {dict.home.testimonials}
          </motion.h2>
          <span className="h-px flex-1 max-w-[80px] bg-orange/50" aria-hidden />
        </div>

        <div className="mt-16 border-2 border-charcoal/15 bg-cream-bright">
          <div className="relative flex min-h-[280px] flex-col items-center justify-center px-8 py-12 md:min-h-[320px] md:px-14 md:py-16">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex gap-1">
                  {Array.from({ length: STAR_COUNT }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange text-orange md:h-5 md:w-5" strokeWidth={1.5} />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-xl italic leading-relaxed text-charcoal md:text-2xl">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <footer className="mt-8 font-sans text-xs font-medium uppercase tracking-widest text-orange">
                  — {review.author.toUpperCase()}
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-charcoal/10 px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center text-charcoal-muted transition-colors hover:text-orange hover:bg-orange-muted"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="h-2 w-2 transition-all duration-200 md:h-2.5 md:w-2.5"
                  aria-label={`Go to review ${i + 1}`}
                  style={{
                    backgroundColor: i === index ? '#E65100' : 'rgba(230, 81, 0, 0.25)',
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center text-charcoal-muted transition-colors hover:text-orange hover:bg-orange-muted"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
