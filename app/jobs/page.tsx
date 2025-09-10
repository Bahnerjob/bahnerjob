import { Suspense } from "react";
import JobsView from "./view";

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="card p-6">Lade Jobs…</div>}>
      <JobsView />
    </Suspense>
  );
}
