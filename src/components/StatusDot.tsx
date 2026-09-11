import type { ContentStatus } from "@/lib/types";

const COLORS: Record<ContentStatus, string> = {
  empty: "bg-[var(--color-border)]",
  "in-progress": "bg-[var(--color-saffron)]",
  complete: "bg-[var(--color-maroon)]",
};

const LABELS: Record<ContentStatus, string> = {
  empty: "Not yet populated",
  "in-progress": "Partially populated",
  complete: "Fully populated",
};

export default function StatusDot({
  status,
  small,
}: {
  status: ContentStatus;
  small?: boolean;
}) {
  return (
    <span
      title={LABELS[status]}
      className={`inline-block shrink-0 rounded-full ${COLORS[status]} ${
        small ? "h-1.5 w-1.5" : "h-2 w-2"
      }`}
    />
  );
}
