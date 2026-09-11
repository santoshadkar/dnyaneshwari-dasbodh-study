import "server-only";
import fs from "node:fs";
import path from "node:path";
import type {
  DasbodhDashak,
  DasbodhMeta,
  DnyaneshwariChapter,
  DnyaneshwariMeta,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readJson<T>(...segments: string[]): T {
  const filePath = path.join(CONTENT_ROOT, ...segments);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function getDnyaneshwariMeta(): DnyaneshwariMeta {
  return readJson<DnyaneshwariMeta>("dnyaneshwari", "meta.json");
}

export function getDnyaneshwariChapters(): DnyaneshwariChapter[] {
  const meta = getDnyaneshwariMeta();
  return Array.from({ length: meta.totalChapters }, (_, i) =>
    readJson<DnyaneshwariChapter>(
      "dnyaneshwari",
      `chapter-${String(i + 1).padStart(2, "0")}.json`
    )
  );
}

export function getDnyaneshwariChapter(
  chapterNumber: number
): DnyaneshwariChapter | null {
  try {
    return readJson<DnyaneshwariChapter>(
      "dnyaneshwari",
      `chapter-${String(chapterNumber).padStart(2, "0")}.json`
    );
  } catch {
    return null;
  }
}

export function getDasbodhMeta(): DasbodhMeta {
  return readJson<DasbodhMeta>("dasbodh", "meta.json");
}

export function getDasbodhDashaks(): DasbodhDashak[] {
  const meta = getDasbodhMeta();
  return Array.from({ length: meta.totalDashaks }, (_, i) =>
    readJson<DasbodhDashak>(
      "dasbodh",
      `dashak-${String(i + 1).padStart(2, "0")}.json`
    )
  );
}

export function getDasbodhDashak(dashakNumber: number): DasbodhDashak | null {
  try {
    return readJson<DasbodhDashak>(
      "dasbodh",
      `dashak-${String(dashakNumber).padStart(2, "0")}.json`
    );
  } catch {
    return null;
  }
}

export function getDasbodhSamas(dashakNumber: number, samasNumber: number) {
  const dashak = getDasbodhDashak(dashakNumber);
  if (!dashak) return null;
  return dashak.samas.find((s) => s.samasNumber === samasNumber) ?? null;
}

export function chapterVerseCount(chapter: DnyaneshwariChapter): number {
  return chapter.verses.length;
}

export function dashakOwiCount(dashak: DasbodhDashak): number {
  return dashak.samas.reduce((sum, s) => sum + s.owis.length, 0);
}
