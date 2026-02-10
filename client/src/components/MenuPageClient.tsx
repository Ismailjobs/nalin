'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  menuCategories,
  getItemImage,
  type MenuItem,
  type MenuCategory,
} from '@/data/menu';
import type { Dictionary } from '@/i18n/get-dictionary';

const SLIDE_INTERVAL_MS = 3800;

function MenuItemRow({
  item,
  allergensLabel,
  isActive,
}: {
  item: MenuItem;
  allergensLabel: string;
  isActive?: boolean;
}) {
  return (
    <div className="border-b border-charcoal/10 py-4 transition-all duration-300 last:border-b-0">
      <div className="flex items-baseline gap-3">
        <span
          className={`font-serif shrink-0 transition-all duration-300 ${
            isActive
              ? 'font-semibold text-orange drop-shadow-[0_0_8px_rgba(230,81,0,0.4)]'
              : 'text-charcoal'
          }`}
        >
          {item.name}
        </span>
        <span className="flex-1 min-w-0 border-b border-dotted border-charcoal/30 self-end mb-1.5" aria-hidden />
        {item.price != null && (
          <span className="font-serif text-orange shrink-0">{item.price}</span>
        )}
      </div>
      {(item.description || (item.allergens && item.allergens.length > 0)) && (
        <div className="mt-1.5 pl-0 font-sans text-sm text-charcoal-muted">
          {item.description && <p>{item.description}</p>}
          {item.allergens && item.allergens.length > 0 && (
            <p className="text-xs italic text-charcoal-muted mt-0.5">
              {allergensLabel}: {item.allergens.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ZigZagBlock({
  category,
  allergensLabel,
  imageLeft,
  index,
}: {
  category: MenuCategory;
  allergensLabel: string;
  imageLeft: boolean;
  index: number;
}) {
  const singleImage = category.id === 'ratatouille';
  const [activeIndex, setActiveIndex] = useState(0);
  const blockRef = useRef<HTMLElement>(null);
  const isInView = useInView(blockRef, { amount: 0.3, once: false });
  const count = category.items.length || 1;

  useEffect(() => {
    if (singleImage || !isInView || count <= 1) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [singleImage, isInView, count]);

  const activeItem = singleImage
    ? category.items[0]
    : category.items[activeIndex];
  const imgSrc = singleImage
    ? '/ratatouille-tasche.jpg'
    : activeItem
      ? activeItem.image ?? getItemImage(activeItem.id)
      : '/doner-tashce.jpg';

  const goPrev = () => setActiveIndex((i) => (i - 1 + count) % count);
  const goNext = () => setActiveIndex((i) => (i + 1) % count);

  const noImages = category.id === 'toppings' || category.id === 'getranke';

  const content = (
    <div className="flex flex-col justify-center">
      <h2 className="font-serif text-2xl font-semibold tracking-wide text-charcoal md:text-3xl">
        {category.title}
      </h2>
      <div className="divider-orange my-6 max-w-[80px]" />
      <ul className="space-y-0">
        {category.items.map((item, i) => (
          <li key={item.id}>
            <MenuItemRow
              item={item}
              allergensLabel={allergensLabel}
              isActive={!noImages && !singleImage && i === activeIndex}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  const imageBlock = (
    <div className="relative w-full overflow-hidden rounded-lg border border-charcoal/10">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={activeIndex}
            src={imgSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = 'none';
              const parent = t.parentElement;
              if (parent && !parent.querySelector('.img-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'img-fallback absolute inset-0 flex items-center justify-center bg-orange-muted text-4xl';
                fallback.innerHTML = '🍽️';
                parent.appendChild(fallback);
              }
            }}
          />
        </AnimatePresence>
        {!singleImage && count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal/30 p-2 text-white backdrop-blur-sm transition hover:bg-charcoal/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              aria-label="Vorheriges"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal/30 p-2 text-white backdrop-blur-sm transition hover:bg-charcoal/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              aria-label="Nächstes"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {activeItem && (
        <div className="bg-orange px-3 py-2.5">
          <span className="font-serif text-sm font-medium tracking-wide text-white drop-shadow md:text-base">
            {activeItem.name}
          </span>
        </div>
      )}
    </div>
  );

  if (noImages) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24"
      >
        <div className="max-w-2xl">
          {content}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={blockRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24 md:items-center"
    >
      {imageLeft ? (
        <>
          <div className="order-1 md:order-1">{imageBlock}</div>
          <div className="order-2 md:order-2">{content}</div>
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">{content}</div>
          <div className="order-1 md:order-2">{imageBlock}</div>
        </>
      )}
    </motion.section>
  );
}

const MENU_BG_URL = '/menu-bg.jpg';

export function MenuPageClient({ dict }: { dict: Dictionary }) {
  const t = dict.menu;
  return (
    <div className="min-h-screen bg-cream-bright pt-28 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full overflow-hidden py-12 text-center sm:py-14"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: `url(${MENU_BG_URL})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-cream-bright/45" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-semibold tracking-wide text-charcoal md:text-5xl">
            {t.title}
          </h1>
          <div className="divider-orange mx-auto mt-6 max-w-[120px]" />
          <p className="mt-6 font-sans text-charcoal-muted">{t.subtitle}</p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-0">
          {menuCategories.map((category, index) => (
            <div key={category.id}>
              <ZigZagBlock
                category={category}
                allergensLabel={t.allergens}
                imageLeft={index % 2 === 0}
                index={index}
              />
              {index < menuCategories.length - 1 && (
                <div className="divider-orange mx-auto max-w-4xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
