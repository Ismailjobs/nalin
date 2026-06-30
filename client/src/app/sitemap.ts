import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getAllMenuSlugs } from '@/data/menu';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nalin.at';

const staticPaths = ['', '/menu', '/kontakt', '/impressum'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url = path ? `/${locale}${path}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${url}`,
        lastModified: now,
        changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
        priority: path === '' ? 1 : 0.8,
      });
    }
    for (const slug of getAllMenuSlugs()) {
      entries.push({
        url: `${baseUrl}/${locale}/menu/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
