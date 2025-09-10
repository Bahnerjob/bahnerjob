"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <html>
      <body>
        <div className="container section">
          <div className="card p-6">
            <h1 className="font-bold tracking-tight">Globaler Fehler</h1>
            <p className="mt-2 text-neutral-300">Versuch’s erneut.</p>
            <button className="btn btn-accent mt-4" onClick={() => reset()}>Neu laden</button>
          </div>
        </div>
      </body>
    </html>
  );
}
