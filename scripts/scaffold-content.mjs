// One-time scaffolding generator for Phase 0. Run with: node scripts/scaffold-content.mjs
// Produces empty (unpopulated) chapter/dashak JSON files matching the content schema in README.md.
// Titles included here are structural/bibliographic facts (chapter names, book structure),
// cross-checked against the sources cited in each meta.json / file "source" field — NOT verse
// content. Actual ovi/owi text and meanings are added chapter-by-chapter in later phases per
// the project's accuracy rules, each with its own cited source and verified flag.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "content");

function write(dir, filename, data) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ---------------------------------------------------------------------------
// Dnyaneshwari — 18 chapters, following the Bhagavad Gita's 18-chapter structure
// (Dnyaneshwari is a chapter-by-chapter ovi commentary on the Gita).
// ---------------------------------------------------------------------------
const dnyaneshwariChapters = [
  ["अर्जुनविषादयोग", "Arjuna Vishada Yoga (The Yoga of Arjuna's Grief)"],
  ["सांख्ययोग", "Sankhya Yoga (The Yoga of Knowledge)"],
  ["कर्मयोग", "Karma Yoga (The Yoga of Action)"],
  ["ज्ञानकर्मसंन्यासयोग", "Jnana Karma Sanyasa Yoga (The Yoga of Knowledge and Renunciation of Action)"],
  ["कर्मसंन्यासयोग", "Karma Sanyasa Yoga (The Yoga of Renunciation of Action)"],
  ["आत्मसंयमयोग", "Atmasanyama Yoga (The Yoga of Self-Restraint)"],
  ["ज्ञानविज्ञानयोग", "Jnana Vijnana Yoga (The Yoga of Knowledge and Wisdom)"],
  ["अक्षरब्रह्मयोग", "Akshara Brahma Yoga (The Yoga of the Imperishable Brahman)"],
  ["राजविद्याराजगुह्ययोग", "Raja Vidya Raja Guhya Yoga (The Yoga of Sovereign Knowledge and Sovereign Mystery)"],
  ["विभूतियोग", "Vibhuti Yoga (The Yoga of Divine Glories)"],
  ["विश्वरूपदर्शनयोग", "Vishwarupa Darshana Yoga (The Yoga of the Vision of the Universal Form)"],
  ["भक्तियोग", "Bhakti Yoga (The Yoga of Devotion)"],
  ["क्षेत्रक्षेत्रज्ञविभागयोग", "Kshetra Kshetrajna Vibhaga Yoga (The Yoga of the Field and its Knower)"],
  ["गुणत्रयविभागयोग", "Gunatraya Vibhaga Yoga (The Yoga of the Division of the Three Gunas)"],
  ["पुरुषोत्तमयोग", "Purushottama Yoga (The Yoga of the Supreme Person)"],
  ["दैवासुरसंपद्विभागयोग", "Daivasura Sampad Vibhaga Yoga (The Yoga of the Division Between the Divine and the Demonic)"],
  ["श्रद्धात्रयविभागयोग", "Shraddhatraya Vibhaga Yoga (The Yoga of the Threefold Division of Faith)"],
  ["मोक्षसंन्यासयोग", "Moksha Sanyasa Yoga (The Yoga of Liberation through Renunciation)"],
];

write(join(ROOT, "dnyaneshwari"), "meta.json", {
  book: "dnyaneshwari",
  titleMarathi: "ज्ञानेश्वरी",
  titleEnglish: "Dnyaneshwari (also known as Bhavartharthadipika)",
  author: "Sant Dnyaneshwar (Jnaneshwar Maharaj)",
  composedApprox: "c. 1290 CE (Shaka 1212), in Marathi ovi meter",
  totalChapters: 18,
  structureNote:
    "Dnyaneshwari is a chapter-by-chapter Marathi commentary on the Bhagavad Gita, composed in the ovi verse form. It follows the Gita's traditional 18-chapter structure and chapter titles, and contains over 9,000 ovis in total.",
  chapterTitleSource: {
    name: "Traditional Bhagavad Gita chapter titles (followed by Dnyaneshwari as its source text's structure)",
    url: "https://en.wikipedia.org/wiki/Bhagavad_Gita",
  },
  contentStatus:
    "Scaffold only (Phase 0). No ovi text, Marathi meaning, or English meaning has been populated yet. Content is added and source-cited chapter-by-chapter in later phases; see each chapter-XX.json 'source' and 'status' fields.",
});

dnyaneshwariChapters.forEach(([mr, en], i) => {
  const n = i + 1;
  write(join(ROOT, "dnyaneshwari"), `chapter-${String(n).padStart(2, "0")}.json`, {
    book: "dnyaneshwari",
    chapterNumber: n,
    chapterTitleMarathi: mr,
    chapterTitleEnglish: en,
    source: null,
    numberingConvention: null,
    status: "empty",
    verses: [],
  });
});

// ---------------------------------------------------------------------------
// Dasbodh — 20 dashaks x 10 samas each (200 samas total; ~7,751 owis total).
// Dashak titles are sourced; samas titles are intentionally left blank until
// researched and cross-checked (early research surfaced conflicting samas-1
// titles between sources — see note on each samas placeholder).
// ---------------------------------------------------------------------------
const dashakTitles = [
  ["स्तवननाम", "Stavan (Hymns of Invocation and Praise)"],
  ["मूर्खलक्षणनाम", "Murkha Lakshan (Signs/Characteristics of the Foolish)"],
  ["स्वगुणपरीक्षानाम", "Swaguna Pariksha (Examination of One's Own Qualities)"],
  ["नवविधाभक्तिनाम", "Navavidha Bhakti (The Nine Forms of Devotion)"],
  ["मंत्रांचा", "Mantranchi (Of Sacred Formulas / the Guru's Mantra)"],
  ["देवशोधन", "Devashodhan (Inquiry into the Nature of God)"],
  ["चौदा ब्रह्मांचा", "Chauda Brahmancha (Of the Fourteen Brahmas)"],
  ["मायोद्भव अथवा ज्ञानदशक", "Mayodbhava / Jnana Dashak (The Arising of Maya / the Dashak of Knowledge)"],
  ["गुणरूप", "Gunarupa (Of Qualities and Form)"],
  ["जगज्ज्योतीनाम", "Jagajjyoti (The Light of the World)"],
  ["भीमदशक", "Bhima Dashak"],
  ["विवेकवैराग्य", "Viveka Vairagya (Discernment and Dispassion)"],
  ["नामरूप", "Nama Rupa (Name and Form)"],
  ["अखंडध्यान", "Akhanda Dhyana (Uninterrupted Meditation)"],
  ["आत्मदशक", "Atma Dashak (The Dashak of the Self)"],
  ["सप्ततिन्वय", "Saptati Anvaya"],
  ["प्रकृतिपुरुष", "Prakriti Purusha (Nature and the Self / Creation and Creator)"],
  ["बहुजिनसी", "Bahujinasi (Of Many Kinds / Miscellaneous)"],
  ["शिकवण", "Shikavan (Teaching / Instruction)"],
  ["पूर्णनाम", "Purnanam (The Complete / The Whole)"],
];

write(join(ROOT, "dasbodh"), "meta.json", {
  book: "dasbodh",
  titleMarathi: "दासबोध",
  titleEnglish: "Dasbodh",
  author: "Samarth Ramdas Swami",
  composedApprox: "c. 1654 CE, narrated orally to his disciple Kalyan Swami; in Marathi ovi meter",
  totalDashaks: 20,
  samasPerDashak: 10,
  totalSamas: 200,
  totalOwisApprox: 7751,
  structureNote:
    "Dasbodh is organized into 20 dashaks (sections), each containing 10 samas (sub-sections), for 200 samas in total, composed in the ovi verse form.",
  dashakTitleSource: {
    name: "Sanskrit Documents (sanskritdocuments.org) — list of chapters and subsections in Samartha Dasabodh",
    url: "https://sanskritdocuments.org/marathi/dndAs/dAsabodhsUchi_unic.html",
  },
  crossCheckSource: {
    name: "Wikipedia — Dasbodh",
    url: "https://en.wikipedia.org/wiki/Dasbodh",
  },
  contentStatus:
    "Scaffold only (Phase 0). Dashak-level titles are sourced and cross-checked. Samas titles and owi text/meanings are NOT yet populated — samas placeholders are numbered only until researched chapter-by-chapter with a verifiable source, per the project's accuracy rules.",
});

dashakTitles.forEach(([mr, en], i) => {
  const dashakNum = i + 1;
  const samas = Array.from({ length: 10 }, (_, s) => ({
    samasNumber: s + 1,
    samasTitleMarathi: "",
    samasTitleEnglish: "",
    source: null,
    status: "empty",
    note: "Title and owi content pending research (Phase 1/2). Preliminary research found conflicting samas-1 titles across secondary sources for Dashak 1 — titles will be entered only once cross-checked against a primary/authoritative edition.",
    owis: [],
  }));

  write(join(ROOT, "dasbodh"), `dashak-${String(dashakNum).padStart(2, "0")}.json`, {
    book: "dasbodh",
    dashakNumber: dashakNum,
    dashakTitleMarathi: mr,
    dashakTitleEnglish: en,
    status: "empty",
    samas,
  });
});

console.log("Scaffolded 18 Dnyaneshwari chapter files + meta.json");
console.log("Scaffolded 20 Dasbodh dashak files (200 samas placeholders) + meta.json");
