import { getDictionary } from '@/i18n/get-dictionary';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { MenuPageClient } from '@/components/MenuPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: 'Nalin - Keep Up | Menu' };
  const dict = getDictionary(locale as Locale);
  return { title: `Nalin - Keep Up | ${dict.menu.title}` };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return <MenuPageClient dict={dict} />;
}
