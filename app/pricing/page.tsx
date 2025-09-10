import BuyButton from "@/components/BuyButton";

export default function PricingPage() {
  const basic = process.env.NEXT_PUBLIC_PRICE_ID_BASIC!;
  const featured = process.env.NEXT_PUBLIC_PRICE_ID_FEATURED!;
  const boost = process.env.NEXT_PUBLIC_PRICE_ID_BOOST!;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="badge mb-3">Klare Pakete</div>
        <h1 className="text-3xl font-bold tracking-tight">Preise für Jobanzeigen</h1>
        <p className="mt-3 text-neutral-300">Wähle dein Paket – jederzeit erweiterbar mit Boost.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic */}
        <div className="card p-6 flex flex-col">
          <div className="badge mb-2">Basic</div>
          <div className="text-3xl font-bold">59 €</div>
          <p className="mt-2 text-neutral-300">Standardplatzierung – ideal für reguläre Rollen.</p>
          <ul className="mt-4 text-sm text-neutral-300 space-y-2">
            <li>• Sichtbar in der Liste</li>
            <li>• Laufzeit 30 Tage</li>
          </ul>
          <div className="mt-auto pt-5">
            <BuyButton label="Jetzt kaufen – 59 €" priceId={basic} />
          </div>
        </div>

        {/* Featured (Highlight) */}
        <div className="card p-6 border-red-500/40 ring-1 ring-red-500/20 flex flex-col">
          <div className="badge mb-2" style={{color:"white", borderColor:"rgba(220,38,38,0.4)"}}>Meist gewählt</div>
          <div className="text-3xl font-bold">149 €</div>
          <p className="mt-2 text-neutral-300">Hervorgehobene Platzierung mit mehr Reichweite.</p>
          <ul className="mt-4 text-sm text-neutral-300 space-y-2">
            <li>• Top der Liste</li>
            <li>• Badge “Featured”</li>
            <li>• Laufzeit 30 Tage</li>
          </ul>
          <div className="mt-auto pt-5">
            <BuyButton label="Jetzt kaufen – 149 €" priceId={featured} />
          </div>
        </div>

        {/* Boost */}
        <div className="card p-6 flex flex-col">
          <div className="badge mb-2">Boost</div>
          <div className="text-3xl font-bold">39 €</div>
          <p className="mt-2 text-neutral-300">Zusätzliche Sichtbarkeit für bestehende Anzeigen.</p>
          <ul className="mt-4 text-sm text-neutral-300 space-y-2">
            <li>• Listing-Boost 7 Tage</li>
            <li>• Zusätzliche Markierung</li>
          </ul>
          <div className="mt-auto pt-5">
            <BuyButton label="Jetzt kaufen – 39 €" priceId={boost} />
          </div>
        </div>
      </div>
    </div>
  );
}
