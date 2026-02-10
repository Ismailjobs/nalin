import { getDictionary } from '@/i18n/get-dictionary';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { ContactForm } from '@/components/ContactForm';

const MAP_ADDRESS = 'Wilheminenstraße 69, 1160 Wien';
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&output=embed`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: 'Nalin - Keep Up | Contact' };
  const dict = getDictionary(locale as Locale);
  return { title: `Nalin - Keep Up | ${dict.contact.title}` };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const t = dict.contact;
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-3xl font-semibold tracking-wide text-charcoal md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 font-sans text-charcoal-muted">{t.subtitle}</p>
        </div>
        <div className="mb-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-start">
            <ContactForm dict={dict} />
          </div>
          <div className="overflow-hidden rounded-lg border border-charcoal/10 shadow-sm">
            <iframe
              title="Nalin auf Google Maps"
              src={MAP_EMBED_SRC}
              width="100%"
              height="360"
              className="w-full"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
