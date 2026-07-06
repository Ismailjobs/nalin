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
  if (!isValidLocale(locale)) return { title: 'Nalin - Keep Up | Partner' };
  const dict = getDictionary(locale as Locale);
  return { title: `Nalin - Keep Up | ${dict.partner.title}` };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const t = dict.partner;
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
          {t.heading}
        </h1>
        <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal-muted">
          {t.intro}
        </p>
        <ul className="mt-10 space-y-8 font-sans text-sm leading-relaxed text-charcoal-muted">
          {t.links.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-medium text-orange underline decoration-orange/50 underline-offset-2 transition-colors hover:text-orange-dark hover:decoration-orange"
              >
                {item.name}
              </a>
              <p className="mt-1">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
