import type { ContentStatus } from "@/lib/types";

const STYLES: Record<ContentStatus, string> = {
  empty: "bg-[var(--color-parchment)] text-[var(--color-ink-soft)]",
  "in-progress": "bg-[var(--color-saffron)]/20 text-[var(--color-saffron-dark)]",
  complete: "bg-[var(--color-maroon)]/15 text-[var(--color-maroon)]",
};

const LABELS: Record<ContentStatus, string> = {
  empty: "Not yet populated",
  "in-progress": "Partial",
  complete: "Fully populated",
};

export default function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
