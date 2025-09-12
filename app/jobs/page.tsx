export const dynamic = "force-static";
import { JOBS } from "@/lib/jobs.sample";
export default function JobsPage(){
  return (
    <main style={{maxWidth:800,margin:"20px auto",fontFamily:"system-ui"}}>
      <h1>Jobs (Demo)</h1>
      <p><strong>Anzahl:</strong> {JOBS.length}</p>
      <ul>
        {JOBS.map(j=>(
          <li key={j.id} style={{padding:"8px 0", borderBottom:"1px solid #333"}}>
            <div><strong>{j.title}</strong>  {j.company}</div>
            <div>{j.location}{j.bundesland?`, ${j.bundesland}`:""} {j.employmentType?` ${j.employmentType}`:""}</div>
            <a href={j.applyUrl} target="_blank">Bewerben</a>
          </li>
        ))}
      </ul>
    </main>
  );
}