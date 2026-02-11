import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
  if (!isValidLocale(locale)) return { title: 'Nalin - Keep Up | Impressum' };
  const dict = getDictionary(locale as Locale);
  return { title: `Nalin - Keep Up | ${dict.impressum.title}` };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const t = dict.impressum;
  return (
    <div className="min-h-screen bg-cream-bright pt-28">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 font-sans text-sm text-charcoal-muted transition-colors hover:text-orange"
        >
          <ArrowLeft size={18} />
          {t.back}
        </Link>
        <h1 className="font-serif text-3xl font-semibold tracking-wide text-charcoal">
          {t.title}
        </h1>
        <div className="mt-8 space-y-6 font-sans text-sm text-charcoal-muted">
          <p>{t.intro}</p>
          <p>
            <strong className="text-charcoal">Nalin</strong><br />
            Wilheminenstraße 69<br />
            1160 Wien<br />
            Österreich
          </p>
          <p>
            E-Mail: office@nalin.at
          </p>
        </div>
      </div>
    </div>
  );
}
