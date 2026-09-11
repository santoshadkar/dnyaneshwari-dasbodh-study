"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { SearchEntry } from "@/lib/types";

let cachedIndex: Fuse<SearchEntry> | null = null;
let cachedEntries: SearchEntry[] | null = null;

async function getFuse(): Promise<Fuse<SearchEntry>> {
  if (cachedIndex) return cachedIndex;
  const res = await fetch("/search-index.json");
  const entries: SearchEntry[] = res.ok ? await res.json() : [];
  cachedEntries = entries;
  cachedIndex = new Fuse(entries, {
    keys: ["original", "marathiMeaning", "englishMeaning", "refLabel"],
    threshold: 0.32,
    ignoreLocation: true,
  });
  return cachedIndex;
}

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (query.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }
    getFuse().then((fuse) => {
      if (cancelled) return;
      setResults(fuse.search(query, { limit: 8 }).map((r) => r.item));
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search verses..."
        aria-label="Search verses"
        className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-1.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
      />
      {open && query.trim().length >= 2 && (
        <div className="absolute right-0 z-40 mt-2 w-[22rem] max-w-[90vw] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] shadow-lg">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-[var(--color-ink-soft)]">
              No matching verses found{cachedEntries?.length === 0 ? " yet — content is still being added." : "."}
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((r) => (
                <li key={r.id} className="border-b border-[var(--color-border)] last:border-0">
                  <Link
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 hover:bg-[var(--color-cream-soft)]"
                  >
                    <div className="text-xs font-medium text-[var(--color-maroon)]">
                      {r.refLabel}
                      {!r.verified && (
                        <span className="ml-2 text-[var(--color-saffron-dark)]">(unverified)</span>
                      )}
                    </div>
                    <div className="mt-0.5 truncate font-devanagari-serif text-sm text-[var(--color-ink)]">
                      {r.original}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
