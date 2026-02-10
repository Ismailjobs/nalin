import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, isValidLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root: redirect to locale based on Accept-Language (de -> at, else en)
  if (pathname === '/') {
    const acceptLang = request.headers.get('accept-language') ?? '';
    const preferDe = acceptLang.toLowerCase().includes('de');
    const locale = preferDe ? 'at' : 'en';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // /at or /en (and subpaths): allow
  const segment = pathname.slice(1).split('/')[0];
  if (isValidLocale(segment)) {
    return NextResponse.next();
  }

  // Other paths (e.g. /impressum): redirect to default locale with path
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

// Sadece dil rotalarında çalış; statik dosyalar (resimler vb.) middleware'e girmeden sunulur
export const config = {
  matcher: ['/', '/at', '/at/:path*', '/en', '/en/:path*'],
};
