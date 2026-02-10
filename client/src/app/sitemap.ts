import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nalin.at';

const paths = ['', '/menu', '/kontakt', '/impressum'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const path of paths) {
      const url = path ? `/${locale}${path}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${url}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
  }
  return entries;
}
