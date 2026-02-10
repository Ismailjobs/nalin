'use client';

import { motion } from 'framer-motion';
import type { MenuCategory } from '@/data/menu';
import { menuCategories } from '@/data/menu';
import type { Dictionary } from '@/i18n/get-dictionary';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function CategoryBlock({
  category,
  allergensLabel,
}: {
  category: MenuCategory;
  allergensLabel: string;
}) {
  return (
    <motion.section
      variants={item}
      className="border-b border-charcoal/10 py-12 last:border-b-0 md:py-16"
    >
      <h2 className="font-serif text-2xl font-semibold tracking-wide text-orange md:text-3xl">
        {category.title}
      </h2>
      <div className="divider-orange my-6 max-w-[80px]" />
      <motion.ul
        className="space-y-0"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {category.items.map((menuItem) => (
          <motion.li
            key={menuItem.id}
            variants={item}
            className="group border-b border-charcoal/10 py-4 transition-colors last:border-b-0 hover:bg-orange-muted"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-charcoal group-hover:text-orange transition-colors shrink-0">
                {menuItem.name}
              </span>
              <span className="flex-1 min-w-0 border-b border-dotted border-charcoal/30 self-end mb-1.5" aria-hidden />
              {menuItem.price != null && (
                <span className="font-serif text-orange shrink-0">{menuItem.price}</span>
              )}
            </div>
            {(menuItem.description || (menuItem.allergens && menuItem.allergens.length > 0)) && (
              <div className="mt-1.5 pl-0 font-sans text-sm text-charcoal-muted">
                {menuItem.description && <p>{menuItem.description}</p>}
                {menuItem.allergens && menuItem.allergens.length > 0 && (
                  <p className="text-xs italic text-charcoal-muted mt-0.5">
                    {allergensLabel}: {menuItem.allergens.join(', ')}
                  </p>
                )}
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

export function MenuSection({ dict }: { dict: Dictionary }) {
  const t = dict.menu;
  return (
    <section id="menu" className="relative w-full bg-cream-bright py-24 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-orange md:text-4xl">
            {t.title}
          </h2>
          <div className="divider-orange mt-6 max-w-[100px]" />
          <p className="mt-6 font-sans text-charcoal-muted">{t.subtitle}</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {menuCategories.map((category) => (
            <CategoryBlock
              key={category.id}
              category={category}
              allergensLabel={t.allergens}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
