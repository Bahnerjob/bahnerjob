import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NewsRail = dynamic(() => import("@/components/NewsRail").then(m => m.default).catch(() => () => null), { ssr: true });

export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Moderner, mittiger Auftritt: zwei klare Aktionen, ruhige Panels, keine bunten Ablenkungen.",
};

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="section center">
        <div className="chip">Die Jobbörse für den Bahnsektor</div>
        <h1 className="h1" style={{marginTop:"20px"}}>Klar. Modern. Fokussiert.</h1>
        <p className="lead" style={{maxWidth:"46rem", margin:"16px auto 0"}}>
          Gute Lesbarkeit, klare Wege  und Buttons, die wirklich wie Buttons aussehen.
        </p>
        <div style={{display:"flex", flexWrap:"wrap", gap:"12px", justifyContent:"center", marginTop:"24px"}}>
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
        </div>
      </section>

      <div className="divider" />

      {/* ZIELGRUPPEN */}
      <section className="section">
        <div className="grid two">
          <article className="panel">
            <div className="muted" style={{fontSize:"12px"}}>Für Unternehmen</div>
            <h2 className="h2">Sichtbarkeit ohne Streuverlust</h2>
            <p className="lead" style={{marginTop:"12px"}}>
              Anzeige in Minuten erstellen, Vorschau prüfen und sicher veröffentlichen.
              Optional <em>Featured</em> &amp; <em>Boost</em>.
            </p>
            <ul style={{marginTop:"16px", color:"rgba(235,235,240,.85)", paddingLeft:"18px"}}>
              <li style={{marginBottom:"6px"}}>Klare Pakete & transparente Laufzeiten</li>
              <li style={{marginBottom:"6px"}}>Einheitliche Darstellung & gute Lesbarkeit</li>
              <li>Direkte Bewerbungen beim Unternehmen</li>
            </ul>
            <div style={{display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center", marginTop:"20px"}}>
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
              <Link href="/pricing" className="muted">Pakete & Leistungen </Link>
            </div>
          </article>

          <article className="panel">
            <div className="muted" style={{fontSize:"12px"}}>Für Bewerber:innen</div>
            <h2 className="h2">Finde deinen nächsten Halt</h2>
            <p className="lead" style={{marginTop:"12px"}}>
              Suche gezielt nach Ort, Bundesland oder Arbeitgeber. Klare Anzeigen mit den wichtigsten Details.
            </p>
            <ul style={{marginTop:"16px", color:"rgba(235,235,240,.85)", paddingLeft:"18px"}}>
              <li style={{marginBottom:"6px"}}>Filter für Ort, Bundesland &amp; Vertragsart</li>
              <li style={{marginBottom:"6px"}}>Aufgaben, Anforderungen, Benefits auf einen Blick</li>
              <li>Direktbewerbung beim Unternehmen</li>
            </ul>
            <div style={{marginTop:"20px"}}>
              <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
            </div>
          </article>
        </div>
      </section>

      <div className="divider" />

      {/* FEATURES */}
      <section className="section">
        <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{fontSize:"18px", fontWeight:700}}>Warum Bahnerjob?</h3>
          <Link href="/pricing" className="muted">Pakete & Leistungen </Link>
        </div>
        <div className="container" style={{
          display:"grid", gap:"16px", gridTemplateColumns:"1fr", marginTop:"16px"
        }}>
          <div className="panel"><div style={{fontWeight:600}}>Branchenspezifisch</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Community statt Streuverlust.</p></div>
          <div className="panel"><div style={{fontWeight:600}}>Schnell & modern</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Live-Vorschau, Stripe, in Minuten online.</p></div>
          <div className="panel"><div style={{fontWeight:600}}>Klare Pakete</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Basic, Featured, Boost  transparent.</p></div>
          <div className="panel"><div style={{fontWeight:600}}>Lesbarkeit</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Ruhige Typo, klare Struktur.</p></div>
        </div>
      </section>

      <div className="divider" />

      {/* NEWS (failsafe) */}
      <section className="section">
        <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{fontSize:"18px", fontWeight:700}}>News</h3>
          <Link href="/news" className="muted">Alle News </Link>
        </div>
        <div className="container" style={{marginTop:"16px"}}>
          <NewsRail />
        </div>
      </section>
    </div>
  );
}