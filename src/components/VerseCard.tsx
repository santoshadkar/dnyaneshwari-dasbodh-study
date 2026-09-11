import type { Verse } from "@/lib/types";
import type { ViewPrefs } from "@/lib/viewPrefs";
import BookmarkButton from "./BookmarkButton";

export default function VerseCard({
  verse,
  bookmarkId,
  prefs,
}: {
  verse: Verse;
  bookmarkId: string;
  prefs: ViewPrefs;
}) {
  const panels = [
    prefs.showOriginal && {
      key: "original",
      label: "मूळ",
      text: verse.original,
      className: "font-devanagari-serif text-lg leading-loose text-[var(--color-maroon-dark)]",
    },
    prefs.showMarathiMeaning && {
      key: "marathi",
      label: "मराठी अर्थ",
      text: verse.marathiMeaning,
      className: "font-devanagari-sans text-base leading-relaxed text-[var(--color-ink)]",
    },
    prefs.showEnglishMeaning && {
      key: "english",
      label: "English meaning",
      text: verse.englishMeaning,
      className: "text-base leading-relaxed text-[var(--color-ink)]",
    },
  ].filter(Boolean) as { key: string; label: string; text: string; className: string }[];

  return (
    <article
      id={`verse-${verse.verseNumber}`}
      className="scroll-mt-24 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-ink-soft)]">
          {verse.verseNumber}
        </span>
        <div className="flex items-center gap-2">
          {!verse.verified && (
            <span className="rounded-full bg-[var(--color-saffron)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--color-saffron-dark)]">
              Unverified — under review
            </span>
          )}
          <BookmarkButton id={bookmarkId} />
        </div>
      </div>

      {panels.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-soft)]">
          All views are hidden — use the toggles above to show this verse.
        </p>
      ) : (
        <div
          className={
            prefs.layout === "side-by-side"
              ? `grid gap-4 ${panels.length === 1 ? "grid-cols-1" : panels.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`
              : "space-y-4"
          }
        >
          {panels.map((p) => (
            <div key={p.key}>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">
                {p.label}
              </div>
              <p className={p.className}>{p.text || "—"}</p>
            </div>
          ))}
        </div>
      )}

      {verse.note && (
        <p className="mt-3 text-xs italic text-[var(--color-ink-soft)]">Note: {verse.note}</p>
      )}
    </article>
  );
}
