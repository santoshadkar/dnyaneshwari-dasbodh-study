const STORAGE_KEY = "verse-bookmarks";

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().includes(id);
}

export function toggleBookmark(id: string): string[] {
  const current = getBookmarks();
  const next = current.includes(id)
    ? current.filter((b) => b !== id)
    : [...current, id];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
