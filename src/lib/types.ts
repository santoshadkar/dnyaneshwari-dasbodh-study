export interface Source {
  name: string;
  url: string;
}

export interface Verse {
  verseNumber: number;
  original: string;
  marathiMeaning: string;
  englishMeaning: string;
  verified: boolean;
  note?: string;
}

export type ContentStatus = "empty" | "in-progress" | "complete";

export interface DnyaneshwariChapter {
  book: "dnyaneshwari";
  chapterNumber: number;
  chapterTitleMarathi: string;
  chapterTitleEnglish: string;
  source: Source | null;
  englishSource?: Source | null;
  numberingConvention: string | null;
  status: ContentStatus;
  note?: string;
  verses: Verse[];
}

export interface DnyaneshwariMeta {
  book: "dnyaneshwari";
  titleMarathi: string;
  titleEnglish: string;
  author: string;
  composedApprox: string;
  totalChapters: number;
  structureNote: string;
  chapterTitleSource: Source;
  contentStatus: string;
}

export interface DasbodhSamas {
  samasNumber: number;
  samasTitleMarathi: string;
  samasTitleEnglish: string;
  source: Source | null;
  englishSource?: Source | null;
  status: ContentStatus;
  note?: string;
  owis: Verse[];
}

export interface DasbodhDashak {
  book: "dasbodh";
  dashakNumber: number;
  dashakTitleMarathi: string;
  dashakTitleEnglish: string;
  status: ContentStatus;
  note?: string;
  samas: DasbodhSamas[];
}

export interface DasbodhMeta {
  book: "dasbodh";
  titleMarathi: string;
  titleEnglish: string;
  author: string;
  composedApprox: string;
  totalDashaks: number;
  samasPerDashak: number;
  totalSamas: number;
  totalOwisApprox: number;
  structureNote: string;
  dashakTitleSource: Source;
  crossCheckSource: Source;
  contentStatus: string;
}

export interface SearchEntry {
  id: string;
  book: "dnyaneshwari" | "dasbodh";
  chapterNumber?: number;
  dashakNumber?: number;
  samasNumber?: number;
  verseNumber: number;
  refLabel: string;
  href: string;
  original: string;
  marathiMeaning: string;
  englishMeaning: string;
  verified: boolean;
}
