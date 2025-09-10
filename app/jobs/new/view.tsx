"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Pkg = "basic" | "featured" | "boost";

function formatPkg(value: string | null) {
  if (!value) return "";
  switch (value) {
    case "basic": return "Basic";
    case "featured": return "Featured";
    case "boost": return "Boost";
    default: return value;
  }
}

export default function View() {
  const params = useSearchParams();
  const router = useRouter();

  const preselect = (params.get("pkg") as Pkg | null) ?? null;

  const [pkg, setPkg] = useState<Pkg>(preselect ?? "basic");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [applyUrl, setApplyUrl] = useState("");
  const [desc, setDesc] = useState("");

  const descCount = useMemo(() => desc.length, [desc]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ pkg, title, company, state, city, applyUrl }).toString();
    router.push(`/pricing?${q}`);
  }

  return (
    <div className="bj-new mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Anzeige erstellen</h1>
        <p className="text-neutral-400 mt-2">
          Kurze, klare Angaben sorgen für mehr Bewerbungen. Du kannst dein Paket jederzeit anpassen.
        </p>
        {preselect && (
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-300">
            Vorausgewähltes Paket: <strong>{formatPkg(preselect)}</strong>  du kannst es unten ändern.
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* FORMULAR */}
        <form onSubmit={onSubmit} className="form-layout">
          {/* Sektion: Paket */}
          <section className="card section">
            <div className="section-head">
              <h2 className="section-title">Paket wählen</h2>
              <p className="section-sub">Du kannst später jederzeit wechseln.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(["basic", "featured", "boost"] as Pkg[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPkg(p)}
                  className={[
                    "btn w-full rounded-lg border px-3 py-2 text-left elevate",
                    pkg === p
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900",
                  ].join(" ")}
                  aria-pressed={pkg === p}
                >
                  <div className="text-sm font-semibold capitalize">{p}</div>
                  <div className="text-xs text-neutral-400">
                    {p === "basic" && "30 Tage  Sichtbar in Liste & Suche"}
                    {p === "featured" && "Priorisiert  Featured-Badge  Mehr Sichtbarkeit"}
                    {p === "boost" && "Maximale Prominenz  45 Tage"}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Sektion: Basisdaten */}
          <section className="card section">
            <div className="section-head">
              <h2 className="section-title">Basisdaten</h2>
              <p className="section-sub">Titel & Arbeitgeber  damit Bewerbende dich sofort erkennen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid">
              <div className="field">
                <label className="label block">Stellentitel <span className="req">*</span></label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="z. B. Triebfahrzeugführer (m/w/d)"
                  className="input w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
                  required
                  aria-required="true"
                />
                <p className="help">Konkreter Titel mit (m/w/d) steigert die Klickrate.</p>
              </div>

              <div className="field">
                <label className="label block">Firma <span className="req">*</span></label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="z. B. DB Regio AG"
                  className="input w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
                  required
                  aria-required="true"
                />
                <p className="help">Offizieller Arbeitgebername / Marke.</p>
              </div>
            </div>
          </section>

          {/* Sektion: Standort & Bewerbung */}
          <section className="card section">
            <div className="section-head">
              <h2 className="section-title">Standort & Bewerbung</h2>
              <p className="section-sub">Ort hilft bei der Suche, Link führt direkt zur Bewerbung.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 row-2">
              <div className="field">
                <label className="label block">Bundesland</label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="z. B. Baden-Württemberg"
                  className="input w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
                />
                <p className="help">Optional, verbessert die Filterbarkeit.</p>
              </div>

              <div className="field">
                <label className="label block">Ort</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="z. B. Friedrichshafen"
                  className="input w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
                />
              </div>

              <div className="field">
                <label className="label block">Bewerbungslink</label>
                <input
                  value={applyUrl}
                  onChange={(e) => setApplyUrl(e.target.value)}
                  placeholder="https://"
                  className="input w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
                  inputMode="url"
                />
                <p className="help">Direkter Link zur Bewerbung oder Karriere-Seite.</p>
              </div>
            </div>
          </section>

          {/* Sektion: Beschreibung */}
          <section className="card section">
            <div className="section-head">
              <h2 className="section-title">Stellenbeschreibung</h2>
              <p className="section-sub">Kurz & klar: Aufgaben, Profil, Benefits.</p>
            </div>

            <label className="label block sr-only">Stellenbeschreibung</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={10}
              placeholder={"Aufgaben:\n \n\nProfil:\n \n\nBenefits:\n "}
              className="textarea w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
              aria-label="Stellenbeschreibung"
            />
            <div className="counter text-right text-xs text-neutral-500 mt-1">
              {descCount} Zeichen
            </div>
          </section>

          {/* Actions */}
          <div className="card section flex items-center gap-3">
            <button type="submit" className="btn btn-accent rounded-lg px-4 py-2 font-semibold">
              Weiter zur Auswahl/Checkout
            </button>
            <a href="/pricing" className="btn rounded-lg px-4 py-2 border border-neutral-800">
              Preise ansehen
            </a>
          </div>
        </form>

        {/* VORSCHAU */}
        <aside className="sticky top-6 h-max">
          <div className="card elevate-m section">
            <div className="section-head row gap-2 items-baseline justify-between">
              <div>
                <div className="text-sm text-neutral-400">Vorschau</div>
                <div className="divider"></div>
              </div>
              <div
                className={[
                  "text-xs px-2 py-1 rounded border",
                  pkg === "boost"
                    ? "border-amber-500 text-amber-300"
                    : pkg === "featured"
                    ? "border-sky-500 text-sky-300"
                    : "border-neutral-700 text-neutral-300",
                ].join(" ")}
              >
                {formatPkg(pkg)}
              </div>
            </div>

            <h3 className="text-lg font-semibold">
              {title || "Stellentitel"}
              <span className="text-neutral-400 font-normal">  {company || "Firma"}</span>
            </h3>
            <div className="text-sm text-neutral-400 mb-3">
              {(city || "Ort") + (state ? `, ${state}` : state === "" ? "" : ", Bundesland")}
            </div>
            <p className="text-sm text-neutral-300 whitespace-pre-wrap min-h-[6rem]">
              {desc || "Kurze Beschreibung deiner Stelle "}
            </p>
            <div className="mt-4">
              <a
                href={applyUrl || "#"}
                className="inline-block text-sm font-semibold underline underline-offset-4"
                onClick={(e) => { if (!applyUrl) e.preventDefault(); }}
              >
                {applyUrl ? "Jetzt bewerben" : "Bewerbungslink hinzufügen"}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
