import { Suspense } from "react";
import NewJobView from "./view";

export const metadata = {
  title: "Anzeige entwerfen – Bahnerjob",
  description: "Stellenanzeige erstellen und Paket wählen."
};

export default function NewJobPage() {
  return (
    <Suspense fallback={<div className="card p-6">Lädt Formular…</div>}>
      <NewJobView />
    </Suspense>
  );
}
