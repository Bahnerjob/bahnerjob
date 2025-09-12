import Link from "next/link";

export const revalidate = 0;

export const metadata = {
  title: "Pakete & Preise  Bahnerjob",
  description: "Klare Pakete für Stellenanzeigen im Bahnsektor: Basic, Featured, Boost. Schnell online, moderne Darstellung."
};

export default function PricingPage() {
  return (
    <main className="mx-auto container py-10 space-y-8">
      {/* HERO */}
      <section className="section" style={{padding:"18px 16px"}}>
        <div className="section-head">
          <h1 className="text-xl font-bold">Pakete & Preise</h1>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige erstellen</Link>
        </div>
        <p className="text-[14px]" style={{color:"var(--fg-muted)"}}>
          Wähle das Paket, das zu deiner Reichweite passt. Anzeigen sind schnell erstellt, klar formatiert und auf allen Geräten gut lesbar.
        </p>
      </section>

      {/* PLANS */}
      <section className="pricing-grid">
        {/* Basic */}
        <article className="pricing-card">
          <div className="pricing-title">Basic</div>
          <div className="price">€ 79</div>
          <div className="price-meta">30 Tage Laufzeit</div>
          <ul className="features">
            <li><span className="dot" /> Standard-Listung im Job-Board</li>
            <li><span className="dot" /> Mobile-optimierte Darstellung</li>
            <li><span className="dot" /> Direkte Bewerbung beim Unternehmen</li>
          </ul>
          <div className="plan-cta">
            <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Basic wählen</Link>
            <Link href="/jobs" className="btn btn-secondary">Jobs ansehen</Link>
          </div>
        </article>

        {/* Featured (Highlight) */}
        <article className="pricing-card highlight">
          <div className="pricing-title">Featured</div>
          <div className="price">€ 129</div>
          <div className="price-meta">30 Tage Laufzeit + Hervorhebung</div>
          <ul className="features">
            <li><span className="dot" /> Priorisierte Platzierung im Listing</li>
            <li><span className="dot" /> Visuelle Hervorhebung (fällt stärker auf)</li>
            <li><span className="dot" /> Alles aus Basic inklusive</li>
          </ul>
          <div className="plan-cta">
            <Link href="/jobs/new?pkg=featured" className="btn btn-primary">Featured wählen</Link>
            <Link href="/jobs/new?pkg=basic" className="btn btn-secondary">Lieber Basic?</Link>
          </div>
        </article>

        {/* Boost */}
        <article className="pricing-card">
          <div className="pricing-title">Boost</div>
          <div className="price">€ 199</div>
          <div className="price-meta">45 Tage Laufzeit + Mehr Reichweite</div>
          <ul className="features">
            <li><span className="dot" /> Extra-Sichtbarkeit über den Zeitraum</li>
            <li><span className="dot" /> Verlängerte Laufzeit</li>
            <li><span className="dot" /> Alles aus Featured inklusive</li>
          </ul>
          <div className="plan-cta">
            <Link href="/jobs/new?pkg=boost" className="btn btn-primary">Boost wählen</Link>
            <Link href="/jobs/new?pkg=featured" className="btn btn-secondary">Oder Featured?</Link>
          </div>
        </article>
      </section>

      {/* FAQ */}
      <section className="section" style={{padding:"16px"}}>
        <h2 className="text-[16px] font-bold">Häufige Fragen</h2>
        <div className="faq" style={{marginTop:"10px"}}>
          <details>
            <summary>Wie schnell ist eine Anzeige online?</summary>
            <p>In wenigen Minuten. Inhalt eingeben, prüfen und veröffentlichen.</p>
          </details>
          <details>
            <summary>Kann ich den Text später anpassen?</summary>
            <p>Ja, du kannst Inhalte während der Laufzeit aktualisieren.</p>
          </details>
          <details>
            <summary>Wie bezahle ich?</summary>
            <p>Sicher und bequem  die Seite unterstützt moderne Zahlungsanbieter.</p>
          </details>
        </div>
        <div style={{marginTop:"12px"}}>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Jetzt Anzeige erstellen</Link>
        </div>
      </section>
    </main>
  );
}