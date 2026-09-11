const STORAGE_KEY = "verse-view-prefs";

export interface ViewPrefs {
  showOriginal: boolean;
  showMarathiMeaning: boolean;
  showEnglishMeaning: boolean;
  layout: "side-by-side" | "stacked";
}

export const DEFAULT_VIEW_PREFS: ViewPrefs = {
  showOriginal: true,
  showMarathiMeaning: true,
  showEnglishMeaning: true,
  layout: "side-by-side",
};

export function loadViewPrefs(): ViewPrefs {
  if (typeof window === "undefined") return DEFAULT_VIEW_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_VIEW_PREFS;
    return { ...DEFAULT_VIEW_PREFS, ...(JSON.parse(raw) as Partial<ViewPrefs>) };
  } catch {
    return DEFAULT_VIEW_PREFS;
  }
}

export function saveViewPrefs(prefs: ViewPrefs): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}
