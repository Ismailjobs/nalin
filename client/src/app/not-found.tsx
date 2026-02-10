import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-bright pt-28 pb-20 flex flex-col items-center justify-center px-4">
      <h1 className="font-serif text-4xl font-semibold text-charcoal md:text-5xl">
        404
      </h1>
      <p className="mt-4 font-sans text-charcoal-muted">
        Diese Seite wurde nicht gefunden.
      </p>
      <Link
        href="/at"
        className="mt-8 inline-block bg-orange px-6 py-3 font-sans text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
