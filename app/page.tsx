import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NewsRail = dynamic(() => import("../components/NewsRail"), { ssr: false, loading: () => null });

export const revalidate = 0;

export const metadata = {
  title: "Bahnerjob  Jobs & Stellenanzeigen im Bahnsektor",
  description: "Jobbörse für den Bahnsektor: Stellen finden und Anzeigen schalten  klar strukturiert, schnell online, mit starker Sichtbarkeit."
};

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section style={{textAlign:"center", padding:"56px 0 24px"}}>
        <div className="chip">Die Jobbörse für den Bahnsektor</div>
        <h1 style={{fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif", fontWeight:800, letterSpacing:"-0.01em", fontSize:"clamp(2.25rem,5vw,3rem)", margin:"20px 0 0"}}>Klar. Modern. Fokussiert.</h1>
        <p style={{maxWidth:"46rem", margin:"16px auto 0", color:"rgba(235,235,240,.9)"}}>
          Finde passende Stellen oder erreiche gezielt Fachkräfte  schnell, klar, ohne Umwege.
        </p>
        <div style={{display:"flex", flexWrap:"wrap", gap:"12px", justifyContent:"center", marginTop:"28px"}}>
          <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige veröffentlichen</Link>
        </div>
      </section>

      <hr className="rule" />

      {/* ZIELGRUPPEN */}
      <section>
        <div style={{display:"grid", gap:"16px", gridTemplateColumns:"1fr"}}>
          {/* Für Unternehmen */}
          <article className="panel">
            <div className="muted" style={{fontSize:"12px"}}>Für Unternehmen</div>
            <h2 style={{fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif", fontSize:"22px", fontWeight:800, letterSpacing:"-0.01em", margin:"8px 0 0"}}>Mehr qualifizierte Bewerbungen</h2>
            <p style={{marginTop:"12px", color:"rgba(235,235,240,.9)"}}>
              Erreiche Fachkräfte im Bahnsektor ohne Streuverlust. Anzeige in Minuten online, einfach pflegbar und auf allen Geräten stark sichtbar.
            </p>
            <ul style={{marginTop:"16px", color:"rgba(235,235,240,.85)", paddingLeft:"18px"}}>
              <li style={{marginBottom:"6px"}}>Zielgerichtete Reichweite im Bahnsektor</li>
              <li style={{marginBottom:"6px"}}>In Minuten live, unkomplizierte Pflege</li>
              <li>Featured &amp; Boost für zusätzliche Sichtbarkeit</li>
            </ul>
            <div style={{display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center", marginTop:"20px"}}>
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige veröffentlichen</Link>
              <Link href="/pricing" className="btn btn-secondary" aria-label="Pakete und Leistungen">Pakete ansehen</Link>
            </div>
          </article>

          {/* Für Bewerber:innen */}
          <article className="panel">
            <div className="muted" style={{fontSize:"12px"}}>Für Bewerber:innen</div>
            <h2 style={{fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif", fontSize:"22px", fontWeight:800, letterSpacing:"-0.01em", margin:"8px 0 0"}}>Finde deinen nächsten Halt</h2>
            <p style={{marginTop:"12px", color:"rgba(235,235,240,.9)"}}>
              Aktuelle Jobs im Bahnsektor. Filter nach Ort, Bundesland oder Arbeitgeber und direkt beim Unternehmen bewerben.
            </p>
            <ul style={{marginTop:"16px", color:"rgba(235,235,240,.85)", paddingLeft:"18px"}}>
              <li style={{marginBottom:"6px"}}>Relevante Inhalte: Aufgaben, Anforderungen, Benefits</li>
              <li style={{marginBottom:"6px"}}>Filter nach Ort, Bundesland &amp; Arbeitgeber</li>
              <li>Direkte Bewerbung beim Unternehmen</li>
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
          <Link href="/pricing" className="btn btn-secondary">Pakete ansehen</Link>
        </div>
        <div className="container" style={{display:"grid", gap:"16px", gridTemplateColumns:"1fr", marginTop:"16px"}}>
          <div className="panel">
            <div style={{fontWeight:700}}>Branchenspezifisch</div>
            <p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Jobs ausschließlich für den Bahnsektor  zielgerichtete Reichweite ohne Umwege.</p>
          </div>
          <div className="panel">
            <div style={{fontWeight:700}}>Schnell &amp; einfach</div>
            <p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Stellenanzeigen in wenigen Minuten online  klarer Ablauf, direkte Veröffentlichung.</p>
          </div>
          <div className="panel">
            <div style={{fontWeight:700}}>Transparente Pakete</div>
            <p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Basic, Featured oder Boost  klar kalkulierbar und fair.</p>
          </div>
          <div className="panel">
            <div style={{fontWeight:700}}>Maximale Sichtbarkeit</div>
            <p className="muted" style={{marginTop:"4px", fontSize:"14px"}}>Moderne Darstellung und mobil optimiert  schnell gefunden.</p>
          </div>
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