export const dynamic = "force-static";
import { JOBS } from "@/lib/jobs.sample";

export default function JobsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>
      <div className="grid gap-4">
        {JOBS.map((j) => (
          <a key={j.id} href={j.applyUrl} target="_blank" rel="noreferrer"
             className="block rounded-xl border border-neutral-800 p-4 bg-neutral-900/50 hover:bg-neutral-900 transition">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">
                {j.title} <span className="text-neutral-400 font-normal"> {j.company}</span>
              </h3>
              {j.featured ? <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 border border-yellow-600">Featured</span> : null}
            </div>
            <div className="text-sm text-neutral-300 mt-1">
              {j.location}{j.bundesland ? `, ${j.bundesland}` : ""}{j.employmentType ? `  ${j.employmentType}` : ""}
            </div>
            {j.postedAt ? <div className="text-xs text-neutral-500 mt-1">veröffentlicht: {j.postedAt}</div> : null}
          </a>
        ))}
      </div>
    </main>
  );
}