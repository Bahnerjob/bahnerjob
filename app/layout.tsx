// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eisenbahner-Jobs",
  description: "Jobbörse für Bahn-Berufe (Lokführer:in, Instandhaltung, Leitstelle u.v.m.)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100`}>
        {/* Header */}
        <header className="border-b border-neutral-800">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold">🚆 Eisenbahner-Jobs</a>
            <nav className="flex gap-4 text-sm">
              <a href="/pricing" className="hover:underline">Preise</a>
              <a href="/jobs/new" className="px-3 py-1 rounded bg-emerald-500 text-neutral-900">Job posten</a>
            </nav>
          </div>
        </header>

        {/* Seiteninhalt */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Eisenbahner-Jobs •{" "}
          <a href="/legal/impressum" className="underline">Impressum</a> •{" "}
          <a href="/legal/datenschutz" className="underline">Datenschutz</a>
        </footer>
      </body>
    </html>
  );
}
