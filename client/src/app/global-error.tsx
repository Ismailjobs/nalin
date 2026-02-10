'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'system-ui', background: '#FDFDFD', color: '#1A1A1A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
            Etwas ist schiefgelaufen
          </h1>
          <p style={{ color: '#4A4A4A', marginBottom: '1.5rem' }}>
            Bitte versuchen Sie es später erneut oder kehren Sie zur Startseite zurück.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: '#E65100',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
