"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import SidebarNav, {
  type DasbodhDashakSummary,
  type DasbodhMetaSummary,
  type DnyaneshwariChapterSummary,
  type DnyaneshwariMetaSummary,
} from "./SidebarNav";
import SearchBox from "./SearchBox";

interface AppShellProps {
  dnyaneshwariMeta: DnyaneshwariMetaSummary;
  dnyaneshwariChapters: DnyaneshwariChapterSummary[];
  dasbodhMeta: DasbodhMetaSummary;
  dasbodhDashaks: DasbodhDashakSummary[];
  children: ReactNode;
}

export default function AppShell({
  dnyaneshwariMeta,
  dnyaneshwariChapters,
  dasbodhMeta,
  dasbodhDashaks,
  children,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-cream)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-maroon)] md:hidden"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
          <Link
            href="/"
            className="font-devanagari-serif text-lg font-semibold text-[var(--color-maroon)] sm:text-xl"
          >
            ज्ञानेश्वरी &amp; दासबोध
          </Link>
          <span className="hidden text-sm text-[var(--color-ink-soft)] sm:inline">
            A Study Portal
          </span>
          <div className="ml-auto w-full max-w-xs">
            <SearchBox />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6">
        {/* Desktop persistent sidebar */}
        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-3">
            <SidebarNav
              dnyaneshwariMeta={dnyaneshwariMeta}
              dnyaneshwariChapters={dnyaneshwariChapters}
              dasbodhMeta={dasbodhMeta}
              dasbodhDashaks={dasbodhDashaks}
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="relative z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-[var(--color-cream-soft)] p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-devanagari-serif text-base font-semibold text-[var(--color-maroon)]">
                  विषय सूची
                </span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="rounded-md border border-[var(--color-border)] p-1.5 text-[var(--color-maroon)]"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <SidebarNav
                dnyaneshwariMeta={dnyaneshwariMeta}
                dnyaneshwariChapters={dnyaneshwariChapters}
                dasbodhMeta={dasbodhMeta}
                dasbodhDashaks={dasbodhDashaks}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-ink-soft)]">
        A study portal for the Dnyaneshwari and Dasbodh. Sources are cited on every populated
        chapter/dashak.
      </footer>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
