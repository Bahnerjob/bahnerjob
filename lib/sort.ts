export type Pkg = "basic" | "featured" | "boost";

export function pkgRank(p: Pkg): number {
  switch (p) {
    case "boost": return 3;
    case "featured": return 2;
    default: return 1;
  }
}

/** simpler, stabiler Hash */
function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

/**
 * Rotation für Anzeigen mit gleicher Paketstufe.
 * saltMode:
 *  - "daily": rotiert pro Tag
 *  - "3h": rotiert alle ~3 Stunden
 */
export function rotationKey(id: string, saltMode: "daily" | "3h" = "daily"): number {
  const now = new Date();
  const dayOfYear = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(now.getFullYear(),0,0)) / 86400000);
  const salt = saltMode === "3h" ? Math.floor(now.getHours() / 3) : dayOfYear;
  return hashStr(id + ":" + salt);
}

export type Job = {
  id: string;
  title: string;
  company: string;
  pkg: Pkg;
  country: "DE" | "AT" | "CH" | "INTL";
  state?: string;
  city?: string;
  postedAt: string; // ISO
  applyUrl: string;
  description?: string; // optional (gekürzt)
};

export function sortJobs(jobs: Job[]): Job[] {
  // 1) Nach Paket priorisieren (boost>featured>basic)
  // 2) Innerhalb gleicher Paketstufe: nach RotationKey (fairer Wechsel)
  // 3) Fallback: nach Datum (neuer zuerst)
  return [...jobs].sort((a, b) => {
    const r = pkgRank(b.pkg) - pkgRank(a.pkg);
    if (r !== 0) return r;
    const rot = rotationKey(a.id, "3h") - rotationKey(b.id, "3h");
    if (rot !== 0) return rot;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });
}
