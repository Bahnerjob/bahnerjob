import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NewsRail = dynamic(() => import("../components/NewsRail").then(m => m.default).catch(() => () => null), { ssr: true });

export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Moderner, mittiger Auftritt: zwei klare Aktionen, ruhige Panels, keine bunten Ablenkungen.",
};

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section style={{textAlign:"center", padding:"56px 0 24px"}}>
        <div className="chip">Die Jobbörse für den Bahnsektor</div>
        <h1 style={{fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif", fontWeight:800, letterSpacing:"-0.01em", fontSize:"clamp(2.25rem,5vw,3rem)", margin:"20px 0 0"}}>Klar. Modern. Fokussiert.</h1>
        <p style={{maxWidth:"46rem", margin:"16px auto 0", color:"rgba(235,235,240,.9)"}}>
          Gute Lesbarkeit, klare Wege  und Buttons, die wirklich wie Buttons aussehen.
        </p>
        <div style={{display:"flex", flexWrap:"wrap", gap:"12px", justifyContent:"center", marginTop:"28px"}}>
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
        </div>
      </section>

      <hr className="rule" />

      {/* ZIELGRUPPEN */}
      <section>
        <div style={{display:"grid", gap:"16px", gridTemplateColumns:"1fr"}}>
          <article className="panel">
            <div className="muted" style={{fontSize:"12px"}}>Für Unternehmen</div>
            <h2 style={{fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif", fontSize:"22px", fontWeight:800, letterSpacing:"-0.01em", margin:"8px 0 0"}}>Sichtbarkeit ohne Streuverlust</h2>
            <p style={{marginTop:"12px", color:"rgba(235,235,240,.9)"}}>
              Anzeige in Minuten erstellen, Vorschau prüfen und sicher veröffentlichen. Optional <em>Featured</em> &amp; <em>Boost</em>.
            </p>
            <ul style={{marginTop:"16px", color:"rgba(235,235,240,.85)", paddingLeft:"18px"}}>
              <li style={{marginBottom:"6px"}}>Klare Pakete & transparente Laufzeiten</li>
              <li style={{marginBottom:"6px"}}>Einheitliche Darstellung & gute Lesbarkeit</li>
              <li>Direkte Bewerbungen beim Unternehmen</li>
            </ul>
            <div style={{display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center", marginTop:"20px"}}>
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
              <Link href="/pricing" className="btn btn-secondary" aria-label="Pakete und Leistungen">Pakete & Leistungen</Link>
            </div>
          </article>

          <article className="panel">
            <div className="muted" style={{fontSize:"12px"}}>Für Bewerber:innen</div>
            <h2 style={{fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif", fontSize:"22px", fontWeight:800, letterSpacing:"-0.01em", margin:"8px 0 0"}}>Finde deinen nächsten Halt</h2>
            <p style={{marginTop:"12px", color:"rgba(235,235,240,.9)"}}>
              Suche gezielt nach Ort, Bundesland oder Arbeitgeber. Klare Anzeigen mit den wichtigsten Details.
            </p>
            <ul style={{marginTop:"16px", color:"rgba(235,235,240,.85)", paddingLeft:"18px"}}>
              <li style={{marginBottom:"6px"}}>Filter für Ort, Bundesland &amp; Vertragsart</li>
              <li style={{marginBottom:"6px"}}>Aufgaben, Anforderungen, Benefits auf einen Blick</li>
              <li>Direktbewerbung beim Unternehmen</li>
            </ul>
            <div style={{marginTop:"20px", display:"flex", gap:"12px", flexWrap:"wrap"}}>
              <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
            </div>
          </article>
        </div>
      </section>

      <hr className="rule" />

      {/* FEATURES */}
      <section>
        <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{fontSize:"18px", fontWeight:800}}>Warum Bahnerjob?</h3>
          <Link href="/pricing" className="btn btn-secondary">Pakete & Leistungen</Link>
        </div>
        <div className="container" style={{display:"grid", gap:"16px", gridTemplateColumns:"1fr", marginTop:"16px"}}>
          <div className="panel"><div style={{fontWeight:700}}>Branchenspezifisch</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Jobs ausschließlich für den Bahnsektor  zielgerichtete Reichweite ohne Umwege.</p></div>
          <div className="panel"><div style={{fontWeight:700}}>Schnell & modern</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Stellenanzeigen in wenigen Minuten online  klarer Ablauf, direkte Veröffentlichung.</p></div>
          <div className="panel"><div style={{fontWeight:700}}>Klare Pakete</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Wähle zwischen Basic, Featured oder Boost  klar kalkulierbar und fair.</p></div>
          <div className="panel"><div style={{fontWeight:700}}>Lesbarkeit</div><p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Moderne Darstellung und mobil optimiert  so finden Bewerber:innen deine Anzeige sofort.</p></div>
        </div>
      </section>

      <hr className="rule" />

      {/* NEWS */}
      <section>
        <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{fontSize:"18px", fontWeight:800}}>News</h3>
          <Link href="/news" className="btn btn-secondary">Alle News</Link>
        </div>
        <div className="container" style={{marginTop:"16px"}}>
          <NewsRail />
        </div>
      </section>
    </div>
  );
}