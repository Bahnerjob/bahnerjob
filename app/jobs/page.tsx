import { Suspense } from "react";
import JobsView from "./view";

export const metadata = {
  title: "Jobs – Bahnerjob",
  description: "Offene Stellen im Bahnsektor durchsuchen."
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="card p-6">Lädt Jobs…</div>}>
      <JobsView />
    </Suspense>
  );
}
