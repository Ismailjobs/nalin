'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  menuCategories,
  getItemImage,
  type MenuItem,
  type MenuCategory,
} from '@/data/menu';
import { getMenuItemTranslation, categoryTitleKeys } from '@/data/menu-translations';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { ImageWithLoading } from '@/components/ImageWithLoading';

function MenuItemCard({
  item,
  locale,
  displayName,
}: {
  item: MenuItem;
  locale: string;
  displayName: string;
}) {
  const imgSrc = item.image ?? getItemImage(item.id);
  const href = `/${locale}/menu/${item.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
        <ImageWithLoading
          src={imgSrc}
          alt={displayName}
          containerClassName="absolute inset-0"
          className="transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = 'none';
            const parent = t.parentElement;
            if (parent && !parent.querySelector('.img-fallback')) {
              const fallback = document.createElement('div');
              fallback.className =
                'img-fallback absolute inset-0 flex items-center justify-center bg-orange-muted text-4xl';
              fallback.innerHTML = '🍽️';
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
      <div className="border-t border-charcoal/10 px-5 py-4 text-center">
        <span className="font-serif text-base font-semibold tracking-wide text-charcoal transition-colors duration-200 group-hover:text-orange md:text-lg">
          {displayName}
        </span>
      </div>
    </Link>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function CategorySection({
  category,
  locale,
  index,
  categoryTitle,
  getItemDisplayName,
}: {
  category: MenuCategory;
  locale: string;
  index: number;
  categoryTitle: string;
  getItemDisplayName: (item: MenuItem) => string;
}) {
  const isDrinks = category.id === 'getranke';
  const isToppings = category.id === 'toppings';
  const showAsList = isDrinks || isToppings;

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px', amount: 0.15 }}
      className="py-12 md:py-16"
    >
      <motion.h2
        className="font-serif text-2xl font-semibold tracking-wide text-charcoal md:text-3xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {categoryTitle}
      </motion.h2>
      <motion.div
        className="divider-orange mt-4 mb-8 max-w-[80px]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />

      {showAsList ? (
        <motion.ul
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
        >
          {category.items.map((item) => (
            <motion.li
              key={item.id}
              variants={staggerItem}
              className="rounded-md border border-charcoal/15 bg-cream-bright px-4 py-2.5 font-sans text-sm text-charcoal"
            >
              {getItemDisplayName(item)}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        >
          {category.items.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <MenuItemCard item={item} locale={locale} displayName={getItemDisplayName(item)} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

const MENU_BG_URL = '/menu-bg.jpg';

export function MenuPageClient({ dict, locale }: { dict: Dictionary; locale: string }) {
  const t = dict.menu;
  const localeTyped = locale as Locale;
  const menuDict = dict.menu as Record<string, string>;
  const getCategoryTitle = (category: MenuCategory) =>
    (categoryTitleKeys[category.id] && menuDict[categoryTitleKeys[category.id]]) || category.title;
  const getItemDisplayName = (item: MenuItem) =>
    getMenuItemTranslation(localeTyped, item.id)?.name ?? item.name;

  return (
    <div className="min-h-screen bg-cream-bright pt-28 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full overflow-hidden py-16 text-center sm:py-20"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${MENU_BG_URL})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-cream-bright/25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-semibold tracking-wide text-charcoal md:text-5xl">
            {t.title}
          </h1>
          <div className="divider-orange mx-auto mt-6 max-w-[120px]" />
          <p className="mt-6 font-sans text-charcoal-muted">{t.subtitle}</p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {menuCategories.map((category, index) => (
          <div key={category.id}>
            <CategorySection
              category={category}
              locale={locale}
              index={index}
              categoryTitle={getCategoryTitle(category)}
              getItemDisplayName={getItemDisplayName}
            />
            {index < menuCategories.length - 1 && (
              <div className="divider-orange mx-auto max-w-4xl" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
