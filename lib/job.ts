// lib/jobs.ts
export type Job = {
  id: string;
  title: string;
  company: string;
  place: string;        // Stadt/Ort
  bundesland: string;   // z.B. "Bremen", "Bayern"
  salary?: string;
  featured?: boolean;
  description?: string;
};

export const JOBS: Job[] = [
  {
    id: "lokfuehrer-bremen-cargo",
    title: "Lokführer:in (Güterverkehr)",
    company: "DB Cargo",
    place: "Bremen",
    bundesland: "Bremen",
    salary: "ca. 3.400 € / Monat",
    featured: true,
    description: "Güterzüge, Schichtdienst, moderne Fahrzeugflotte."
  },
  {
    id: "fahrdienstleiter-muenchen-estw",
    title: "Fahrdienstleiter:in (ESTW)",
    company: "DB Netz",
    place: "München",
    bundesland: "Bayern",
    salary: "ca. 3.600 € / Monat",
    description: "ESTW, sichere Abwicklung, Kommunikation mit BZ."
  },
  {
    id: "instanthaltung-hamburg-werkstatt",
    title: "Mechatroniker:in Instandhaltung",
    company: "Metronom",
    place: "Hamburg",
    bundesland: "Hamburg",
    salary: "n/a",
  },
  {
    id: "leitstelle-frankfurt-dispo",
    title: "Disposition Leitstelle",
    company: "VIAS Rail",
    place: "Frankfurt am Main",
    bundesland: "Hessen",
  }
];

export const BUNDESLAENDER = [
  "Alle",
  "Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen",
  "Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz",
  "Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"
];
