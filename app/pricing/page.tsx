import Link from "next/link";

export const revalidate = 0;
export const metadata = {
  title: "Pakete & Preise  Bahnerjob",
  description: "Transparente Pakete f&uuml;r Stellenanzeigen im Bahnsektor."
};

export default function PricingPage() {
  return (
    <main className="mx-auto container py-10 space-y-8">
      <section className="section p-6 sm:p-8">
        <div className="section-head">
          <h1 className="text-2xl font-extrabold tracking-tight">Pakete &amp; Preise</h1>
          <span className="badge-accent">ohne Abo &middot; klare Laufzeit</span>
        </div>

        <div className="pricing-grid mt-4">
          {/* BASIC */}
          <article className="pricing-card">
            <div className="pricing-title">Basic Listing</div>
            <div className="price">
              <span className="amount">59,00&nbsp;&euro;</span>
              <span className="per">/ Anzeige</span>
            </div>
            <ul className="benefits">
              <li>Standardreichweite im Bahn-Umfeld</li>
              <li>Saubere Darstellung (mobil &amp; Desktop)</li>
              <li>&Auml;nderungen w&auml;hrend der Laufzeit m&ouml;glich</li>
            </ul>
            <div className="mt-4 flex gap-8 items-center">
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Basic buchen</Link>
              <Link href="/jobs" className="link-like">Beispiele ansehen</Link>
            </div>
          </article>

          {/* FEATURED */}
          <article className="pricing-card" style={{borderColor:"rgb(82,82,88)"}}>
            <div className="pricing-title">Featured Listing</div>
            <div className="price">
              <span className="amount">149,00&nbsp;&euro;</span>
              <span className="per">/ Anzeige</span>
            </div>
            <ul className="benefits">
              <li>Hervorgehobene Kachel im Listing</li>
              <li>Mehr Sichtbarkeit auf der Startseite</li>
              <li>Alle Vorteile von Basic inklusive</li>
            </ul>
            <div className="mt-4 flex gap-8 items-center">
              <Link href="/jobs/new?pkg=featured" className="btn btn-primary">Featured buchen</Link>
              <Link href="/jobs" className="link-like">Beispiele ansehen</Link>
            </div>
          </article>

          {/* BOOST */}
          <article className="pricing-card">
            <div className="pricing-title">Boost (Upgrade)</div>
            <div className="price">
              <span className="amount">39,00&nbsp;&euro;</span>
              <span className="per">/ Add-on</span>
            </div>
            <ul className="benefits">
              <li>Zus&auml;tzliche Platzierung/Push</li>
              <li>St&auml;rkere Aufmerksamkeit im Zeitraum</li>
              <li>In Kombination mit Basic/Featured</li>
            </ul>
            <div className="mt-4">
              <Link href="/jobs/new?pkg=boost" className="btn btn-secondary">Boost hinzuf&uuml;gen</Link>
            </div>
          </article>
        </div>

        <p className="mt-6 text-sm text-[color:var(--fg-muted)]">
          Preise inkl. USt., Abrechnung &middot; sicher &uuml;ber Stripe.
        </p>
      </section>
    </main>
  );
}