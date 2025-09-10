"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Pkg = "basic" | "featured" | "boost";
type Country = "DE" | "AT" | "CH" | "INTL";

function formatPkg(value: string | null) {
  if (!value) return "";
  switch (value) {
    case "basic": return "Basic";
    case "featured": return "Featured";
    case "boost": return "Boost";
    default: return value;
  }
}

/** Listentext robust in Bullet-Punkte umwandeln */
function toBullets(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((s) => s.replace(/^\s*(?:[-*]\s*)?/, "").trim())
    .filter(Boolean);
}

export default function View() {
  const params = useSearchParams();
  const router = useRouter();

  const preselect = (params.get("pkg") as Pkg | null) ?? null;

  // Paket
  const [pkg, setPkg] = useState<Pkg>(preselect ?? "basic");

  // Basisdaten
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  // Standort & Bewerbung
  const [country, setCountry] = useState<Country>("DE");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  
  $matches[0] + @"
  const regionLabel = country === "CH"
    ? "Kanton"
    : (country === "INTL" ? "Region/Province/State" : "Bundesland");
  const regionPlaceholder = country === "CH"
    ? "z. B. Zürich"
    : (country === "AT"
        ? "z. B. Steiermark"
        : (country === "DE" ? "z. B. Baden-Württemberg" : "z. B. Ontario"));
"@
// Beschreibung (gegliedert)
  const [tasks, setTasks] = useState("");
  const [profile, setProfile] = useState("");
  const [benefits, setBenefits] = useState("");

  const tasksBullets = useMemo(() => toBullets(tasks), [tasks]);
  const profileBullets = useMemo(() => toBullets(profile), [profile]);
  const benefitsBullets = useMemo(() => toBullets(benefits), [benefits]);

  const tasksCount = tasks.length;
  const profileCount = profile.length;
  const benefitsCount = benefits.length;

  function buildCombinedDesc() {
    const parts: string[] = [];
    if (tasksBullets.length) parts.push("Aufgaben:\n " + tasksBullets.join("\n "));
    if (profileBullets.length) parts.push("Anforderungen:\n " + profileBullets.join("\n "));
    if (benefitsBullets.length) parts.push("Benefits:\n " + benefitsBullets.join("\n "));
    return parts.join("\n\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const desc = buildCombinedDesc();
    const q = new URLSearchParams({
      pkg,
      title,
      company,
      country,
      state,
      city,
      applyUrl,
      desc,
    }).toString();
    router.push(`/pricing?${q}`);
  }

  return (
    <div className="bj-new px-4 py-6">
      {/* Breiter Container */}
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Anzeige erstellen</h1>
          <p className="text-neutral-400 mt-2">
            Präzise Angaben erhöhen die Reichweite und die Qualität der Bewerbungen.
          </p>
          {preselect && (
            <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-300">
              Vorausgewähltes Paket: <strong>{formatPkg(preselect)}</strong>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
          {/* FORMULAR */}
          <form onSubmit={onSubmit} className="form-layout grid gap-5">
            {/* Paket wählen */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Paket wählen</h2>
                <p className="section-sub">
                  Wählen Sie das Modell, das zu der Anzeige passt. Ein späterer Wechsel ist möglich.
                </p>
              </div>

              <div className="pkg-grid">
                {([
                  { key: "basic", title: "Basic", desc: "30 Tage Laufzeit  gelistet in Suche & Liste" },
                  { key: "featured", title: "Featured", desc: "Priorisiert in Listen  Featured-Badge" },
                  { key: "boost", title: "Boost", desc: "Maximale Prominenz  45 Tage Laufzeit" },
                ] as { key: Pkg; title: string; desc: string }[]).map((opt) => {
                  const active = pkg === opt.key;
                  return (
                    <button
                      type="button"
                      key={opt.key}
                      onClick={() => setPkg(opt.key)}
                      aria-pressed={active}
                      className={["option-card", active ? "option-card--active" : "option-card--idle"].join(" ")}
                    >
                      <div className="option-head">
                        <span className="option-title">{opt.title}</span>
                        <span
                          className={["option-dot", active ? "option-dot--on" : "option-dot--off"].join(" ")}
                          aria-hidden="true"
                        ></span>
                      </div>
                      <div className="option-desc">{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Basisdaten */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Basisdaten</h2>
                <p className="section-sub">
                  Stellentitel und Unternehmen  damit Bewerbende die Anzeige eindeutig zuordnen.
                </p>
              </div>

              <div className="form-grid-2">
                <div className="field min-w-0">
                  <label className="label block">
                    Stellentitel <span className="req">*</span>
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="z. B. Triebfahrzeugführer (m/w/d)"
                    className="input w-full"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="field min-w-0">
                  <label className="label block">
                    Unternehmen <span className="req">*</span>
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="z. B. DB Regio AG"
                    className="input w-full"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </section>

            {/* Standort & Bewerbung */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Standort & Bewerbung</h2>
                
              </div>

              <div className="grid grid-cols-1 gap-4 form-grid-4">
                <div className="field min-w-0">
                  <label className="label block">Land</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value as Country)}
                    className="select w-full"
                    aria-label="Land"
                  >
                    <option value="DE">Deutschland</option>
                    <option value="AT">Österreich</option>
                    <option value="CH">Schweiz</option>
                    <option value="INTL">Ausland (international)</option>
                  </select>
                </div>

                <div className="field min-w-0">
                  <label className="label block">{regionLabel}</label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder={regionPlaceholder}
                    className="input w-full"
                  />
                </div>

                <div className="field min-w-0">
                  <label className="label block">Ort</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="z. B. Friedrichshafen"
                    className="input w-full"
                  />
                </div>

                <div className="field min-w-0">
                  <label className="label block">Bewerbungslink</label>
                  <input
                    value={applyUrl}
                    onChange={(e) => setApplyUrl(e.target.value)}
                    placeholder="https://"
                    className="input w-full"
                    inputMode="url"
                  />
                  <p className="help">Direkter Link zur Bewerbung oder Karriereseite.</p>
                </div>
              </div>
            </section>

            {/* Stellenbeschreibung  gegliedert & professionell */}
            <section className="card section no-overlap desc-section">
              <div className="section-head">
                <h2 className="section-title">Stellenbeschreibung</h2>
                
              </div>

              <div className="desc-stack grid gap-6">
                <div className="field min-w-0">
                  <label className="label block">Aufgaben</label>
                  <textarea
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    placeholder={" Führen von Zügen im Regel- und Störbetrieb\n Durchführung der Abfahrts- und Bremsproben\n Kommunikation mit Leitstelle und Werkstatt"}
                    className="textarea w-full"
                    aria-label="Aufgaben"
                  />
                  <div className="counter">{tasksCount} / 2000</div>
                </div>

                <div className="field min-w-0">
                  <label className="label block">Anforderungen</label>
                  <textarea
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    placeholder={" Abgeschlossene Ausbildung nach TfV / EIB\n Erfahrung im Strecken- oder Rangierdienst\n Bereitschaft zu Schicht- und Wochenendarbeit"}
                    className="textarea w-full"
                    aria-label="Anforderungen"
                  />
                  <div className="counter">{profileCount} / 2000</div>
                </div>

                <div className="field min-w-0">
                  <label className="label block">Benefits</label>
                  <textarea
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    placeholder={" Tarifliche Vergütung inkl. Zuschläge\n 30 Tage Urlaub, Jobticket\n Weiterbildungs- und Aufstiegsmöglichkeiten"}
                    className="textarea w-full"
                    aria-label="Benefits"
                  />
                  <div className="counter">{benefitsCount} / 2000</div>
                </div>
              </div>
            </section>

            {/* Aktionen */}
            <div className="card section no-overlap flex items-center gap-3">
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
            <div className="card elevate-quiet section no-overlap">
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
                  {formatPkg(preselect ?? pkg)}
                </div>
              </div>

              <h3 className="text-lg font-semibold">
                {title || "Stellentitel"}
                <span className="text-neutral-400 font-normal">  {company || "Unternehmen"}</span>
              </h3>
              <div className="text-sm text-neutral-400 mb-3 truncate">
                {(city || "Ort")}{state ? `, ${state}` : ""}{country ? `  ${country}` : ""}
              </div>

              {/* Vorschau: drei Blöcke */}
              <div className="preview-list">
                {tasksBullets.length > 0 && (
                  <div className="preview-block">
                    <div className="preview-head">Aufgaben</div>
                    <ul className="preview-ul">
                      {tasksBullets.map((it, i) => (
                        <li key={"t" + i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {profileBullets.length > 0 && (
                  <div className="preview-block">
                    <div className="preview-head">Anforderungen</div>
                    <ul className="preview-ul">
                      {profileBullets.map((it, i) => (
                        <li key={"p" + i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {benefitsBullets.length > 0 && (
                  <div className="preview-block">
                    <div className="preview-head">Benefits</div>
                    <ul className="preview-ul">
                      {benefitsBullets.map((it, i) => (
                        <li key={"b" + i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tasksBullets.length + profileBullets.length + benefitsBullets.length === 0 && (
                  <p className="text-sm text-neutral-300 min-h-[6rem]">Die Kurzbeschreibung erscheint hier.</p>
                )}
              </div>

              <div className="mt-4">
                {applyUrl && (
                  <a href={applyUrl} className="inline-block text-sm font-semibold underline underline-offset-4">
                    Jetzt bewerben
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}




