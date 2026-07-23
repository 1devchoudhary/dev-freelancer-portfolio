import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/ui";
import { finalCta, site, trustPoints } from "@/content/site";

export function FinalCta() {
  return (
    <Section id="contact" tone="ink" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow onInk>Get in touch</Eyebrow>
          <h2 id="contact-heading" className="mt-4 text-3xl text-white">
            {finalCta.heading}
          </h2>
          <p className="mt-4 measure text-lg text-on-ink-soft">
            {finalCta.subhead}
          </p>

          {/* No button here. The form is the adjacent column, so a CTA in this
              position would either scroll nowhere or duplicate the submit. */}
          <ul className="mt-8 flex flex-col gap-3 border-t border-on-ink-line pt-8">
            {trustPoints.map((point) => (
              <li
                key={point.label}
                className="label flex items-center gap-3 text-on-ink-soft"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 shrink-0 bg-accent"
                />
                {point.label}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-on-ink-soft">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-on-ink underline underline-offset-4 transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
