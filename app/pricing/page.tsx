export const dynamic = "force-static";
export const metadata = {
  title: "Preise | Bahnerjob",
  description: "Pakete und Preise für Jobanzeigen.",
};

const PLANS = [
  {
    key: "basic",
    name: "Basic",
    bullets: ["30 Tage Laufzeit","Sichtbar in Liste & Suche","1 Schwerpunkt","Logo, Titel, Ort, Bewerbungslink"],
    cta: "/jobs/new?pkg=basic",
  },
  {
    key: "featured",
    name: "Featured",
    bullets: ["Wie Basic","Priorisierte Platzierung","Featured-Badge","Mehr Sichtbarkeit"],
    cta: "/jobs/new?pkg=featured",
  },
  {
    key: "boost",
    name: "Boost",
    bullets: ["Wie Featured","45 Tage Laufzeit","Maximale Prominenz"],
    cta: "/jobs/new?pkg=boost",
  },
];

export default async function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">Pakete & Preise</h1>
      <p className="text-neutral-400 mb-8">
        Wähle das Paket, das am besten zu deiner Stelle passt. Du kannst es im nächsten Schritt noch ändern.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((p) => (
          <div key={p.key} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 flex flex-col">
            <div className="text-lg font-semibold mb-3">{p.name}</div>
            <ul className="text-sm text-neutral-300 space-y-2 mb-6">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a className="mt-auto inline-flex items-center justify-center rounded-lg px-4 py-2 bg-amber-500 text-black font-semibold hover:opacity-95" href={p.cta}>
              {p.name} wählen
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 text-sm text-neutral-500">Preise werden im Checkout angezeigt. Alle Angaben zzgl. USt.</div>
    </div>
  );
}
