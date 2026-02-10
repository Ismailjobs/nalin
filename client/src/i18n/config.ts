export const locales = ['at', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'at';

export const localeNames: Record<Locale, string> = {
  at: 'Deutsch',
  en: 'English',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
