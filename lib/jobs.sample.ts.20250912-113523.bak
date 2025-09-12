export type Job = {
  id: string; title: string; company: string; location: string;
  bundesland?: string; employmentType?: "Vollzeit"|"Teilzeit"|"Ausbildung"|"Umschulung"|"Praktikum";
  featured?: boolean; postedAt?: string; applyUrl: string;
};
export const JOBS: Job[] = [
  { id:"arverio-umschulung-lauda", title:"Ausbildung/Umschulung als Lokführer:in (m/w/x)", company:"Arverio (ÖBB PV, ehem. Go-Ahead)", location:"Lauda", bundesland:"Baden-Württemberg", employmentType:"Umschulung", featured:true, postedAt:"2025-09-10", applyUrl:"https://www.arverio-karriere.de/jobs/" },
  { id:"netinera-tfzf-schwerin", title:"Triebfahrzeugführer:in (m/w/d)", company:"NETINERA (u.a. ODEG/erixx/metronom)", location:"Schwerin", bundesland:"Mecklenburg-Vorpommern", employmentType:"Vollzeit", featured:true, postedAt:"2025-09-08", applyUrl:"https://www.netinera-karriere.de/jobboerse/" },
  { id:"metronom-quereinstieg-bremen", title:"Lokführer (m/w/d)  Quereinstieg", company:"metronom Eisenbahngesellschaft", location:"Bremen", bundesland:"Bremen", employmentType:"Umschulung", postedAt:"2025-09-05", applyUrl:"https://www.arbeitsagentur.de/jobsuche/jobdetail/10001-1001510190-S" },
  { id:"sweg-tfzf-bw", title:"Triebfahrzeugführer (w/m/d)", company:"SWEG  Südwestdeutsche Landesverkehrs-GmbH", location:"Baden-Württemberg (versch. Standorte)", bundesland:"Baden-Württemberg", employmentType:"Vollzeit", postedAt:"2025-09-06", applyUrl:"https://www.sweg.de/de/deine-zukunft/berufsbilder/triebfahrzeugfuehrer-m/w/d/" },
  { id:"transdev-tfzf-bundesweit", title:"Triebfahrzeugführer:in (m/w/d)", company:"Transdev Deutschland", location:"bundesweit (versch. Standorte)", employmentType:"Vollzeit", postedAt:"2025-09-06", applyUrl:"https://www.transdev.de/de/karriere/stellenangebote" },
  { id:"db-quereinstieg-weil-am-rhein", title:"Quereinsteiger:in für Umschulung als Lokführer:in", company:"Deutsche Bahn", location:"Weil am Rhein", bundesland:"Baden-Württemberg", employmentType:"Umschulung", postedAt:"2025-09-12", applyUrl:"https://de.indeed.com/q-lokf%C3%BChrer-db-jobs.html" }
];
export function getJobById(id: string): Job | undefined { try { return JOBS.find(j=>j.id===id); } catch { return undefined; } }