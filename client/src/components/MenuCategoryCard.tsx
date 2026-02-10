'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';

export interface MenuCategoryCardProps {
  title: string;
  imageSrc: string;
  linkHref: string;
  buttonLabel?: string;
}

const CARD_IVORY = '#FAF9F6';
const DARK_CHARCOAL = '#2C2C2C';
const GOLD = '#D4AF37';

export function MenuCategoryCard({
  title,
  imageSrc,
  linkHref,
  buttonLabel = 'MENÜYÜ İNCELE',
}: MenuCategoryCardProps) {
  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-t-2xl rounded-b-md shadow-lg"
      style={{ backgroundColor: CARD_IVORY }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top Image Section */}
      <div className="relative h-[200px] overflow-hidden md:h-[220px]">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        </motion.div>

        {/* Central Overlapping Icon */}
        <div
          className="absolute bottom-0 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full shadow-md"
          style={{
            backgroundColor: CARD_IVORY,
            border: `2px solid ${GOLD}`,
          }}
        >
          <UtensilsCrossed
            className="h-6 w-6"
            style={{ color: GOLD }}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Middle Content Section */}
      <div
        className="relative flex flex-1 flex-col items-center px-6 pb-4 pt-10"
        style={{ backgroundColor: CARD_IVORY }}
      >
        <h3 className="text-center font-serif text-xl font-semibold md:text-2xl md:font-bold" style={{ color: DARK_CHARCOAL }}>
          {title}
        </h3>
        <div
          className="mt-3 h-0.5 w-8"
          style={{ backgroundColor: GOLD }}
          aria-hidden
        />
      </div>

      {/* Bottom Full-Width Button */}
      <Link href={linkHref} className="block w-full">
        <motion.div
          className="flex w-full items-center justify-center gap-2 py-4 font-sans text-sm font-bold uppercase tracking-widest transition-colors duration-300"
          style={{
            backgroundColor: GOLD,
            color: CARD_IVORY,
          }}
          whileHover={{
            backgroundColor: DARK_CHARCOAL,
            color: GOLD,
          }}
          whileTap={{ scale: 0.99 }}
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </motion.div>
      </Link>
    </motion.article>
  );
}
