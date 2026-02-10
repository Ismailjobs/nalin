'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const SCROLL_THRESHOLD = 300;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-40 flex h-9 w-9 items-center justify-center rounded border border-charcoal/15 bg-cream-bright shadow-md transition-colors hover:bg-orange hover:text-white hover:border-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
      aria-label="Nach oben"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2} aria-hidden />
    </button>
  );
}
