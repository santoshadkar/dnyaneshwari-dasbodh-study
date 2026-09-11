import { notFound } from "next/navigation";
import Link from "next/link";
import { getDnyaneshwariChapter, getDnyaneshwariMeta } from "@/lib/content";
import VerseReader from "@/components/VerseReader";
import StatusBadge from "@/components/StatusBadge";

export function generateStaticParams() {
  const meta = getDnyaneshwariMeta();
  return Array.from({ length: meta.totalChapters }, (_, i) => ({
    chapter: String(i + 1),
  }));
}

export default async function DnyaneshwariChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const chapterNumber = Number(chapter);
  const data = getDnyaneshwariChapter(chapterNumber);
  if (!data) notFound();

  const meta = getDnyaneshwariMeta();
  const prev = chapterNumber > 1 ? chapterNumber - 1 : null;
  const next = chapterNumber < meta.totalChapters ? chapterNumber + 1 : null;

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-[var(--color-ink-soft)]">
        <Link href="/dnyaneshwari" className="hover:underline">
          {meta.titleMarathi}
        </Link>{" "}
        / अध्याय {data.chapterNumber}
      </nav>

      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-devanagari-serif text-2xl font-semibold text-[var(--color-maroon)]">
            अध्याय {data.chapterNumber}: {data.chapterTitleMarathi}
          </h1>
          <StatusBadge status={data.status} />
        </div>
        <p className="mt-1 text-[var(--color-ink)]">{data.chapterTitleEnglish}</p>
        {data.source && (
          <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
            Original &amp; Marathi meaning source:{" "}
            <a href={data.source.url} className="underline" target="_blank" rel="noreferrer">
              {data.source.name}
            </a>
          </p>
        )}
        {data.englishSource && (
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
            English meaning source:{" "}
            <a href={data.englishSource.url} className="underline" target="_blank" rel="noreferrer">
              {data.englishSource.name}
            </a>
          </p>
        )}
        {data.numberingConvention && (
          <p className="mt-2 text-xs italic text-[var(--color-ink-soft)]">{data.numberingConvention}</p>
        )}
        {data.note && (
          <p className="mt-2 text-xs italic text-[var(--color-ink-soft)]">{data.note}</p>
        )}
      </header>

      <VerseReader verses={data.verses} idPrefix={`dnyaneshwari-${data.chapterNumber}`} />

      <div className="mt-8 flex justify-between text-sm">
        {prev ? (
          <Link href={`/dnyaneshwari/${prev}`} className="text-[var(--color-maroon)] hover:underline">
            ← अध्याय {prev}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/dnyaneshwari/${next}`} className="text-[var(--color-maroon)] hover:underline">
            अध्याय {next} →
          </Link>
        )}
      </div>
    </div>
  );
}
