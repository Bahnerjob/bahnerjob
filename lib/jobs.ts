import { type Job } from "./sort";

/**
 * MOCKDATEN:
 * - Du kannst diese Liste jederzeit erweitern/ändern.
 * - Ziel: realistische Felder, um die UI zu testen.
 */
export const mockJobs: Job[] = [
  {
    id: "db-zugverkehr-1",
    title: "Quereinsteiger:in (w/m/d) für Umschulung als Zugverkehrssteuerer",
    company: "DB InfraGO AG",
    pkg: "boost",
    country: "DE",
    state: "Bayern",
    city: "Gemünden am Main",
    postedAt: new Date(Date.now() - 2*86400000).toISOString(),
    applyUrl: "https://www.deutschebahn.com/karriere",
    description: "Steuerung des Zugverkehrs, Kommunikation mit Leitstelle, Schichtdienst."
  },
  {
    id: "oebb-it-ba-1",
    title: "IT-Business Analyst:in Realtime-Kund:inneninformation",
    company: "ÖBB-Konzern",
    pkg: "featured",
    country: "AT",
    state: "Wien",
    city: "Favoriten",
    postedAt: new Date(Date.now() - 1*86400000).toISOString(),
    applyUrl: "https://karriere.oebb.at",
    description: "Analyse & Weiterentwicklung von KPI-Dashboards, Schnittstelle zwischen IT & Verkehr."
  },
  {
    id: "db-gleisbauer-1",
    title: "Gleisbauer / Facharbeiter im Schienenbau (w/m/d)",
    company: "Deutsche Bahn AG",
    pkg: "basic",
    country: "DE",
    state: "NRW",
    city: "Dortmund",
    postedAt: new Date(Date.now() - 5*86400000).toISOString(),
    applyUrl: "https://www.deutschebahn.com/karriere",
    description: "Instandhaltung von Weichen & Gleisen, Arbeiten im Gleisbereich."
  },
  {
    id: "oebb-verschub-1",
    title: "Verschieber:in",
    company: "ÖBB Produktion GmbH",
    pkg: "featured",
    country: "AT",
    state: "Oberösterreich",
    city: "Linz",
    postedAt: new Date(Date.now() - 3*86400000).toISOString(),
    applyUrl: "https://karriere.oebb.at",
    description: "Rangieren, Kuppeln, Sichern; Zusammenarbeit mit Triebfahrzeugführer:innen."
  },
  {
    id: "ch-leitstelle-1",
    title: "Mitarbeiter:in Leitstelle (m/w/d)",
    company: "Schweizer Bahnbetriebe",
    pkg: "basic",
    country: "CH",
    state: "Zürich",
    city: "Zürich",
    postedAt: new Date(Date.now() - 7*86400000).toISOString(),
    applyUrl: "#",
    description: "Disposition, Kommunikation, Störungsmanagement."
  },
  {
    id: "intl-maint-1",
    title: "Rolling Stock Maintenance Engineer",
    company: "Rail Intl Group",
    pkg: "boost",
    country: "INTL",
    state: "Ontario",
    city: "Toronto",
    postedAt: new Date(Date.now() - 4*86400000).toISOString(),
    applyUrl: "#",
    description: "Fleet reliability, preventive maintenance, stakeholder coordination."
  }
];

export function getJobById(id: string) {
  return mockJobs.find(j => j.id === id) || null;
}
