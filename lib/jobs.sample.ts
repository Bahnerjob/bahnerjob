export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  bundesland?: string;
  employmentType?: "Vollzeit" | "Teilzeit" | "Ausbildung" | "Umschulung" | "Praktikum";
  featured?: boolean;
  postedAt?: string;
  applyUrl: string;
};

export const JOBS: Job[] = [
  { id:"arverio-umschulung-lauda", title:"Ausbildung/Umschulung als LokfÃ¼hrer:in (m/w/x)", company:"Arverio (Ã–BB PV, ehem. Go-Ahead)", location:"Lauda", bundesland:"Baden-WÃ¼rttemberg", employmentType:"Umschulung", featured:true, postedAt:"2025-09-10", applyUrl:"https://www.arverio-karriere.de/jobs/" },
  { id:"arverio-umschulung-tuebingen", title:"Ausbildung/Umschulung als LokfÃ¼hrer:in (m/w/x)", company:"Arverio (Ã–BB PV, ehem. Go-Ahead)", location:"TÃ¼bingen", bundesland:"Baden-WÃ¼rttemberg", employmentType:"Umschulung", postedAt:"2025-09-10", applyUrl:"https://www.arverio-karriere.de/jobs/" },
  { id:"arverio-umschulung-schwaebisch-hall", title:"Ausbildung/Umschulung als LokfÃ¼hrer:in (m/w/x)", company:"Arverio (Ã–BB PV, ehem. Go-Ahead)", location:"SchwÃ¤bisch Hall", bundesland:"Baden-WÃ¼rttemberg", employmentType:"Umschulung", postedAt:"2025-09-10", applyUrl:"https://www.arverio-karriere.de/jobs/" },
  { id:"arverio-umschulung-lindau", title:"Ausbildung/Umschulung als LokfÃ¼hrer:in (m/w/x)", company:"Arverio (Ã–BB PV, ehem. Go-Ahead)", location:"Lindau (Bodensee)", bundesland:"Bayern", employmentType:"Umschulung", postedAt:"2025-09-10", applyUrl:"https://www.arverio-karriere.de/jobs/" },

  { id:"netinera-tfzf-schwerin", title:"TriebfahrzeugfÃ¼hrer:in (m/w/d)", company:"NETINERA (u.a. ODEG/erixx/metronom)", location:"Schwerin", bundesland:"Mecklenburg-Vorpommern", employmentType:"Vollzeit", featured:true, postedAt:"2025-09-08", applyUrl:"https://www.netinera-karriere.de/jobboerse/" },
  { id:"netinera-tfzf-parchim", title:"TriebfahrzeugfÃ¼hrer:in (m/w/d)", company:"NETINERA (u.a. ODEG/erixx/metronom)", location:"Parchim", bundesland:"Mecklenburg-Vorpommern", employmentType:"Vollzeit", postedAt:"2025-09-08", applyUrl:"https://www.netinera-karriere.de/jobboerse/" },
  { id:"netinera-tfzf-malchow", title:"TriebfahrzeugfÃ¼hrer:in (m/w/d)", company:"NETINERA (u.a. ODEG/erixx/metronom)", location:"Malchow", bundesland:"Mecklenburg-Vorpommern", employmentType:"Vollzeit", postedAt:"2025-09-08", applyUrl:"https://www.netinera-karriere.de/jobboerse/" },

  { id:"metronom-quereinstieg-bremen", title:"LokfÃ¼hrer (m/w/d)  Quereinstieg", company:"metronom Eisenbahngesellschaft", location:"Bremen", bundesland:"Bremen", employmentType:"Umschulung", postedAt:"2025-09-05", applyUrl:"https://www.arbeitsagentur.de/jobsuche/jobdetail/10001-1001510190-S" },
  { id:"metronom-quereinstieg-wolfsburg", title:"LokfÃ¼hrer (m/w/d)  Quereinstieg", company:"metronom Eisenbahngesellschaft", location:"Wolfsburg", bundesland:"Niedersachsen", employmentType:"Umschulung", postedAt:"2025-09-05", applyUrl:"https://www.arbeitsagentur.de/jobsuche/jobdetail/10001-1001510190-S" },

  { id:"erixx-praxisausbildung-nds", title:"Praxisausbildung zum TriebfahrzeugfÃ¼hrer (m/w/d)", company:"erixx GmbH", location:"Niedersachsen (versch. Standorte)", bundesland:"Niedersachsen", employmentType:"Ausbildung", postedAt:"2025-09-04", applyUrl:"https://www.arbeitsagentur.de/jobsuche/jobdetail/10001-1001358877-S" },

  { id:"nwb-tfzf-nordwest", title:"TriebfahrzeugfÃ¼hrer:in (m/w/d)", company:"NordWestBahn", location:"Nordwest (versch. Standorte)", bundesland:"Niedersachsen / NRW / Bremen", employmentType:"Vollzeit", postedAt:"2025-09-07", applyUrl:"https://www.nordwestbahn.de/de/karriere/stellenangebote/job/230" },

  { id:"transdev-tfzf-bundesweit", title:"TriebfahrzeugfÃ¼hrer:in (m/w/d)", company:"Transdev Deutschland", location:"bundesweit (versch. Standorte)", employmentType:"Vollzeit", postedAt:"2025-09-06", applyUrl:"https://www.transdev.de/de/karriere/stellenangebote" },

  { id:"sweg-tfzf-bw", title:"TriebfahrzeugfÃ¼hrer (w/m/d)", company:"SWEG  SÃ¼dwestdeutsche Landesverkehrs-GmbH", location:"Baden-WÃ¼rttemberg (versch. Standorte)", bundesland:"Baden-WÃ¼rttemberg", employmentType:"Vollzeit", postedAt:"2025-09-06", applyUrl:"https://www.sweg.de/de/deine-zukunft/berufsbilder/triebfahrzeugfuehrer-m/w/d/" },

  { id:"db-quereinstieg-weil-am-rhein", title:"Quereinsteiger:in fÃ¼r Umschulung als LokfÃ¼hrer:in", company:"Deutsche Bahn", location:"Weil am Rhein", bundesland:"Baden-WÃ¼rttemberg", employmentType:"Umschulung", postedAt:"2025-09-12", applyUrl:"https://de.indeed.com/q-lokf%C3%BChrer-db-jobs.html" },
  { id:"db-regio-ausbildung-berlin", title:"Ausbildung LokfÃ¼hrer:in 2026", company:"DB Regio Nordost", location:"Berlin", bundesland:"Berlin", employmentType:"Ausbildung", postedAt:"2025-09-02", applyUrl:"https://www.dbregio-berlin-brandenburg.de/db-regio-no/Service/Machen-Sie-Karriere-bei-DB-Regio-Nordost-" },
  { id:"db-regio-ausbildung-falkenberg", title:"Ausbildung LokfÃ¼hrer:in 2026", company:"DB Regio Nordost", location:"Falkenberg/Elster", bundesland:"Brandenburg", employmentType:"Ausbildung", postedAt:"2025-09-02", applyUrl:"https://www.dbregio-berlin-brandenburg.de/db-regio-no/Service/Machen-Sie-Karriere-bei-DB-Regio-Nordost-" },
];
export function getJobById(id: string): Job | undefined {
  try {
    // Falls dieses File tree-shaken wird, hilft ein direkter Zugriff:
    return JOBS.find(j => j.id === id);
  } catch {
    return undefined;
  }
}