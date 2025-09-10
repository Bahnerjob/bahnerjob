"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Draft = {
  title: string;
  company: string;
  location: string;
  bundesland: string;
  applyUrl: string;
  logoUrl: string;
  description: string;
};

const initial: Draft = {
  title: "",
  company: "",
  location: "",
  bundesland: "",
  applyUrl: "",
  logoUrl: "",
  description: "",
};

const PACKAGES: { key: "basic" | "featured" | "boost"; label: string; desc: string }[] = [
  { key: "basic",    label: "Basic",    desc: "30 Tage Laufzeit, Sichtbar in Jobliste & Suche" },
  { key: "featured", label: "Featured", desc: "Alles aus Basic + priorisierte Platzierung & Kennzeichnung" },
  { key: "boost",    label: "Boost",    desc: "Alles aus Featured + 45 Tage Laufzeit & maximale Prominenz" }
];

export default function NewJobPage() {
  const [draft, setDraft] = useState<Draft>(initial);
  const [pkgKey, setPkgKey] = useState<"basic" | "featured" | "boost">("featured");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Paket per URL vorbelegen: /jobs/new?pkg=basic|featured|boost
  const sp = useSearchParams();
  useEffect(() => {
    const p = sp.get("pkg");
    if (p === "basic" || p === "featured" || p === "boost") setPkgKey(p);
  }, [sp]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: pkgKey, ad: draft }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error || "Checkout konnte nicht gestartet werden.");
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e.message || "Unbekannter Fehler");
      setBusy(false);
    }
  }

  function bind<K extends keyof Draft>(key: K) {
    return {
      value: draft[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setDraft((d) => ({ ...d, [key]: e.target.value })),
    };
  }

  const titleCount = draft.title.length;
  const descCount = draft.description.length;

  const previewTitle = draft.title || "Jobtitel";
  const previewMeta = useMemo(() => {
    const company = draft.company || "Firma";
    const loc = draft.location || "Ort";
    const bl = draft.bundesland ? ` (${draft.bundesland})` : "";
    return `${company} · ${loc}${bl}`;
  }, [draft.company, draft.location, draft.bundesland]);

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      {/* ---------- LINKSSPALTE: FORM ---------- */}
      <div className="space-y-8">
        {/* Stepper */}
        <nav className="stepper card no-lift p-3" aria-label="Fortschritt">
          <Step number={1} label="Entwurf" active />
          <Step number={2} label="Paket" active={false} />
          <Step number={3} label="Bezahlen" active={false} />
        </nav>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Abschnitt: Anzeige */}
          <section className="card no-lift p-6">
            <header className="section-head">
              <h2>Stellenausschreibung</h2>
              <p className="section-desc">
                Kurzer, klarer Titel. Eine prägnante Beschreibung hilft Bewerber:innen, schnell zu verstehen, worum es geht.
              </p>
            </header>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="title" className="label">Jobtitel *</label>
                <input id="title" required maxLength={80} placeholder="z. B. Triebfahrzeugführer (m/w/d)"
                  className="input" {...bind("title")} aria-describedby="help-title counter-title" />
                <div className="row-between">
                  <small id="help-title" className="help">Max. 80 Zeichen</small>
                  <small id="counter-title" className="counter">{titleCount}/80</small>
                </div>
              </div>

              <div className="row-2">
                <div className="field">
                  <label htmlFor="company" className="label">Firma *</label>
                  <input id="company" required maxLength={80} placeholder="z. B. DB Regio"
                    className="input" {...bind("company")} />
                </div>

                <div className="field">
                  <label htmlFor="bundesland" className="label">Bundesland</label>
                  <input id="bundesland" maxLength={40} placeholder="z. B. Bayern"
                    className="input" {...bind("bundesland")} />
                </div>
              </div>

              <div className="row-2">
                <div className="field">
                  <label htmlFor="location" className="label">Ort *</label>
                  <input id="location" required maxLength={80} placeholder="z. B. München"
                    className="input" {...bind("location")} />
                </div>

                <div className="field">
                  <label htmlFor="applyUrl" className="label">Bewerbungslink / E-Mail *</label>
                  <input id="applyUrl" required maxLength={120}
                    placeholder="https://firma.de/jobs/123 oder mailto:jobs@firma.de"
                    className="input" {...bind("applyUrl")} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="logoUrl" className="label">Logo-URL</label>
                <input id="logoUrl" maxLength={120} placeholder="https://…/logo.png"
                  className="input" {...bind("logoUrl")} />
                <small className="help">Quadratisches PNG/SVG empfohlen (mind. 96×96 px)</small>
              </div>

              <div className="field">
                <label htmlFor="description" className="label">Kurzbeschreibung</label>
                <textarea id="description" maxLength={400}
                  placeholder="Worum geht es? Anforderungen, Benefits, Kontakt …"
                  className="textarea" {...bind("description")}
                  aria-describedby="counter-desc" />
                <div className="row-end">
                  <small id="counter-desc" className="counter">{descCount}/400</small>
                </div>
              </div>
            </div>
          </section>

          {/* Abschnitt: Paket */}
          <section className="card no-lift p-6">
            <header className="section-head">
              <h2>Paket wählen</h2>
              <p className="section-desc">Die Preise sind in Stripe hinterlegt. Deine Auswahl steuert die Preis-ID.</p>
            </header>

            <div className="stack-3">
              {PACKAGES.map((p) => (
                <label key={p.key} className={`choice ${pkgKey === p.key ? "choice-active" : ""}`}>
                  <div className="choice-main">
                    <span className="choice-title">{p.label}</span>
                    <span className="choice-desc">{p.desc}</span>
                  </div>
                  <input
                    type="radio"
                    name="package"
                    checked={pkgKey === p.key}
                    onChange={() => setPkgKey(p.key)}
                    aria-label={p.label}
                  />
                </label>
              ))}
            </div>
          </section>

          {/* Aktionen */}
          <section className="card no-lift p-6">
            {err && <div className="alert error mb-3">{err}</div>}

            <div className="row-wrap">
              <button className="btn btn-accent" type="submit" disabled={busy}>
                {busy ? "Weiter zur Zahlung…" : "Jetzt bezahlen"}
              </button>
              <Link className="btn" href="/pricing">Pakete ansehen</Link>
              <Link className="btn" href="/">Zur Startseite</Link>
            </div>

            <p className="tiny text-neutral-500 mt-3">
              Mit „Jetzt bezahlen“ stimmst du der Verarbeitung deiner Angaben zur Anzeigenerstellung zu.
            </p>
          </section>
        </form>
      </div>

      {/* ---------- RECHTSSPALTE: STICKY VORSCHAU ---------- */}
      <aside className="sticky-card card no-lift p-6 h-fit">
        <div className="badge mb-3">Vorschau</div>

        <div className="flex items-start gap-3">
          {draft.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.logoUrl} alt="" className="w-12 h-12 rounded-lg object-cover border" />
          ) : (
            <div className="w-12 h-12 rounded-lg border bg-neutral-900/40" />
          )}

          <div>
            <div className="text-lg font-bold">{previewTitle}</div>
            <div className="text-neutral-400">{previewMeta}</div>
          </div>
        </div>

        <p className="mt-3 text-neutral-300 whitespace-pre-wrap">
          {draft.description || "Kurze Jobbeschreibung …"}
        </p>

        <div className="mt-4 text-sm text-neutral-400">
          Bewerbungsweg: {draft.applyUrl || "https://… oder mailto:…"}
        </div>
      </aside>
    </div>
  );
}

/* ------- kleine UI-Helfer ------- */
function Step({ number, label, active }: { number: number; label: string; active?: boolean }) {
  return (
    <div className={`step ${active ? "step-active" : ""}`}>
      <div className="step-num">{number}</div>
      <div className="step-label">{label}</div>
    </div>
  );
}
