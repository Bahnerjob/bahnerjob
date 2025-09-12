"use client";

import React from "react";
import Link from "next/link";

type Form = {
  title: string;
  company: string;
  location: string;
  region: string;
  type: string;
  description: string;
  requirements: string;
  benefits: string;
  applyUrl: string;
  contactEmail: string;
  package: "basic" | "featured" | "boost";
};

export default function NewJobPage() {
  const [form, setForm] = React.useState<Form>({
    title: "",
    company: "",
    location: "",
    region: "",
    type: "",
    description: "",
    requirements: "",
    benefits: "",
    applyUrl: "",
    contactEmail: "",
    package: "basic",
  });

  function up<K extends keyof Form>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value as Form[K] }));
  }

  const isPrimaryDisabled =
    !form.title.trim() ||
    !form.company.trim() ||
    !form.location.trim() ||
    !form.description.trim();

  return (
    <main className="page-wrap">
      {/* HERO */}
      <section style={{textAlign:"center", padding:"24px 0 8px"}}>
        <div className="chip">Anzeige aufgeben</div>
        <h1
          style={{
            fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
            fontWeight:800, letterSpacing:"-0.01em",
            fontSize:"clamp(2rem,4.6vw,2.5rem)", margin:"18px 0 0"
          }}
        >
          Stellenausschreibung erstellen  klar & modern
        </h1>
        <p style={{maxWidth:"46rem", margin:"12px auto 0", color:"rgba(235,235,240,.9)"}}>
          Trage die wichtigsten Angaben ein. Rechts siehst du sofort eine Vorschau deiner Anzeige.
        </p>
        <div style={{display:"flex", gap:"12px", justifyContent:"center", marginTop:"18px"}}>
          <Link href="/" className="btn btn-secondary">Zur Startseite</Link>
        </div>
      </section>

      <hr className="rule" />

      {/* GRID: Formular links, Vorschau rechts */}
      <section style={{display:"grid", gap:"16px"}}>
        <div style={{display:"grid", gap:"14px", gridTemplateColumns:"1fr", alignItems:"start"}}>
          {/* FORM */}
          <form className="panel" style={{display:"grid", gap:"12px"}} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="muted" htmlFor="title">Jobtitel *</label>
              <input id="title" value={form.title} onChange={up("title")}
                placeholder="z. B. Triebfahrzeugführer:in (m/w/d)"
                style={inputStyle}/>
            </div>

            <div style={{display:"grid", gap:"12px", gridTemplateColumns:"1fr 1fr"}}>
              <div>
                <label className="muted" htmlFor="company">Unternehmen *</label>
                <input id="company" value={form.company} onChange={up("company")}
                  placeholder="Firmenname" style={inputStyle}/>
              </div>
              <div>
                <label className="muted" htmlFor="type">Beschäftigungsart</label>
                <select id="type" value={form.type} onChange={up("type")} style={selectStyle}>
                  <option value="">Bitte wählen </option>
                  <option>Vollzeit</option>
                  <option>Teilzeit</option>
                  <option>Ausbildung</option>
                  <option>Befristet</option>
                </select>
              </div>
            </div>

            <div style={{display:"grid", gap:"12px", gridTemplateColumns:"1fr 1fr"}}>
              <div>
                <label className="muted" htmlFor="location">Ort *</label>
                <input id="location" value={form.location} onChange={up("location")}
                  placeholder="z. B. München" style={inputStyle}/>
              </div>
              <div>
                <label className="muted" htmlFor="region">Bundesland / Region</label>
                <input id="region" value={form.region} onChange={up("region")}
                  placeholder="z. B. Bayern" style={inputStyle}/>
              </div>
            </div>

            <div>
              <label className="muted" htmlFor="description">Aufgaben / Beschreibung *</label>
              <textarea id="description" value={form.description} onChange={up("description")}
                rows={5} placeholder="Kurz und präzise beschreiben, was die Rolle ausmacht."
                style={textareaStyle}/>
            </div>

            <div style={{display:"grid", gap:"12px", gridTemplateColumns:"1fr 1fr"}}>
              <div>
                <label className="muted" htmlFor="requirements">Anforderungen</label>
                <textarea id="requirements" value={form.requirements} onChange={up("requirements")}
                  rows={4} placeholder="Muss- und Kann-Kriterien, Qualifikationen."
                  style={textareaStyle}/>
              </div>
              <div>
                <label className="muted" htmlFor="benefits">Benefits</label>
                <textarea id="benefits" value={form.benefits} onChange={up("benefits")}
                  rows={4} placeholder="Was macht die Stelle attraktiv?"
                  style={textareaStyle}/>
              </div>
            </div>

            <div style={{display:"grid", gap:"12px", gridTemplateColumns:"1fr 1fr"}}>
              <div>
                <label className="muted" htmlFor="applyUrl">Bewerbungslink</label>
                <input id="applyUrl" value={form.applyUrl} onChange={up("applyUrl")}
                  placeholder="https:// (Karriereseite/ATS)" style={inputStyle}/>
              </div>
              <div>
                <label className="muted" htmlFor="contactEmail">Kontakt E-Mail</label>
                <input id="contactEmail" value={form.contactEmail} onChange={up("contactEmail")}
                  placeholder="jobs@unternehmen.de" style={inputStyle}/>
              </div>
            </div>

            <div>
              <label className="muted" htmlFor="package">Paket</label>
              <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"6px"}}>
                <button type="button" onClick={() => setForm(f => ({...f, package:"basic"}))}
                  className={"btn " + (form.package==="basic" ? "btn-primary" : "")}>Basic</button>
                <button type="button" onClick={() => setForm(f => ({...f, package:"featured"}))}
                  className={"btn " + (form.package==="featured" ? "btn-primary" : "")}>Featured</button>
                <button type="button" onClick={() => setForm(f => ({...f, package:"boost"}))}
                  className={"btn " + (form.package==="boost" ? "btn-primary" : "")}>Boost</button>
              </div>
            </div>

            <div style={{display:"flex", gap:"12px", flexWrap:"wrap", marginTop:"8px"}}>
              <Link
                href={"/pricing"}
                className={"btn btn-primary" + (isPrimaryDisabled ? " disabled" : "")}
                aria-disabled={isPrimaryDisabled}
                onClick={(e) => { if (isPrimaryDisabled) e.preventDefault(); }}
              >
                Weiter
              </Link>
              <Link href="/" className="btn btn-secondary">Abbrechen</Link>
            </div>

            <p className="muted" style={{fontSize:12}}>
              * Pflichtfelder. Du kannst Details später noch verfeinern.
            </p>
          </form>
        </div>

        {/* PREVIEW */}
        <aside className="panel" style={{display:"grid", gap:"10px"}}>
          <div className="muted" style={{fontSize:12}}>Vorschau</div>
          <h2 style={{
            fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
            fontSize:"20px", fontWeight:800, letterSpacing:"-0.01em"
          }}>
            {form.title || "Jobtitel"}
          </h2>
          <div style={{color:"rgba(235,235,240,.9)"}}>
            {form.company || "Unternehmen"}  {form.location || "Ort"}{form.region ? ` (${form.region})` : ""}{form.type ? `  ${form.type}` : ""}
          </div>

          <section>
            <div style={{fontWeight:700, marginTop:8}}>Beschreibung</div>
            <p className="muted" style={{marginTop:6}}>
              {form.description || "Kurze Zusammenfassung der Aufgaben."}
            </p>
          </section>

          {!!form.requirements.trim() && (
            <section>
              <div style={{fontWeight:700, marginTop:8}}>Anforderungen</div>
              <p className="muted" style={{marginTop:6, whiteSpace:"pre-wrap"}}>{form.requirements}</p>
            </section>
          )}

          {!!form.benefits.trim() && (
            <section>
              <div style={{fontWeight:700, marginTop:8}}>Benefits</div>
              <p className="muted" style={{marginTop:6, whiteSpace:"pre-wrap"}}>{form.benefits}</p>
            </section>
          )}

          <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginTop:10}}>
            {form.applyUrl ? (
              <a href={form.applyUrl} target="_blank" rel="noopener noreferrer" className="btn">Jetzt bewerben</a>
            ) : (
              <span className="btn disabled" aria-disabled="true">Jetzt bewerben</span>
            )}
            <span className="chip">{form.package === "basic" ? "Basic" : form.package === "featured" ? "Featured" : "Boost"}</span>
          </div>
        </aside>
      </section>
    </main>
  );
}

/** Inline Input Styles im Dark-Theme  neutral & gut sichtbar */
const baseField = {
  width: "100%",
  background: "rgba(20,20,22,.6)",
  border: "1px solid rgba(80,80,90,.6)",
  color: "rgb(240,240,245)",
  borderRadius: "10px",
  padding: "10px 12px",
  outline: "none" as const
};

const inputStyle: React.CSSProperties = { ...baseField, height: "40px" };
const selectStyle: React.CSSProperties = { ...baseField, height: "40px" };
const textareaStyle: React.CSSProperties = { ...baseField, minHeight: "120px" };