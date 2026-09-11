import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import {
  getDasbodhDashaks,
  getDasbodhMeta,
  getDnyaneshwariChapters,
  getDnyaneshwariMeta,
} from "@/lib/content";

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari-serif",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari-sans",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dnyaneshwari & Dasbodh — A Study Portal",
  description:
    "Read the Dnyaneshwari and Dasbodh verse by verse, with original text alongside Marathi and English meanings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const dnyaneshwariMeta = getDnyaneshwariMeta();
  const dnyaneshwariChapters = getDnyaneshwariChapters().map((c) => ({
    chapterNumber: c.chapterNumber,
    chapterTitleMarathi: c.chapterTitleMarathi,
    chapterTitleEnglish: c.chapterTitleEnglish,
    verseCount: c.verses.length,
    status: c.status,
  }));

  const dasbodhMeta = getDasbodhMeta();
  const dasbodhDashaks = getDasbodhDashaks().map((d) => ({
    dashakNumber: d.dashakNumber,
    dashakTitleMarathi: d.dashakTitleMarathi,
    dashakTitleEnglish: d.dashakTitleEnglish,
    status: d.status,
    samas: d.samas.map((s) => ({
      samasNumber: s.samasNumber,
      samasTitleMarathi: s.samasTitleMarathi,
      samasTitleEnglish: s.samasTitleEnglish,
      status: s.status,
      owiCount: s.owis.length,
    })),
  }));

  return (
    <html
      lang="en"
      className={`${notoSerifDevanagari.variable} ${notoSansDevanagari.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppShell
          dnyaneshwariMeta={dnyaneshwariMeta}
          dnyaneshwariChapters={dnyaneshwariChapters}
          dasbodhMeta={dasbodhMeta}
          dasbodhDashaks={dasbodhDashaks}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
