import Link from "next/link";
import { getDasbodhMeta, getDnyaneshwariMeta } from "@/lib/content";

export default function HomePage() {
  const dnyaneshwariMeta = getDnyaneshwariMeta();
  const dasbodhMeta = getDasbodhMeta();

  return (
    <div className="mx-auto max-w-3xl">
      <section className="mb-10 text-center">
        <h1 className="font-devanagari-serif text-3xl font-semibold text-[var(--color-maroon)] sm:text-4xl">
          ज्ञानेश्वरी आणि दासबोध
        </h1>
        <p className="mt-2 text-lg text-[var(--color-ink-soft)]">
          A quiet space for studying two classic works of Marathi spiritual literature —
          verse by verse, with original text alongside Marathi and English meaning.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <BookCard
          href="/dnyaneshwari"
          titleMarathi={dnyaneshwariMeta.titleMarathi}
          titleEnglish={dnyaneshwariMeta.titleEnglish}
          author={dnyaneshwariMeta.author}
          composed={dnyaneshwariMeta.composedApprox}
          description={dnyaneshwariMeta.structureNote}
        />
        <BookCard
          href="/dasbodh"
          titleMarathi={dasbodhMeta.titleMarathi}
          titleEnglish={dasbodhMeta.titleEnglish}
          author={dasbodhMeta.author}
          composed={dasbodhMeta.composedApprox}
          description={dasbodhMeta.structureNote}
        />
      </div>

      <section className="mt-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-6 text-sm text-[var(--color-ink-soft)]">
        <h2 className="mb-2 font-medium text-[var(--color-ink)]">About the content on this site</h2>
        <p>
          Verse text and meanings are added gradually, chapter by chapter, and each
          populated chapter or dashak cites the source it was drawn from. Anything not
          yet researched and cross-checked is left empty rather than guessed, and any
          verse still awaiting verification is clearly marked{" "}
          <span className="rounded-full bg-[var(--color-saffron)]/20 px-2 py-0.5 text-xs font-medium text-[var(--color-saffron-dark)]">
            Unverified — under review
          </span>
          .
        </p>
      </section>
    </div>
  );
}

function BookCard({
  href,
  titleMarathi,
  titleEnglish,
  author,
  composed,
  description,
}: {
  href: string;
  titleMarathi: string;
  titleEnglish: string;
  author: string;
  composed: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-6 transition-shadow hover:shadow-md"
    >
      <h2 className="font-devanagari-serif text-2xl font-semibold text-[var(--color-maroon)]">
        {titleMarathi}
      </h2>
      <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">{titleEnglish}</p>
      <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{description}</p>
      <p className="mt-4 text-xs text-[var(--color-ink-soft)]">
        {author} · {composed}
      </p>
      <span className="mt-4 text-sm font-medium text-[var(--color-maroon)]">
        Begin reading →
      </span>
    </Link>
  );
}
