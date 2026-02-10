'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { localeNames } from '@/i18n/config';

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}`;
  const navLinks = [
    { href: base, label: dict.nav.home },
    { href: `${base}/menu`, label: dict.nav.menu },
    { href: `${base}/kontakt`, label: dict.nav.kontakt },
  ];
  const otherLocale = locale === 'at' ? 'en' : 'at';
  const otherPath = pathname?.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  const isHome = pathname === base || pathname === `${base}/`;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On non-home pages (kontakt, menu, impressum) top is light → always use solid nav for contrast
  const useSolidNav = scrolled || !isHome;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);

  const linkBase =
    'nav-link relative text-sm font-serif uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2';
  const linkClass = useSolidNav
    ? `${linkBase} text-charcoal hover:text-orange focus-visible:ring-offset-cream`
    : `${linkBase} text-white hover:text-orange focus-visible:ring-offset-transparent`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
        useSolidNav ? 'border-charcoal/10 bg-cream-bright/98 shadow-sm' : 'border-transparent bg-transparent'
      }`}
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        paddingTop: 'env(safe-area-inset-top, 0)',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-10">
        <Link
          href={base}
          className="flex min-h-[44px] shrink-0 items-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Nalin"
            className="h-9 w-auto object-contain object-left md:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex lg:gap-12">
          <li>
            <Link href={base} className={`min-h-[44px] min-w-[44px] items-center justify-center ${linkClass}`} style={{ display: 'inline-flex' }}>
              {dict.nav.home}
            </Link>
          </li>
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`min-h-[44px] min-w-[44px] items-center justify-center ${linkClass}`} style={{ display: 'inline-flex' }}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={otherPath} className={`min-h-[44px] min-w-[44px] items-center justify-center gap-2 ${linkClass}`} style={{ display: 'inline-flex' }}>
              <Globe className="h-4 w-4 shrink-0" aria-hidden />
              {localeNames[otherLocale]}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className={`flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 md:hidden ${
            useSolidNav ? 'text-charcoal focus-visible:ring-offset-cream' : 'text-white focus-visible:ring-offset-transparent'
          }`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          aria-expanded={open}
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-charcoal/10 bg-cream-bright md:hidden shadow-lg"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
          >
            <ul className="flex flex-col px-4 py-4 sm:px-6">
              <li>
                <Link
                  href={base}
                  className="block min-h-[48px] py-3.5 font-serif text-base uppercase tracking-widest text-charcoal transition-colors hover:text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset"
                  onClick={() => setOpen(false)}
                >
                  {dict.nav.home}
                </Link>
              </li>
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block min-h-[48px] py-3.5 font-serif text-base uppercase tracking-widest text-charcoal transition-colors hover:text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={otherPath}
                  className="flex min-h-[48px] items-center gap-2 py-3.5 font-serif text-base uppercase tracking-widest text-charcoal transition-colors hover:text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset"
                  onClick={() => setOpen(false)}
                >
                  <Globe className="h-4 w-4 shrink-0" aria-hidden />
                  {localeNames[otherLocale]}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
