'use client';

import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import type { Dictionary } from '@/i18n/get-dictionary';

const awardIcons: Record<string, typeof Award> = {
  'guru-2021': Award,
  'guru-2022': Award,
  'tripadvisor-2022': Trophy,
};

function LaurelCircle({ year }: { year: string }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 80 80"
        className="absolute inset-0 h-full w-full text-orange"
        aria-hidden
      >
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <path
          d="M40 8 Q52 20 52 40 Q52 60 40 72 Q28 60 28 40 Q28 20 40 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M40 12 Q50 22 50 40 Q50 58 40 68 Q30 58 30 40 Q30 22 40 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.3"
        />
      </svg>
      <span className="relative font-serif text-xl font-bold tabular-nums text-orange">
        {year}
      </span>
    </div>
  );
}

export function AwardsSection({ dict }: { dict: Dictionary }) {
  const awards = dict.awards ?? [];
  return (
    <section className="w-full border-y border-charcoal/10 bg-cream-bright py-10 md:py-12">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-10 px-6 md:gap-x-12 md:gap-y-0">
        {awards.map((award, index) => {
          const Icon = awardIcons[award.id] ?? Award;
          return (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`flex min-w-0 flex-col items-center gap-4 text-center md:min-w-[200px] ${
                index < awards.length - 1
                  ? 'md:border-r md:border-charcoal/15 md:pr-12'
                  : ''
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <LaurelCircle year={award.year} />
                <Icon className="h-6 w-6 text-orange md:h-7 md:w-7" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal">
                {award.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
