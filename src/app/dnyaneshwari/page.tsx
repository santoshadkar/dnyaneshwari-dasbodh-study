import Link from "next/link";
import { getDnyaneshwariChapters, getDnyaneshwariMeta } from "@/lib/content";
import StatusBadge from "@/components/StatusBadge";

export default function DnyaneshwariLandingPage() {
  const meta = getDnyaneshwariMeta();
  const chapters = getDnyaneshwariChapters();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="font-devanagari-serif text-3xl font-semibold text-[var(--color-maroon)]">
          {meta.titleMarathi}
        </h1>
        <p className="mt-1 text-[var(--color-ink)]">{meta.titleEnglish}</p>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">{meta.structureNote}</p>
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
          Chapter titles source:{" "}
          <a href={meta.chapterTitleSource.url} className="underline" target="_blank" rel="noreferrer">
            {meta.chapterTitleSource.name}
          </a>
        </p>
      </header>

      <ol className="space-y-2">
        {chapters.map((c) => (
          <li key={c.chapterNumber}>
            <Link
              href={`/dnyaneshwari/${c.chapterNumber}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-3 hover:shadow-sm"
            >
              <div>
                <span className="text-sm text-[var(--color-ink-soft)]">
                  अध्याय {c.chapterNumber}
                </span>
                <div className="font-devanagari-sans text-base text-[var(--color-ink)]">
                  {c.chapterTitleMarathi}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)]">{c.chapterTitleEnglish}</div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge status={c.status} />
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {c.verses.length} verse{c.verses.length === 1 ? "" : "s"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
