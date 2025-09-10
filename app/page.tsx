export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold"> Eisenbahner-Jobs</h1>
      <p className="mt-2 text-neutral-300">
        Willkommen bei <strong>bahnerjob.de</strong>  der Jobbörse speziell für Eisenbahner:innen.
      </p>

      <section className="mt-8 grid gap-4">
        <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
          <h3 className="text-lg font-semibold">
            Lokführer:in (Güter) <span className="text-neutral-400 font-normal"> DB Cargo</span>
          </h3>
          <p className="text-sm text-neutral-300 mt-1">Hamburg Rbf  ~3.400 € / Monat</p>
          <p className="text-sm text-neutral-400 mt-2">
            Sichere Durchführung von Güterzügen, Bereitschaft zu Schichtarbeit, moderne Fahrzeugflotte.
          </p>
          <a href="/jobs/new" className="mt-3 inline-block text-emerald-400 text-sm underline">
            Jetzt bewerben
          </a>
        </div>

        <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
          <h3 className="text-lg font-semibold">
            Fahrdienstleiter:in (ESTW) <span className="text-neutral-400 font-normal"> DB Netz</span>
          </h3>
          <p className="text-sm text-neutral-300 mt-1">Frankfurt  ~3.600 € / Monat</p>
          <p className="text-sm text-neutral-400 mt-2">
            Steuerung des Eisenbahnbetriebs auf modernen ESTW, Kommunikation mit BZ.
          </p>
          <a href="/jobs/new" className="mt-3 inline-block text-emerald-400 text-sm underline">
            Jetzt bewerben
          </a>
        </div>
      </section>
    </main>
  );
}
