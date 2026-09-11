// Builds public/search-index.json from /content at build/dev time.
// The client-side SearchBox component fetches this file and builds a Fuse.js
// index in the browser (see src/components/SearchBox.tsx).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(import.meta.dirname, "..", "content");
const OUT_DIR = join(import.meta.dirname, "..", "public");

function readJson(...segments) {
  return JSON.parse(readFileSync(join(CONTENT_ROOT, ...segments), "utf-8"));
}

const entries = [];

const dMeta = readJson("dnyaneshwari", "meta.json");
for (let n = 1; n <= dMeta.totalChapters; n++) {
  const chapter = readJson(
    "dnyaneshwari",
    `chapter-${String(n).padStart(2, "0")}.json`
  );
  for (const verse of chapter.verses) {
    entries.push({
      id: `dnyaneshwari-${n}-${verse.verseNumber}`,
      book: "dnyaneshwari",
      chapterNumber: n,
      verseNumber: verse.verseNumber,
      refLabel: `Dnyaneshwari ${n}.${verse.verseNumber} — ${chapter.chapterTitleEnglish}`,
      href: `/dnyaneshwari/${n}#verse-${verse.verseNumber}`,
      original: verse.original,
      marathiMeaning: verse.marathiMeaning,
      englishMeaning: verse.englishMeaning,
      verified: verse.verified,
    });
  }
}

const dbMeta = readJson("dasbodh", "meta.json");
for (let n = 1; n <= dbMeta.totalDashaks; n++) {
  const dashak = readJson("dasbodh", `dashak-${String(n).padStart(2, "0")}.json`);
  for (const samas of dashak.samas) {
    for (const owi of samas.owis) {
      entries.push({
        id: `dasbodh-${n}-${samas.samasNumber}-${owi.verseNumber}`,
        book: "dasbodh",
        dashakNumber: n,
        samasNumber: samas.samasNumber,
        verseNumber: owi.verseNumber,
        refLabel: `Dasbodh ${n}.${samas.samasNumber}.${owi.verseNumber} — ${dashak.dashakTitleEnglish}`,
        href: `/dasbodh/${n}/${samas.samasNumber}#verse-${owi.verseNumber}`,
        original: owi.original,
        marathiMeaning: owi.marathiMeaning,
        englishMeaning: owi.englishMeaning,
        verified: owi.verified,
      });
    }
  }
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, "search-index.json"),
  JSON.stringify(entries),
  "utf-8"
);

console.log(`Built search index with ${entries.length} verse entries.`);
