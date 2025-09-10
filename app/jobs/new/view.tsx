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

/** Zeilen/Listenpunkte robust parsen */
function toBullets(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map(s => s.replace(/^\s*(?:[-*]\s*)?/, "").trim())
    .filter(Boolean);
}

export default function View() {
  const params = useSearchParams();
  const router = useRouter();

  const preselect = (params.get("pkg") as Pkg | null) ?? null;

  // Meta
  const [pkg, setPkg] = useState<Pkg>(preselect ?? "basic");

  // Basisdaten
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  // Standort & Bewerbung
  const [country, setCountry] = useState<Country>("DE");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [applyUrl, setApplyUrl] = useState("");

  // Beschreibung (strukturiert)
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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
          {/* FORMULAR */}
          <form onSubmit={onSubmit} className="form-layout grid gap-5">
            {/* Paket wählen */}
             param($m) $m.Groups[1].Value -replace 'section no-overlap','section no-overlap desc-section' 
                <p className="section-sub">Kurz und klar gegliedert: Aufgaben, Anforderungen, Benefits.</p>
              </div>

              <div className="desc-grid">
                <div className="field">
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

                <div className="field">
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

                <div className="field">
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
                {(city || "Ort")}{(state ? `, ${state}` : "")}{country ? `  ${country}` : ""}
              </div>

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
                    <div className="preview-head">Anforderungen</div>
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
                    Die Kurzbeschreibung erscheint hier.
                  </p>
                )}
              </div>

              <div className="mt-4">
                {applyUrl && (
                  <a
                    href={applyUrl}
                    className="inline-block text-sm font-semibold underline underline-offset-4"
                  >
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

