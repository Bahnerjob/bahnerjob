export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center fade-in">
        <div className="inline-flex items-center gap-2 badge mb-4">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgb(var(--accent))"}} />
          Bahn-Jobs · Deutschlandweit
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Finde deinen nächsten <span style={{ color: "rgb(var(--accent))" }}>Bahnerjob</span>
        </h1>
        <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
          Von Triebfahrzeugführer:in bis Fahrtrainer: moderne Suche, klare Preise, schnelle Veröffentlichung.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a className="btn btn-accent" href="/jobs/new">Anzeige schalten</a>
          <a className="btn" href="/jobs">Jobs durchsuchen</a>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-delayed">
        {[
          ["Schnell live", "Anzeigen in Minuten veröffentlichen – ohne Agentur."],
          ["Fair & transparent", "Klare Pakete: Basic, Featured & Boost."],
          ["Für Bahner gemacht", "Texte & Struktur passgenau für den Bahnsektor."]
        ].map(([title, desc]) => (
          <div key={title} className="card p-6">
            <div className="text-sm badge mb-3">{title}</div>
            <p className="text-neutral-300">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
