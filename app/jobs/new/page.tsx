import { Suspense } from "react";
import View from "./view";

export const metadata = {
  title: "Anzeige erstellen | Bahnerjob",
  description: "Erstelle deine Jobanzeige für die Bahnbranche.",
};

export const dynamic = "force-dynamic";

export default function JobsNewPage() {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
}
