import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "Bahnerjob",
  description: "Die Jobbörse für den Bahnsektor  schnell finden, klar schalten.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <header className="container mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.svg" alt="" width={28} height={28} />
            <span className="font-semibold">Bahnerjob</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link className="btn" href="/jobs">Jobs</Link>
            <Link className="btn" href="/pricing">Preise</Link>
            <Link className="btn btn-accent" href="/jobs/new">Anzeige schalten</Link>
          </nav>
        </header>

        <main className="container mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>

        <footer className="container mx-auto max-w-6xl px-4 py-12 text-sm text-neutral-400">
          <div className="flex items-center justify-between">
            <div> {new Date().getFullYear()} Bahnerjob</div>
            <nav className="flex items-center gap-3">
              <Link href="/legal/impressum">Impressum</Link>
              <Link href="/legal/datenschutz">Datenschutz</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}