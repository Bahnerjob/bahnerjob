"use client";

import { useState } from "react";
import Link from "next/link";

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

const PACKAGES: { key: "basic" | "featured" | "boost"; label: string; desc: string; env: string }[] = [
  { key: "basic",    label: "Basic",    desc: "Standard-Laufzeit, normale Sichtbarkeit",  env: "NEXT_PUBLIC_PRICE_ID_BASIC" },
  { key: "featured", label: "Featured", desc: "Hervorgehoben auf der Startseite",         env: "NEXT_PUBLIC_PRICE_ID_FEATURED" },
  { key: "boost",    label: "Boost",    desc: "Max. Reichweite & prominente Platzierung", env: "NEXT_PUBLIC_PRICE_ID_BOOST" },
];

export default function NewJobPage() {
  const [draft, setDraft] = useState<Draft>(initial);
  const [pkgKey, setPkgKey] = useState<"basic" | "featured" | "boost">("featured");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    // env-Variablen sind im Client NICHT sichtbar – diese werden serverseitig im API-Route gemappt.
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          package: pkgKey,
          ad: draft,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Checkout konnte nicht gestartet werden.");
      }
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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Formular */}
      <form onSubmit={onSubmit} className="card p-6 flex flex-col gap-4 no-lift">
        <div className="badge">Anzeige entwerfen</div>
        <div className="grid gap-3">
          <label className="block">
            <div className="text-sm text-neutral-400 mb-1">Jobtitel *</div>
            <input className="w-full rounded-xl bg-transparent border px-3 py-2"
                   required maxLength={80} placeholder="z.B. Triebfahrzeugführer (m/w/d)"
                   {...bind("title")} />
          </label>

          <div className="grid md:grid-cols-2 gap-3">
            <label className="block">
              <div className="text-sm text-neutral-400 mb-1">Firma *</div>
              <input className="w-full rounded-xl bg-transparent border px-3 py-2"
                     required maxLength={80} placeholder="z.B. DB Regio"
                     {...bind("company")} />
            </label>
            <label className="block">
              <div className="text-sm text-neutral-400 mb-1">Bundesland</div>
              <input className="w-full rounded-xl bg-transparent border px-3 py-2"
                     maxLength={40} placeholder="z.B. Bayern"
                     {...bind("bundesland")} />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <label className="block">
              <div className="text-sm text-neutral-400 mb-1">Ort *</div>
              <input className="w-full rounded-xl bg-transparent border px-3 py-2"
                     required maxLength={80} placeholder="z.B. München"
                     {...bind("location")} />
            </label>
            <label className="block">
              <div className="text-sm text-neutral-400 mb-1">Bewerbungslink / E-Mail *</div>
              <input className="w-full rounded-xl bg-transparent border px-3 py-2"
                     required maxLength={120} placeholder="z.B. https://firma.de/jobs/123 oder mailto:jobs@firma.de"
                     {...bind("applyUrl")} />
            </label>
          </div>

          <label className="block">
            <div className="text-sm text-neutral-400 mb-1">Logo-URL</div>
            <input className="w-full rounded-xl bg-transparent border px-3 py-2"
                   maxLength={120} placeholder="https://…/logo.png"
                   {...bind("logoUrl")} />
          </label>

          <label className="block">
            <div className="text-sm text-neutral-400 mb-1">Kurzbeschreibung (max. 400 Zeichen)</div>
            <textarea className="w-full rounded-xl bg-transparent border px-3 py-2 min-h-[120px]"
                      maxLength={400} placeholder="Worum geht es? Anforderungen, Benefits, Kontakt …"
                      {...bind("description")} />
          </label>
        </div>

        {/* Paketwahl */}
        <div className="mt-2">
          <div className="text-sm text-neutral-400 mb-2">Paket wählen</div>
          <div className="grid gap-2">
            {PACKAGES.map((p) => (
              <label key={p.key} className={`card p-3 flex items-center justify-between ${pkgKey === p.key ? "ring-1" : ""}`}
                     style={pkgKey === p.key ? { boxShadow: "0 0 0 1px rgba(220,38,38,.42)" } : undefined}>
                <div className="flex flex-col">
                  <span className="font-semibold">{p.label}</span>
                  <span className="text-sm text-neutral-400">{p.desc}</span>
                </div>
                <input
                  type="radio"
                  name="package"
                  checked={pkgKey === p.key}
                  onChange={() => setPkgKey(p.key)}
                />
              </label>
            ))}
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            Die Preise sind in Stripe hinterlegt. Auswahl steuert die entsprechende Preis-ID.
          </div>
        </div>

        {/* Aktionen */}
        {err && <div className="text-sm text-red-400">{err}</div>}
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="btn btn-accent" type="submit" disabled={busy}>
            {busy ? "Weiter zur Zahlung…" : "Jetzt bezahlen"}
          </button>
          <Link className="btn" href="/pricing">Zu den Paketen</Link>
        </div>
      </form>

      {/* Live-Vorschau */}
      <div className="card p-6 no-lift">
        <div className="badge mb-3">Vorschau</div>
        <div className="flex items-start gap-3">
          {draft.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.logoUrl} alt="" className="w-12 h-12 rounded-lg object-cover border" />
          ) : (
            <div className="w-12 h-12 rounded-lg border bg-neutral-900/40" />
          )}
          <div>
            <div className="text-lg font-bold">{draft.title || "Jobtitel"}</div>
            <div className="text-neutral-400">
              {draft.company || "Firma"} · {draft.location || "Ort"}
              {draft.bundesland ? ` (${draft.bundesland})` : ""}
            </div>
          </div>
        </div>
        <p className="mt-3 text-neutral-300 whitespace-pre-wrap">
          {draft.description || "Kurze Jobbeschreibung …"}
        </p>
        <div className="mt-4 text-sm text-neutral-400">
          Bewerbungsweg: {draft.applyUrl || "https://… oder mailto:…"}
        </div>
      </div>
    </div>
  );
}
