import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { WorkTabs } from "@/components/sections/WorkTabs";
import { Eyebrow, Section } from "@/components/ui";
import {
  CASE_STUDY_CATEGORIES,
  caseStudies,
  type CaseStudy,
} from "@/content/caseStudies";

/*
 * Server component. The cards are rendered here and handed to the client tab
 * shell as ReactNodes — ScreenshotFrame reads the filesystem to detect missing
 * images, so it must never be pulled into a "use client" module graph.
 *
 * The tab list is derived from the studies rather than hard-coded: a category
 * nothing is tagged with simply never gets a tab, so the filter can never
 * land a visitor on an empty panel.
 */
export function SelectedWork() {
  const usedCategories = CASE_STUDY_CATEGORIES.filter((category) =>
    caseStudies.some((study) => study.categories.includes(category))
  );

  const items = caseStudies.map((study) => ({
    slug: study.slug,
    categories: study.categories,
    card: <StudyCard study={study} />,
  }));

  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal>
        <Eyebrow>Portfolio</Eyebrow>
        <h2 id="work-heading" className="mt-4 text-3xl">
          Systems I&apos;ve built and shipped
        </h2>
        <p className="mt-4 measure text-lg text-ink-soft">
          Live software you can open and use, with the source on GitHub — so you
          can judge the work rather than take my word for it.
        </p>
      </Reveal>

      <WorkTabs items={items} categories={usedCategories} />
    </Section>
  );
}

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
      <div className="order-2 md:order-1">
        {study.confidential && (
          <p className="label mb-4 inline-block rounded-md border border-line px-2.5 py-1 text-ink-soft">
            Client project — details anonymised
          </p>
        )}

        <h3 className="text-2xl font-semibold">
          <Link
            href={`/work/${study.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {study.title}
          </Link>
        </h3>

        <p className="mt-3 measure text-ink-soft">{study.problem}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {study.tech.slice(0, 5).map((item) => (
            <li
              key={item}
              className="label rounded-md bg-ground px-2.5 py-1.5 text-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep">
          Read case study
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          >
            →
          </span>
        </p>
      </div>

      <div className="order-1 md:order-2">
        <ScreenshotFrame
          image={study.cover}
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </div>
    </div>
  );
}
