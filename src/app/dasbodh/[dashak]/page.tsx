import { notFound } from "next/navigation";
import Link from "next/link";
import { getDasbodhDashak, getDasbodhMeta } from "@/lib/content";
import StatusBadge from "@/components/StatusBadge";

export function generateStaticParams() {
  const meta = getDasbodhMeta();
  return Array.from({ length: meta.totalDashaks }, (_, i) => ({
    dashak: String(i + 1),
  }));
}

export default async function DasbodhDashakPage({
  params,
}: {
  params: Promise<{ dashak: string }>;
}) {
  const { dashak } = await params;
  const dashakNumber = Number(dashak);
  const data = getDasbodhDashak(dashakNumber);
  if (!data) notFound();

  const meta = getDasbodhMeta();
  const prev = dashakNumber > 1 ? dashakNumber - 1 : null;
  const next = dashakNumber < meta.totalDashaks ? dashakNumber + 1 : null;

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-[var(--color-ink-soft)]">
        <Link href="/dasbodh" className="hover:underline">
          {meta.titleMarathi}
        </Link>{" "}
        / दशक {data.dashakNumber}
      </nav>

      <header className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="font-devanagari-serif text-2xl font-semibold text-[var(--color-maroon)]">
          दशक {data.dashakNumber}: {data.dashakTitleMarathi}
        </h1>
        <StatusBadge status={data.status} />
      </header>
      <p className="-mt-4 mb-6 text-[var(--color-ink)]">{data.dashakTitleEnglish}</p>

      <ol className="space-y-2">
        {data.samas.map((s) => (
          <li key={s.samasNumber}>
            <Link
              href={`/dasbodh/${data.dashakNumber}/${s.samasNumber}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-3 hover:shadow-sm"
            >
              <div>
                <span className="text-sm text-[var(--color-ink-soft)]">समास {s.samasNumber}</span>
                {s.samasTitleMarathi && (
                  <div className="font-devanagari-sans text-base text-[var(--color-ink)]">
                    {s.samasTitleMarathi}
                  </div>
                )}
                {s.samasTitleEnglish && (
                  <div className="text-xs text-[var(--color-ink-soft)]">{s.samasTitleEnglish}</div>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge status={s.status} />
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {s.owis.length} owi{s.owis.length === 1 ? "" : "s"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-between text-sm">
        {prev ? (
          <Link href={`/dasbodh/${prev}`} className="text-[var(--color-maroon)] hover:underline">
            ← दशक {prev}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/dasbodh/${next}`} className="text-[var(--color-maroon)] hover:underline">
            दशक {next} →
          </Link>
        )}
      </div>
    </div>
  );
}
