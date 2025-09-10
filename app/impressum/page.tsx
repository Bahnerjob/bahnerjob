export const metadata = { title: "Impressum | Bahnerjob" };

export default function ImpressumPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-4">Impressum</h1>
      <div className="space-y-3 text-sm text-neutral-300">
        <p><strong>Bahnerjob</strong><br/>[Dein Unternehmensname]<br/>[Straße Nr.]<br/>[PLZ Ort]</p>
        <p>E-Mail: kontakt@bahnerjob.de<br/>Telefon: [Telefonnummer]</p>
        <p>Vertretungsberechtigt: [Name]</p>
        <p>USt-IdNr.: [falls vorhanden]</p>
        <p>Inhaltlich Verantwortlicher i.S.d. § 18 Abs. 2 MStV: [Name, Anschrift]</p>
        <p>Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
        Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
      </div>
    </div>
  );
}
