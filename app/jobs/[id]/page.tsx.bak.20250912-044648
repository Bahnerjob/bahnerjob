import { getJobById } from "@/lib/jobs";
import { notFound } from "next/navigation";
import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="detail-sec">
      <h2 className="detail-sec-title">{title}</h2>
      <div className="detail-sec-body">{children}</div>
    </section>
  );
}

function toBullets(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((s) => s.replace(/^\s*(?:[-*]\s*)?/, "").trim())
    .filter(Boolean);
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(decodeURIComponent(params.id));
  if (!job) return notFound();

  const bullets = toBullets(job.description);
  const metaLocation = [job.city, job.state].filter(Boolean).join(", ");
  const metaCountry = job.country;
  const posted = new Date(job.postedAt).toLocaleDateString("de-DE");
  const pkgLabel = job.pkg === "boost" ? "Boost" : job.pkg === "featured" ? "Featured" : "Basic";

  return (
    <div className="container py-6">
      <nav className="mb-4 text-sm text-neutral-400">
        <Link href="/jobs" className="underline underline-offset-4">Jobs</Link>
        <span> / </span>
        <span className="text-neutral-300 truncate inline-block max-w-[60ch] align-bottom">{job.title}</span>
      </nav>

      <header className="mb-5">
        <div className="text-neutral-400">{job.company}</div>
        <h1 className="text-2xl md:text-3xl font-semibold leading-tight">{job.title}</h1>
        <div className="mt-1 text-neutral-400 text-sm">
          {metaLocation ? `${metaLocation}  ${metaCountry}` : metaCountry}
          <span className="mx-2"></span>
          Veröffentlicht: {posted}
          <span className="mx-2"></span>
          <span className={job.pkg === "boost" ? "badge badge-boost" : job.pkg === "featured" ? "badge badge-featured" : "badge badge-basic"}>
            {pkgLabel}
          </span>
        </div>

        {job.applyUrl && job.applyUrl !== "#" && (
          <div className="mt-4">
            <a href={job.applyUrl} target="_blank" rel="noreferrer"
               className="btn btn-accent rounded-lg px-4 py-2 font-semibold inline-block">
              Jetzt bewerben
            </a>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <main className="detail-main">
          {bullets.length > 0 ? (
            <Section title="Stellenbeschreibung">
              <ul className="detail-ul">
                {bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </Section>
          ) : (
            job.description && (
              <Section title="Stellenbeschreibung">
                <p className="text-neutral-300 whitespace-pre-wrap">{job.description}</p>
              </Section>
            )
          )}
        </main>

        <aside className="detail-aside">
          <div className="detail-card">
            <div className="text-sm text-neutral-400">Unternehmen</div>
            <div className="text-neutral-200 font-medium">{job.company}</div>

            <div className="divider my-3" />

            <div className="text-sm text-neutral-400">Standort</div>
            <div className="text-neutral-200">
              {metaLocation ? `${metaLocation}  ${metaCountry}` : metaCountry}
            </div>

            <div className="divider my-3" />

            <div className="text-sm text-neutral-400">Paket</div>
            <div className="text-neutral-200">{pkgLabel}</div>

            {job.applyUrl && job.applyUrl !== "#" && (
              <>
                <div className="divider my-3" />
                <a href={job.applyUrl} target="_blank" rel="noreferrer"
                   className="inline-block text-sm font-semibold underline underline-offset-4">
                  Jetzt bewerben
                </a>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
