import Link from "next/link";
import { dashakOwiCount, getDasbodhDashaks, getDasbodhMeta } from "@/lib/content";
import StatusBadge from "@/components/StatusBadge";

export default function DasbodhLandingPage() {
  const meta = getDasbodhMeta();
  const dashaks = getDasbodhDashaks();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="font-devanagari-serif text-3xl font-semibold text-[var(--color-maroon)]">
          {meta.titleMarathi}
        </h1>
        <p className="mt-1 text-[var(--color-ink)]">{meta.titleEnglish}</p>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">{meta.structureNote}</p>
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
          Dashak titles source:{" "}
          <a href={meta.dashakTitleSource.url} className="underline" target="_blank" rel="noreferrer">
            {meta.dashakTitleSource.name}
          </a>
          , cross-checked against{" "}
          <a href={meta.crossCheckSource.url} className="underline" target="_blank" rel="noreferrer">
            {meta.crossCheckSource.name}
          </a>
        </p>
      </header>

      <ol className="space-y-2">
        {dashaks.map((d) => (
          <li key={d.dashakNumber}>
            <Link
              href={`/dasbodh/${d.dashakNumber}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-3 hover:shadow-sm"
            >
              <div>
                <span className="text-sm text-[var(--color-ink-soft)]">दशक {d.dashakNumber}</span>
                <div className="font-devanagari-sans text-base text-[var(--color-ink)]">
                  {d.dashakTitleMarathi}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)]">{d.dashakTitleEnglish}</div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge status={d.status} />
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {d.samas.length} samas · {dashakOwiCount(d)} owis
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
