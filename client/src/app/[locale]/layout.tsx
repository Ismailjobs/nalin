import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SetLocaleLang } from '@/components/SetLocaleLang';
import type { Locale } from '@/i18n/config';

export function generateStaticParams() {
  return [{ locale: 'at' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <>
      <SetLocaleLang locale={locale as Locale} />
      <Navbar locale={locale as Locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}
