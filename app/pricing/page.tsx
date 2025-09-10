const plans = [
  { name: "Basic Listing", price: "59 €", perks: ["30 Tage live","Standard-Position","Externer Bewerbungslink"], link: "https://buy.stripe.com/fZu9AT2w45cy9cTaYnafS00" },
  { name: "Featured Listing", price: "149 €", perks: ["Top-Position + Badge","30 Tage live","Startseiten-Highlight"], link: "https://buy.stripe.com/8x28wP6Mk9sObl1c2rafS01", highlight: true },
  { name: "Boost", price: "39 €", perks: ["Re-Bump nach 7/14/21 Tagen"], link: "https://buy.stripe.com/fZu6oH6Mk0WigFlgiHafS02" },
];

function Card({ p }: { p: (typeof plans)[number] }) {
  return (
    <div className={`border rounded-xl p-5 ${p.highlight ? "border-amber-600 bg-amber-500/10" : "border-neutral-800 bg-neutral-900/50"}`}>
      <h3 className="text-xl font-bold">{p.name}</h3>
      <p className="text-3xl font-extrabold mt-2">{p.price}<span className="text-sm text-neutral-400 font-normal"> / einmalig</span></p>
      <ul className="text-sm text-neutral-300 mt-3 space-y-1 list-disc pl-5">{p.perks.map((x) => (<li key={x}>{x}</li>))}</ul>
      <a href={p.link} target="_blank" className="mt-4 inline-block px-4 py-2 rounded-md bg-emerald-500 text-neutral-900 font-semibold">Jetzt buchen</a>
    </div>
  );
}

export default function Pricing() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-4">Preise</h1>
      <p className="text-neutral-300 mb-6">Bezahlung über Stripe Payment Links  ohne Programmierung.</p>
      <div className="grid md:grid-cols-3 gap-4">{plans.map((p) => <Card key={p.name} p={p} />)}</div>
    </main>
  );
}
