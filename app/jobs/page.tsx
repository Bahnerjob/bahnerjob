import JobFilters from "@/components/JobFilters";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/lib/jobs";
import { sortJobs, type Job } from "@/lib/sort";
export const revalidate = 0;
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamic = "force-dynamic";

function matches(job: Job, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  return [
    job.title,
    job.company,
    job.city ?? "",
    job.state ?? "",
  ].some((f) => f.toLowerCase().includes(needle));
}

function filterJobs(jobs: Job, params: { q?: string; country?: string; pkg?: string }) {
  const { q = "", country = "", pkg = "" } = params;
  return mockJobs.filter((j) => {
    if (country && j.country !== country) return false;
    if (pkg && j.pkg !== (pkg as any)) return false;
    if (!matches(j, q)) return false;
    return true;
  });
}

export default function JobsPage({ searchParams }: { searchParams: { [k: string]: string | undefined } }) {
  const filtered = filterJobs(mockJobs as any, {
    q: searchParams.q,
    country: searchParams.country,
    pkg: searchParams.pkg,
  });
  const jobs = sortJobs(filtered);

  return (
    <div className="container py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Jobs</h1>

      <div className="mb-4">
        <JobFilters />
      </div>

      {jobs.length === 0 ? (
        <p className="text-neutral-400">Keine Ergebnisse. Bitte Filter anpassen.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}


