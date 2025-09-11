import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <header className="text-center mb-8">
          <img  src="/icon.svg" style={{height:80}} alt="Bahnerjob" className="mx-auto mb-4" style={{height:72}} />
          <h1 className="text-3xl md:text-4xl font-semibold">Bahnerjob  Jobs im Eisenbahnsektor</h1>
          <p className="text-neutral-400 mt-2">Finden Sie qualifizierte Fachkräfte oder Ihren nächsten Job.</p>
        </header>

        {/* CTA Row */}
        <section className="grid gap-4 md:grid-cols-3 text-center">
          <Link href="/jobs/new" className="block rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:-translate-y-0.5 transition">
            <div className="text-lg font-semibold">Anzeige schalten</div>
            <p className="text-neutral-400 mt-1">In wenigen Minuten veröffentlichen.</p>
          </Link>

          <Link href="/pricing" className="block rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:-translate-y-0.5 transition">
            <div className="text-lg font-semibold">Preise ansehen</div>
            <p className="text-neutral-400 mt-1">Pakete vergleichen & buchen.</p>
          </Link>

          {/* Jobs durchsuchen  /jobs */}
          <Link href="/jobs" className="block rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:-translate-y-0.5 transition">
            <div className="text-lg font-semibold">Jobs durchsuchen</div>
            <p className="text-neutral-400 mt-1">Aktuelle Angebote mit Suche & Filtern.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}


