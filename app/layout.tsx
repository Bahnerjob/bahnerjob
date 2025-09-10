import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css?v=2025-09-10-fonts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bahnerjob",
  description: "Jobs aus der Bahnbranche  Anzeigen schalten & finden.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}

