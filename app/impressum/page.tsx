export const metadata = { title: "Impressum | Bahnerjob" };

export default function ImpressumPage() {
  return (
    <div className="legal-wrap">
      <h1>Impressum</h1>
      <div className="legal-body">
        <p><strong>Bahnerjob</strong></p>
        <p><strong>Dieter Kuhlmann</strong><br/>Bodenseestraße 103<br/>88048 Friedrichshafen</p>
        <p>E-Mail: <a href="mailto:info@bahnerjob.de">info@bahnerjob.de</a></p>
        <p>Vertretungsberechtigt: Dieter Kuhlmann</p>
        <p>USt-IdNr.: </p>
        <p>Inhaltlich Verantwortlicher i.S.d. § 18 Abs. 2 MStV: Dieter Kuhlmann, Bodenseestraße 103, 88048 Friedrichshafen</p>
        <p className="legal-note">
          Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
          Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </div>
    </div>
  );
}
