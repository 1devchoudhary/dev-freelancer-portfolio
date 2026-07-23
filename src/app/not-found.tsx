import Link from "next/link";

import { ButtonLink, Eyebrow } from "@/components/ui";
import { caseStudies } from "@/content/caseStudies";

export default function NotFound() {
  return (
    <div className="container-content py-24 md:py-32">
      <Eyebrow>404</Eyebrow>

      <h1 className="mt-4 text-4xl font-bold">This page doesn&apos;t exist.</h1>

      <p className="mt-6 measure text-lg text-ink-soft">
        The link may be out of date, or the address might have a typo in it.
        Everything on this site is reachable from the home page.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/#contact" variant="secondary">
          Get in touch
        </ButtonLink>
      </div>

      <div className="mt-16 border-t border-line pt-8">
        <h2 className="label text-ink-soft">Case studies</h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="text-accent-deep transition-colors hover:text-accent-deeper"
              >
                {study.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
