import { notFound } from "next/navigation";
import Link from "next/link";
import { getDasbodhDashak, getDasbodhMeta, getDasbodhSamas } from "@/lib/content";
import VerseReader from "@/components/VerseReader";
import StatusBadge from "@/components/StatusBadge";

export function generateStaticParams() {
  const meta = getDasbodhMeta();
  const params: { dashak: string; samas: string }[] = [];
  for (let d = 1; d <= meta.totalDashaks; d++) {
    for (let s = 1; s <= meta.samasPerDashak; s++) {
      params.push({ dashak: String(d), samas: String(s) });
    }
  }
  return params;
}

export default async function DasbodhSamasPage({
  params,
}: {
  params: Promise<{ dashak: string; samas: string }>;
}) {
  const { dashak, samas } = await params;
  const dashakNumber = Number(dashak);
  const samasNumber = Number(samas);
  const dashakData = getDasbodhDashak(dashakNumber);
  const samasData = getDasbodhSamas(dashakNumber, samasNumber);
  if (!dashakData || !samasData) notFound();

  const meta = getDasbodhMeta();
  const prev = samasNumber > 1 ? samasNumber - 1 : null;
  const next = samasNumber < meta.samasPerDashak ? samasNumber + 1 : null;

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-[var(--color-ink-soft)]">
        <Link href="/dasbodh" className="hover:underline">
          {meta.titleMarathi}
        </Link>{" "}
        /{" "}
        <Link href={`/dasbodh/${dashakNumber}`} className="hover:underline">
          दशक {dashakNumber}
        </Link>{" "}
        / समास {samasNumber}
      </nav>

      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-devanagari-serif text-2xl font-semibold text-[var(--color-maroon)]">
            {dashakData.dashakTitleMarathi} — समास {samasNumber}
            {samasData.samasTitleMarathi ? `: ${samasData.samasTitleMarathi}` : ""}
          </h1>
          <StatusBadge status={samasData.status} />
        </div>
        {samasData.samasTitleEnglish && (
          <p className="mt-1 text-[var(--color-ink)]">{samasData.samasTitleEnglish}</p>
        )}
        {samasData.source && (
          <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
            Source:{" "}
            <a href={samasData.source.url} className="underline" target="_blank" rel="noreferrer">
              {samasData.source.name}
            </a>
          </p>
        )}
        {samasData.note && (
          <p className="mt-2 text-xs italic text-[var(--color-ink-soft)]">{samasData.note}</p>
        )}
      </header>

      <VerseReader
        verses={samasData.owis}
        idPrefix={`dasbodh-${dashakNumber}-${samasNumber}`}
      />

      <div className="mt-8 flex justify-between text-sm">
        {prev ? (
          <Link
            href={`/dasbodh/${dashakNumber}/${prev}`}
            className="text-[var(--color-maroon)] hover:underline"
          >
            ← समास {prev}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/dasbodh/${dashakNumber}/${next}`}
            className="text-[var(--color-maroon)] hover:underline"
          >
            समास {next} →
          </Link>
        )}
      </div>
    </div>
  );
}
