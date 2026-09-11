"use client";

import { useEffect, useState } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

export default function BookmarkButton({ id }: { id: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Reads localStorage, which is unavailable during SSR — sync after mount
    // rather than in the initial render to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookmarked(isBookmarked(id));
  }, [id]);

  return (
    <button
      type="button"
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      aria-pressed={bookmarked}
      onClick={() => setBookmarked(toggleBookmark(id).includes(id))}
      className={`rounded-full p-1.5 transition-colors ${
        bookmarked
          ? "text-[var(--color-saffron-dark)]"
          : "text-[var(--color-border)] hover:text-[var(--color-saffron-dark)]"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M6 3a1 1 0 00-1 1v17l7-4.5 7 4.5V4a1 1 0 00-1-1H6z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
