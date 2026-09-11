"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBookmarks, toggleBookmark } from "@/lib/bookmarks";
import type { SearchEntry } from "@/lib/types";

export default function BookmarksPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Reads localStorage, which is unavailable during SSR — sync after mount
    // rather than in the initial render to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIds(getBookmarks());
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchEntry[]) => {
        setEntries(data);
        setLoaded(true);
      });
  }, []);

  const bookmarked = entries.filter((e) => ids.includes(e.id));

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 font-devanagari-serif text-2xl font-semibold text-[var(--color-maroon)]">
        My Bookmarks
      </h1>
      <p className="mb-6 text-sm text-[var(--color-ink-soft)]">
        Bookmarks are stored in this browser only.
      </p>

      {!loaded ? (
        <p className="text-sm text-[var(--color-ink-soft)]">Loading…</p>
      ) : bookmarked.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center text-[var(--color-ink-soft)]">
          You haven&apos;t bookmarked any verses yet. Use the bookmark icon on any verse to
          save it here.
        </div>
      ) : (
        <ul className="space-y-4">
          {bookmarked.map((e) => (
            <li
              key={e.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <Link href={e.href} className="text-sm font-medium text-[var(--color-maroon)] hover:underline">
                  {e.refLabel}
                </Link>
                <button
                  type="button"
                  onClick={() => setIds(toggleBookmark(e.id))}
                  className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-maroon)]"
                >
                  Remove
                </button>
              </div>
              {!e.verified && (
                <span className="mb-2 inline-block rounded-full bg-[var(--color-saffron)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--color-saffron-dark)]">
                  Unverified — under review
                </span>
              )}
              <p className="font-devanagari-serif text-base leading-relaxed text-[var(--color-maroon-dark)]">
                {e.original}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
