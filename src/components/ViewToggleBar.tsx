"use client";

import { useEffect, useState } from "react";
import { DEFAULT_VIEW_PREFS, loadViewPrefs, saveViewPrefs, type ViewPrefs } from "@/lib/viewPrefs";

export default function ViewToggleBar({
  onChange,
}: {
  onChange: (prefs: ViewPrefs) => void;
}) {
  const [prefs, setPrefs] = useState<ViewPrefs>(DEFAULT_VIEW_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reads localStorage, which is unavailable during SSR — sync after mount
    // rather than in the initial render to avoid a hydration mismatch.
    const loaded = loadViewPrefs();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs(loaded);
    onChange(loaded);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(next: Partial<ViewPrefs>) {
    const merged = { ...prefs, ...next };
    setPrefs(merged);
    saveViewPrefs(merged);
    onChange(merged);
  }

  if (!ready) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Toggle
          label="मूळ ओवी"
          sub="Original"
          checked={prefs.showOriginal}
          onChange={(v) => update({ showOriginal: v })}
        />
        <Toggle
          label="मराठी अर्थ"
          sub="Marathi meaning"
          checked={prefs.showMarathiMeaning}
          onChange={(v) => update({ showMarathiMeaning: v })}
        />
        <Toggle
          label="English"
          sub="English meaning"
          checked={prefs.showEnglishMeaning}
          onChange={(v) => update({ showEnglishMeaning: v })}
        />
      </div>
      <div className="ml-auto flex items-center gap-1 rounded-full border border-[var(--color-border)] p-0.5">
        <button
          type="button"
          onClick={() => update({ layout: "side-by-side" })}
          className={`rounded-full px-3 py-1 text-xs ${
            prefs.layout === "side-by-side"
              ? "bg-[var(--color-maroon)] text-[var(--color-cream)]"
              : "text-[var(--color-ink-soft)]"
          }`}
        >
          Side by side
        </button>
        <button
          type="button"
          onClick={() => update({ layout: "stacked" })}
          className={`rounded-full px-3 py-1 text-xs ${
            prefs.layout === "stacked"
              ? "bg-[var(--color-maroon)] text-[var(--color-cream)]"
              : "text-[var(--color-ink-soft)]"
          }`}
        >
          Stacked
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  sub,
  checked,
  onChange,
}: {
  label: string;
  sub: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[var(--color-maroon)]"
      />
      <span>
        <span className="font-devanagari-sans">{label}</span>{" "}
        <span className="text-[var(--color-ink-soft)]">({sub})</span>
      </span>
    </label>
  );
}
