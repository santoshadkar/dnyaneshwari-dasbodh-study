"use client";

import { useState } from "react";
import ViewToggleBar from "./ViewToggleBar";
import VerseCard from "./VerseCard";
import type { Verse } from "@/lib/types";
import { DEFAULT_VIEW_PREFS, type ViewPrefs } from "@/lib/viewPrefs";

export default function VerseReader({
  verses,
  idPrefix,
}: {
  verses: Verse[];
  idPrefix: string;
}) {
  const [prefs, setPrefs] = useState<ViewPrefs>(DEFAULT_VIEW_PREFS);

  if (verses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center text-[var(--color-ink-soft)]">
        No verses have been added here yet. Content is being researched and added
        chapter-by-chapter — check back soon.
      </div>
    );
  }

  return (
    <div>
      <ViewToggleBar onChange={setPrefs} />
      <div className="space-y-5">
        {verses.map((v) => (
          <VerseCard
            key={v.verseNumber}
            verse={v}
            bookmarkId={`${idPrefix}-${v.verseNumber}`}
            prefs={prefs}
          />
        ))}
      </div>
    </div>
  );
}
