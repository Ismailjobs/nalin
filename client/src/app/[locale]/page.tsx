import { Hero } from '@/components/Hero';
import { AwardsSection } from '@/components/AwardsSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Testimonials } from '@/components/Testimonials';
import { getDictionary } from '@/i18n/get-dictionary';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: 'Nalin - Keep Up' };
  return { title: 'Nalin - Keep Up' };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <>
      <Hero dict={dict} locale={locale as Locale} />
      <AwardsSection dict={dict} />
      <FeaturedProducts dict={dict} locale={locale} />
      <Testimonials dict={dict} />
    </>
  );
}
