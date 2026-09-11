"use client";

import { useState } from "react";
import Link from "next/link";
import StatusDot from "./StatusDot";
import type { ContentStatus } from "@/lib/types";

export interface DnyaneshwariMetaSummary {
  titleMarathi: string;
  titleEnglish: string;
}

export interface DnyaneshwariChapterSummary {
  chapterNumber: number;
  chapterTitleMarathi: string;
  chapterTitleEnglish: string;
  verseCount: number;
  status: ContentStatus;
}

export interface DasbodhMetaSummary {
  titleMarathi: string;
  titleEnglish: string;
}

export interface DasbodhSamasSummary {
  samasNumber: number;
  samasTitleMarathi: string;
  samasTitleEnglish: string;
  status: ContentStatus;
  owiCount: number;
}

export interface DasbodhDashakSummary {
  dashakNumber: number;
  dashakTitleMarathi: string;
  dashakTitleEnglish: string;
  status: ContentStatus;
  samas: DasbodhSamasSummary[];
}

interface SidebarNavProps {
  dnyaneshwariMeta: DnyaneshwariMetaSummary;
  dnyaneshwariChapters: DnyaneshwariChapterSummary[];
  dasbodhMeta: DasbodhMetaSummary;
  dasbodhDashaks: DasbodhDashakSummary[];
  onNavigate?: () => void;
}

export default function SidebarNav({
  dnyaneshwariMeta,
  dnyaneshwariChapters,
  dasbodhMeta,
  dasbodhDashaks,
  onNavigate,
}: SidebarNavProps) {
  const [openBooks, setOpenBooks] = useState<Set<string>>(new Set(["dnyaneshwari"]));
  const [openDashaks, setOpenDashaks] = useState<Set<number>>(new Set());

  const toggleBook = (book: string) =>
    setOpenBooks((prev) => {
      const next = new Set(prev);
      if (next.has(book)) {
        next.delete(book);
      } else {
        next.add(book);
      }
      return next;
    });

  const toggleDashak = (n: number) =>
    setOpenDashaks((prev) => {
      const next = new Set(prev);
      if (next.has(n)) {
        next.delete(n);
      } else {
        next.add(n);
      }
      return next;
    });

  return (
    <nav className="space-y-1 text-sm">
      <Link
        href="/bookmarks"
        onClick={onNavigate}
        className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-[var(--color-maroon)] hover:bg-[var(--color-parchment)]"
      >
        <BookmarkIcon /> My Bookmarks
      </Link>

      {/* Dnyaneshwari */}
      <div>
        <button
          type="button"
          onClick={() => toggleBook("dnyaneshwari")}
          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 font-medium text-[var(--color-maroon)] hover:bg-[var(--color-parchment)]"
        >
          <Link
            href="/dnyaneshwari"
            onClick={onNavigate}
            className="font-devanagari-sans"
          >
            {dnyaneshwariMeta.titleMarathi}
          </Link>
          <Chevron open={openBooks.has("dnyaneshwari")} />
        </button>
        {openBooks.has("dnyaneshwari") && (
          <ul className="ml-2 mt-1 space-y-0.5 border-l border-[var(--color-border)] pl-2">
            {dnyaneshwariChapters.map((c) => (
              <li key={c.chapterNumber}>
                <Link
                  href={`/dnyaneshwari/${c.chapterNumber}`}
                  onClick={onNavigate}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-[var(--color-ink-soft)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
                >
                  <StatusDot status={c.status} />
                  <span>
                    {c.chapterNumber}. {c.chapterTitleMarathi}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dasbodh */}
      <div>
        <button
          type="button"
          onClick={() => toggleBook("dasbodh")}
          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 font-medium text-[var(--color-maroon)] hover:bg-[var(--color-parchment)]"
        >
          <Link href="/dasbodh" onClick={onNavigate} className="font-devanagari-sans">
            {dasbodhMeta.titleMarathi}
          </Link>
          <Chevron open={openBooks.has("dasbodh")} />
        </button>
        {openBooks.has("dasbodh") && (
          <ul className="ml-2 mt-1 space-y-0.5 border-l border-[var(--color-border)] pl-2">
            {dasbodhDashaks.map((d) => (
              <li key={d.dashakNumber}>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Toggle samas list for dashak ${d.dashakNumber}`}
                    onClick={() => toggleDashak(d.dashakNumber)}
                    className="rounded p-1 text-[var(--color-ink-soft)] hover:bg-[var(--color-parchment)]"
                  >
                    <Chevron open={openDashaks.has(d.dashakNumber)} small />
                  </button>
                  <Link
                    href={`/dasbodh/${d.dashakNumber}`}
                    onClick={onNavigate}
                    className="flex flex-1 items-center gap-1.5 rounded px-1 py-1 text-[var(--color-ink-soft)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
                  >
                    <StatusDot status={d.status} />
                    <span>
                      {d.dashakNumber}. {d.dashakTitleMarathi}
                    </span>
                  </Link>
                </div>
                {openDashaks.has(d.dashakNumber) && (
                  <ul className="ml-6 mt-0.5 space-y-0.5 border-l border-[var(--color-border)] pl-2">
                    {d.samas.map((s) => (
                      <li key={s.samasNumber}>
                        <Link
                          href={`/dasbodh/${d.dashakNumber}/${s.samasNumber}`}
                          onClick={onNavigate}
                          className="flex items-center gap-1.5 rounded px-2 py-0.5 text-xs text-[var(--color-ink-soft)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
                        >
                          <StatusDot status={s.status} small />
                          समास {s.samasNumber}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

function Chevron({ open, small }: { open: boolean; small?: boolean }) {
  const size = small ? 12 : 16;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3a1 1 0 00-1 1v17l7-4.5 7 4.5V4a1 1 0 00-1-1H6z" />
    </svg>
  );
}
