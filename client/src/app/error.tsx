'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log only on client; do not expose to UI
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-cream-bright pt-28 pb-20 flex flex-col items-center justify-center px-4">
      <h1 className="font-serif text-2xl font-semibold text-charcoal md:text-3xl">
        Etwas ist schiefgelaufen
      </h1>
      <p className="mt-4 font-sans text-center text-charcoal-muted max-w-md">
        Bitte versuchen Sie es später erneut oder kehren Sie zur Startseite zurück.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded border border-charcoal/20 bg-white px-6 py-3 font-sans text-sm font-medium text-charcoal transition hover:bg-charcoal/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
          Erneut versuchen
        </button>
        <Link
          href="/at"
          className="inline-block bg-orange px-6 py-3 font-sans text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
