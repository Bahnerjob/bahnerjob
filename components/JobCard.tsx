import { type Job } from "@/lib/sort";

function Badge({ pkg }: { pkg: Job["pkg"] }) {
  const label = pkg === "boost" ? "Boost" : pkg === "featured" ? "Featured" : "Basic";
  const cls =
    pkg === "boost"
      ? "badge badge-boost"
      : pkg === "featured"
      ? "badge badge-featured"
      : "badge badge-basic";
  return <span className={cls}>{label}</span>;
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <a
      href={`/jobs/${encodeURIComponent(job.id)}`}
      className="job-card block rounded-2xl p-4 border border-neutral-800 bg-neutral-900/60 hover:-translate-y-0.5 transition hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-neutral-400 truncate">{job.company}</div>
          <h3 className="text-base md:text-lg font-semibold leading-snug break-words">{job.title}</h3>
          <div className="text-sm text-neutral-400 mt-1">
            {job.city}{job.state ? `, ${job.state}` : ""}  {job.country}
          </div>
        </div>
        <Badge pkg={job.pkg} />
      </div>

      {job.description && (
        <p className="text-sm text-neutral-300 mt-3 line-clamp-3">{job.description}</p>
      )}

      <div className="text-xs text-neutral-500 mt-3">
        Veröffentlicht: {new Date(job.postedAt).toLocaleDateString("de-DE")}
      </div>
    </a>
  );
}
