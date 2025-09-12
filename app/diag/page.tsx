export const dynamic = "force-dynamic";
import { JOBS } from "@/lib/jobs.sample";

async function getNews(){
  try{
    const res = await fetch("/api/railnews", { cache: "no-store" });
    const data = await res.json();
    return data;
  }catch(e){ return { error: String(e) }; }
}

export default async function Diag(){
  const news = await getNews();
  return (
    <main style={{maxWidth:900,margin:"20px auto",fontFamily:"system-ui"}}>
      <h1>Diagnose</h1>
      <section>
        <h2>Jobs</h2>
        <div><strong>Anzahl:</strong> {JOBS.length}</div>
        <ol>
          {JOBS.slice(0,3).map(j=> <li key={j.id}>{j.title}  {j.company}</li>)}
        </ol>
      </section>
      <section style={{marginTop:20}}>
        <h2>News API</h2>
        <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(news,null,2)}</pre>
      </section>
      <p style={{marginTop:20}}><a href="/jobs"> Zur Jobs-Liste</a>  <a href="/"> Startseite</a></p>
    </main>
  );
}