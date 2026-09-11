# Dnyaneshwari & Dasbodh — Study Portal

A calm, verse-by-verse study portal for two classic works of Marathi spiritual
literature:

- **Dnyaneshwari (ज्ञानेश्वरी)** — Sant Dnyaneshwar's 13th-century Marathi
  commentary on the Bhagavad Gita, in ovi meter, across 18 chapters (अध्याय).
- **Dasbodh (दासबोध)** — Samarth Ramdas's 17th-century spiritual text,
  organized into 20 dashaks (दशक), each with 10 samas (समास).

For every verse, the portal shows the original Devanagari text, a Marathi
meaning, and an English meaning side by side (or stacked, on mobile).

## Status

This is a content-first project built in phases (see the project brief).
**Phase 0 (this state): the full site structure, navigation, and reading UI
are built and working — no verse content has been added yet.** Every
chapter/dashak/samas page currently shows an empty state. Content is added
chapter-by-chapter in later phases, each with a cited source.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static JSON content (no database) — statically generated at build time
- Fuse.js for client-side search over a build-time search index
- `localStorage` for bookmarks and reading-view preferences (no backend, no login)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` builds the production site (also regenerates the search
index). `npm run lint` runs ESLint.

## Content schema

All verse content lives under `/content` as static JSON, one file per
chapter/dashak, so pages can be statically generated and the site can be
redeployed instantly after any content correction.

```
/content
  /dnyaneshwari
    meta.json            # book-level info: title, author, structure, sources
    chapter-01.json ... chapter-18.json
  /dasbodh
    meta.json
    dashak-01.json ... dashak-20.json
```

### Dnyaneshwari chapter file (`content/dnyaneshwari/chapter-XX.json`)

```jsonc
{
  "book": "dnyaneshwari",
  "chapterNumber": 1,
  "chapterTitleMarathi": "अर्जुनविषादयोग",
  "chapterTitleEnglish": "Arjuna Vishada Yoga (The Yoga of Arjuna's Grief)",
  "source": { "name": "...", "url": "https://..." }, // null until populated
  "numberingConvention": null, // e.g. "per XYZ 1909 edition" once known
  "status": "empty", // "empty" | "in-progress" | "complete"
  "verses": [
    {
      "verseNumber": 1,
      "original": "मूळ ओवी (Devanagari text)",
      "marathiMeaning": "मराठी अर्थ",
      "englishMeaning": "English meaning",
      "verified": true,
      "note": "" // explain what's uncertain if verified: false
    }
  ]
}
```

### Dasbodh dashak file (`content/dasbodh/dashak-XX.json`)

Same idea, but a dashak nests 10 `samas`, each with its own `owis` array
(same verse shape as above, field name `owis` instead of `verses`):

```jsonc
{
  "book": "dasbodh",
  "dashakNumber": 1,
  "dashakTitleMarathi": "स्तवननाम",
  "dashakTitleEnglish": "Stavan (Hymns of Invocation and Praise)",
  "status": "empty",
  "samas": [
    {
      "samasNumber": 1,
      "samasTitleMarathi": "",
      "samasTitleEnglish": "",
      "source": null,
      "status": "empty",
      "note": "why this is still empty, if relevant",
      "owis": []
    }
  ]
}
```

### Adding or correcting content yourself

1. Open the relevant `content/.../chapter-XX.json` or `dashak-XX.json` file.
2. Add/edit entries in `verses` (or a samas's `owis`), filling in `original`,
   `marathiMeaning`, `englishMeaning`.
3. Set `"verified": true` only once you've checked the text against a real,
   citable source — set the file's (or samas's) `source` field to that
   source's name and URL. If you're not sure, leave `"verified": false` and
   add a short `"note"` explaining what's uncertain; the site will show an
   "Unverified — under review" badge on that verse automatically.
4. Update the containing file's (or samas's) `"status"` field:
   `"empty"` (no verses yet) → `"in-progress"` (some added) → `"complete"`
   (fully populated for that chapter/dashak/samas).
5. Run `npm run dev` to check it renders correctly, then commit.

The search index and every listing page (chapter/dashak counts, completion
badges) are derived from these files automatically — nothing else needs to
be updated by hand.

## Accuracy policy

These are texts studied closely by practitioners, so nothing in `verses`/
`owis` is invented. Every populated chapter/dashak cites a real source; any
verse that couldn't be fully cross-checked is marked `"verified": false`
with a note instead of being guessed. See the project brief for the full
policy this repo follows.

## Deployment

Deployed on Vercel from the `main` branch — push to `main` and Vercel
redeploys automatically (no extra config needed for Next.js).
