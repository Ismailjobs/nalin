import type { Locale } from './config';
import at from '@/messages/at.json';
import en from '@/messages/en.json';

const dictionaries: Record<Locale, typeof at> = { at, en: en as typeof at };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.at;
}

export type Dictionary = typeof at;
