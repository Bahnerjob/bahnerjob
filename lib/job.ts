export type Job = {
  title: string;
  company: string;
  bundesland: string;
  ort: string;
  beschreibung: string;
  featured?: boolean;
};

export const BUNDESLAENDER = [
  "Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen",
  "Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz",
  "Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"
] as const;

export const JOBS: Job[] = [
  {
    title: "Triebfahrzeugführer (m/w/d)",
    company: "DB Regio Ulm",
    bundesland: "Baden-Württemberg",
    ort: "Friedrichshafen",
    beschreibung: "Perspektive am Bodensee, Einsatz im Regionalverkehr. Ausbildung möglich.",
    featured: true
  },
  {
    title: "Fahrtrainer / Praxisvermittler (m/w/d)",
    company: "DB Regio Ulm",
    bundesland: "Baden-Württemberg",
    ort: "Ulm",
    beschreibung: "Ausbildung und Begleitung von Azubis und Quereinsteiger:innen."
  },
  {
    title: "Kundenbetreuer:in im Nahverkehr (KiN B)",
    company: "DB Regio Nord",
    bundesland: "Hamburg",
    ort: "Hamburg",
    beschreibung: "Service an Bord, Fahrgastkommunikation, Sicherheit & Vertrieb."
  }
];
