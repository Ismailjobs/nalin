import { getDictionary } from '@/i18n/get-dictionary';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getMenuItemById, getItemImage, isDrinkItem } from '@/data/menu';
import { getMenuItemTranslation } from '@/data/menu-translations';
import { MenuItemDetailImage } from '@/components/MenuItemDetailImage';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return { title: 'Nalin - Keep Up | Menu' };
  if (isDrinkItem(slug)) return { title: 'Nalin - Keep Up | Menu' };
  const item = getMenuItemById(slug);
  if (!item) return { title: 'Nalin - Keep Up | Menu' };
  const tr = getMenuItemTranslation(locale as Locale, slug);
  const name = tr?.name ?? item.name;
  return { title: `Nalin - Keep Up | ${name}` };
}

export default async function MenuItemDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  if (isDrinkItem(slug)) notFound();
  const item = getMenuItemById(slug);
  if (!item) notFound();

  const dict = getDictionary(locale as Locale);
  const t = dict.menu;
  const base = `/${locale}`;
  const imageSrc = item.image ?? getItemImage(item.id);
  const tr = getMenuItemTranslation(locale as Locale, item.id);
  const displayName = tr?.name ?? item.name;
  const displayDescription = tr?.description ?? item.description;

  return (
    <div className="min-h-screen bg-cream-bright pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`${base}/menu`}
          className="mb-8 inline-flex items-center gap-1 font-sans text-sm font-medium text-charcoal-muted transition-colors hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
          {t.backToMenu}
        </Link>

        <article className="overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-sm">
          <MenuItemDetailImage imageSrc={imageSrc} />
          <div className="border-t border-charcoal/10 px-6 py-8 sm:px-8">
            <h1 className="font-serif text-3xl font-semibold tracking-wide text-charcoal md:text-4xl">
              {displayName}
            </h1>
            {item.price != null && (
              <p className="mt-2 font-serif text-xl font-medium text-orange">{item.price}</p>
            )}
            {displayDescription && (
              <p className="mt-4 font-sans text-charcoal-muted leading-relaxed">
                {displayDescription}
              </p>
            )}
            {item.allergens && item.allergens.length > 0 && (
              <p className="mt-4 font-sans text-sm text-charcoal-muted">
                <span className="font-medium text-charcoal">{t.allergens}:</span>{' '}
                {item.allergens.join(', ')}
              </p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
