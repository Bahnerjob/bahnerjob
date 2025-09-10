function JobCard({ j }: { j: Job }) {
  return (
    <div className="card p-5 hover:shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{j.title}</h3>
          <p className="text-sm text-neutral-400 mt-0.5">
            {j.company} • {j.ort} · {j.bundesland}
          </p>
        </div>

        {/* Optional: Nur Badge, kein Button */}
        {j.featured && (
          <span
            className="badge"
            style={{ borderColor: "rgba(220,38,38,0.4)", color: "white" }}
          >
            Featured
          </span>
        )}
      </div>

      <p className="text-neutral-300 mt-3">{j.beschreibung}</p>
    </div>
  );
}
