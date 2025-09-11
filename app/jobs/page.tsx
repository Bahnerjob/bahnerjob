import Link from "next/link";
import JobsListClient, { type Job } from "../../components/JobsList.client";

export const revalidate = 300;

async function loadJobs(): Promise<Job[]> {
  // versucht mehrere Import-Pfade/Exports (getJobs() oder jobs)
  const tryPaths = ["../../lib/jobs", "../../../lib/jobs", "@/lib/jobs", "lib/jobs"];
  for (const p of tryPaths) {
    try {
      // @ts-ignore - wir testen dynamisch unterschiedliche Exports
      const mod = await import(p);
      if (typeof mod.getJobs === "function") {
        const res = await mod.getJobs();
        if (Array.isArray(res)) return res as Job[];
      }
      if (Array.isArray(mod.jobs)) return mod.jobs as Job[];
    } catch {}
  }
  return [];
}

export default async function JobsPage() {
  const initial = await loadJobs();

  return (
    <main className="page-wrap">
      {/* HERO */}
      <section style={{textAlign:"center", padding:"24px 0 8px"}}>
        <div className="chip">Jobs</div>
        <h1
          style={{
            fontFamily:"Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
            fontWeight:800, letterSpacing:"-0.01em",
            fontSize:"clamp(2rem,4.6vw,2.5rem)", margin:"18px 0 0"
          }}
        >
          Stellen im Bahnsektor
        </h1>
        <p style={{maxWidth:"46rem", margin:"12px auto 0", color:"rgba(235,235,240,.9)"}}>
          Durchsuche aktuelle Jobs. Filtere nach Ort, Region und Art  klare Darstellung, gute Lesbarkeit.
        </p>
        <div style={{display:"flex", gap:"12px", justifyContent:"center", marginTop:"18px"}}>
          <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
          <Link href="/" className="btn btn-secondary">Zur Startseite</Link>
        </div>
      </section>

      <hr className="rule" />

      {/* LISTE + FILTER */}
      <JobsListClient initial={initial} />

      {/* kleine Styles für Grid/Inputs wiederverwenden (wie /jobs/new) */}
      <style jsx global>{`
        .container { max-width: 1120px; margin: 0 auto; padding: 0 16px; }
        .panel { overflow: hidden; }
        .field-grid { display: grid; gap: 12px; grid-template-columns: minmax(0,1fr); }
        .field-grid.two { grid-template-columns: minmax(0,1fr); }
        @media (min-width: 720px) {
          .field-grid.two { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
        }
        .input, .select {
          width: 100%;
          box-sizing: border-box;
          background: rgba(20,20,22,.6);
          border: 1px solid rgba(80,80,90,.6);
          color: rgb(240,240,245);
          border-radius: 10px;
          padding: 10px 12px;
          outline: none;
          height: 40px;
        }
      `}</style>
    </main>
  );
}