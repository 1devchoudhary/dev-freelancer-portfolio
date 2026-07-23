import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { breadcrumbSchema, caseStudySchema } from "@/lib/jsonld";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

/** Only the three authored case studies exist; anything else is a 404. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {};
  }

  const url = `/work/${study.slug}`;
  // No dash here — the root layout's template already appends "— Devendra
  // Choudhary", and two em-dashes in one title reads badly in a SERP.
  const title = `${study.title} Case Study`;

  return {
    title,
    description: study.problem,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: study.problem,
      url,
      images: [{ url: study.cover.src, alt: study.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.problem,
      images: [study.cover.src],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <article>
      <JsonLd data={caseStudySchema(study)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />

      {/* Header */}
      <header className="border-b border-line bg-surface">
        <div className="container-content py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/#work"
              className="label text-ink-soft transition-colors hover:text-accent-deep"
            >
              ← Back to portfolio
            </Link>
          </nav>

          <Eyebrow>{study.clientContext}</Eyebrow>

          <h1 className="mt-4 text-4xl font-bold">{study.title}</h1>

          <p className="mt-6 measure text-lg text-ink-soft">{study.problem}</p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
            <div>
              <dt className="label text-ink-soft">Delivered</dt>
              <dd className="mt-1.5 font-mono text-sm text-ink">
                {study.period}
              </dd>
            </div>
            {study.outcomes.map((outcome) => (
              <div key={outcome.label}>
                <dt className="label text-ink-soft">{outcome.label}</dt>
                <dd className="mt-1.5 font-mono text-sm text-ink">
                  {outcome.metric}
                </dd>
              </div>
            ))}
          </dl>

          {study.confidential ? (
            <p className="mt-8 measure rounded-lg border border-line bg-ground px-4 py-3 text-sm text-ink-soft">
              <strong className="font-medium text-ink">
                Client project — details anonymised.
              </strong>{" "}
              This work is covered by a non-disclosure agreement. The client is
              not named and the screenshots are representative rather than
              production captures.
            </p>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              {study.liveUrl && (
                <ButtonLink href={study.liveUrl} variant="secondary">
                  View live demo
                </ButtonLink>
              )}
              {study.repoUrl && (
                <ButtonLink href={study.repoUrl} variant="secondary">
                  Source on GitHub
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Cover */}
      <div className="container-content -mt-8 md:-mt-10">
        <ScreenshotFrame
          image={study.cover}
          sizes="(max-width: 1140px) 100vw, 1076px"
          eager
        />
      </div>

      {/* Body */}
      <div className="container-content grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_260px] lg:gap-16">
        <div className="flex flex-col gap-12">
          {study.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              <div className="mt-5 flex measure flex-col gap-4 text-lg text-ink-soft">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {study.screenshots.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold">Screenshots</h2>
              <div className="mt-6 flex flex-col gap-8">
                {study.screenshots.map((screenshot) => (
                  <figure key={screenshot.src}>
                    <ScreenshotFrame
                      image={screenshot}
                      sizes="(max-width: 1024px) 100vw, 780px"
                    />
                    {screenshot.caption && (
                      <figcaption className="mt-3 measure text-sm text-ink-soft">
                        {screenshot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Tech stack rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="label text-ink-soft">Tech stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.tech.map((item) => (
              <li
                key={item}
                className="label rounded-md border border-line bg-surface px-2.5 py-1.5 text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* CTA back to booking */}
      <section
        aria-labelledby="case-study-cta"
        className="on-ink border-y border-line bg-band py-16 text-on-ink md:py-20"
      >
        <div className="container-content">
          <h2 id="case-study-cta" className="text-3xl text-white">
            Have something like this to build?
          </h2>
          <p className="mt-4 measure text-lg text-on-ink-soft">
            Send me a message. You&apos;ll get a straight answer about whether
            it&apos;s worth building, roughly what it would cost, and how long
            it would take.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/#contact" variant="onInk">
              Send message
            </ButtonLink>
            <ButtonLink href="/#work" variant="onInkGhost">
              See other projects
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
