'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n/config';

export function SetLocaleLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'at' ? 'de' : 'en';
  }, [locale]);
  return null;
}
