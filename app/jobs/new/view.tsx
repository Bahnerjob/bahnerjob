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

/** Hilfsfunktion: Listentext zu Punkten parsen (trennt an Zeilen mit , -, * oder Zeilenumbruch) */
function toBullets(text: string): string[] {
  return text
    .split(/\r?\n|\u2022|^- |\* /gm)
    .map(s => s.replace(/^[-*\u2022]\s*/, "").trim())
    .filter(Boolean);
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

  // NEU: gegliederte Beschreibung
  const [tasks, setTasks] = useState("");
  const [profile, setProfile] = useState("");
  const [benefits, setBenefits] = useState("");

  const tasksCount = useMemo(() => tasks.length, [tasks]);
  const profileCount = useMemo(() => profile.length, [profile]);
  const benefitsCount = useMemo(() => benefits.length, [benefits]);

  const tasksBullets = useMemo(() => toBullets(tasks), [tasks]);
  const profileBullets = useMemo(() => toBullets(profile), [profile]);
  const benefitsBullets = useMemo(() => toBullets(benefits), [benefits]);

  function buildCombinedDesc() {
    const parts: string[] = [];
    if (tasksBullets.length) parts.push("Aufgaben:\n " + tasksBullets.join("\n "));
    if (profileBullets.length) parts.push("Profil:\n " + profileBullets.join("\n "));
    if (benefitsBullets.length) parts.push("Benefits:\n " + benefitsBullets.join("\n "));
    return parts.join("\n\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const desc = buildCombinedDesc(); // bestehende Pipeline weiter bedienen
    const q = new URLSearchParams({ pkg, title, company, state, city, applyUrl, desc }).toString();
    router.push(`/pricing?${q}`);
  }

  return (
    <div className="bj-new px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Anzeige erstellen</h1>
          <p className="text-neutral-400 mt-2">
            Kurze, klare Angaben sorgen für mehr Bewerbungen. Dies kann unten jederzeit geändert werden.
          </p>
          {preselect && (
            <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-300">
              Vorausgewähltes Paket: <strong>{formatPkg(preselect)}</strong>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
          {/* FORMULAR */}
          <form onSubmit={onSubmit} className="form-layout grid gap-5">
            {/* Sektion: Paket */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Paket wählen</h2>
                <p className="section-sub">Wählen Sie das Modell, das zu der Anzeige passt. Ein späterer Wechsel ist möglich.</p>
              </div>

              <div className="pkg-grid">
                {([
                  {key:"basic", title:"Basic", desc:"30 Tage Laufzeit  gelistet in Suche & Liste"},
                  {key:"featured", title:"Featured", desc:"Priorisiert in Listen  Featured-Badge"},
                  {key:"boost", title:"Boost", desc:"Maximale Prominenz  45 Tage Laufzeit"},
                ] as {key:Pkg; title:string; desc:string}[]).map((opt) => {
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
                        <span className={["option-dot", active ? "option-dot--on" : "option-dot--off"].join(" ")} aria-hidden="true"></span>
                      </div>
                      <div className="option-desc">{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Sektion: Basisdaten */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Basisdaten</h2>
                <p className="section-sub">Stellentitel und Arbeitgeber  damit Bewerbende das Unternehmen sofort erkennen.</p>
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
                  <p className="help">Ein konkreter Titel mit (m/w/d) steigert die Klickrate.</p>
                </div>

                <div className="field">
                  <label className="label block">Unternehmen <span className="req">*</span></label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="z. B. DB Regio AG"
                    className="input w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
                    required
                    aria-required="true"
                  />
                  <p className="help">Offizieller Arbeitgebername oder Marke.</p>
                </div>
              </div>
            </section>

            {/* Sektion: Standort & Bewerbung */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Standort & Bewerbung</h2>
                <p className="section-sub">Ort unterstützt die Suche; der Link führt direkt zur Bewerbung.</p>
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
                  <p className="help">Optional; verbessert die Filterbarkeit.</p>
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
                  <p className="help">Direkter Link zur Bewerbung oder Karriereseite.</p>
                </div>
              </div>
            </section>

            {/* Sektion: Beschreibung  gegliedert */}
            <section className="card section no-overlap">
              <div className="section-head">
                <h2 className="section-title">Stellenbeschreibung</h2>
                <p className="section-sub">Kurz und klar: Aufgaben, Anforderungen und Vorteile.</p>
              </div>

              <div className="desc-grid">
                <div className="field">
                  <label className="label block">Aufgaben</label>
                  <textarea
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    placeholder={" Führen von \n Übernehmen von "}
                    className="textarea w-full"
                    aria-label="Aufgaben"
                  />
                  <div className="counter">{tasksCount} / 2000</div>
                </div>

                <div className="field">
                  <label className="label block">Profil</label>
                  <textarea
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    placeholder={" Abgeschlossene Ausbildung \n Erfahrung in "}
                    className="textarea w-full"
                    aria-label="Profil"
                  />
                  <div className="counter">{profileCount} / 2000</div>
                </div>

                <div className="field">
                  <label className="label block">Benefits</label>
                  <textarea
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    placeholder={" Tarifliche Vergütung \n Zuschläge "}
                    className="textarea w-full"
                    aria-label="Benefits"
                  />
                  <div className="counter">{benefitsCount} / 2000</div>
                </div>
              </div>
            </section>

            {/* Actions */}
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
                  {formatPkg(pkg)}
                </div>
              </div>

              <h3 className="text-lg font-semibold">
                {title || "Stellentitel"}
                <span className="text-neutral-400 font-normal">  {company || "Unternehmen"}</span>
              </h3>
              <div className="text-sm text-neutral-400 mb-3 truncate">
                {(city || "Ort") + (state ? `, ${state}` : state === "" ? "" : ", Bundesland")}
              </div>

              {/* Geordnete Vorschau der drei Bereiche */}
              <div className="preview-list">
                {tasksBullets.length > 0 && (
                  <div className="preview-block">
                    <div className="preview-head">Aufgaben</div>
                    <ul className="preview-ul">
                      {tasksBullets.map((it, i) => <li key={"t"+i}>{it}</li>)}
                    </ul>
                  </div>
                )}
                {profileBullets.length > 0 && (
                  <div className="preview-block">
                    <div className="preview-head">Profil</div>
                    <ul className="preview-ul">
                      {profileBullets.map((it, i) => <li key={"p"+i}>{it}</li>)}
                    </ul>
                  </div>
                )}
                {benefitsBullets.length > 0 && (
                  <div className="preview-block">
                    <div className="preview-head">Benefits</div>
                    <ul className="preview-ul">
                      {benefitsBullets.map((it, i) => <li key={"b"+i}>{it}</li>)}
                    </ul>
                  </div>
                )}
                {tasksBullets.length + profileBullets.length + benefitsBullets.length === 0 && (
                  <p className="text-sm text-neutral-300 min-h-[6rem]">
                    Kurzbeschreibung der Stelle 
                  </p>
                )}
              </div>

              <div className="mt-4">
                <a
                  href={applyUrl || "#"}
                  className="inline-block text-sm font-semibold underline underline-offset-4"
                  onClick={(e) => { if (!applyUrl) e.preventDefault(); }}
                >
                  {applyUrl ? "Jetzt bewerben" : ""}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
