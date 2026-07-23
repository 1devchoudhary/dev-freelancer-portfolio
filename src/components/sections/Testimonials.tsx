import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/ui";
import { testimonials } from "@/content/testimonials";

/**
 * Renders nothing at all while the testimonials array is empty — no heading,
 * no empty state, no placeholder quotes. An invented testimonial would
 * undermine every other claim on the page.
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section id="testimonials" tone="surface" labelledBy="testimonials-heading">
      <Reveal>
        <Eyebrow>Testimonials</Eyebrow>
        <h2 id="testimonials-heading" className="mt-4 text-3xl">
          What clients say
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal
            as="li"
            key={`${testimonial.name}-${index}`}
            delay={index * 0.08}
            className="rounded-xl border border-line bg-ground p-6 md:p-8"
          >
            <figure>
              <blockquote className="text-lg text-ink">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <span className="block font-medium text-ink">
                  {testimonial.name}
                </span>
                <span className="mt-0.5 block text-sm text-ink-soft">
                  {testimonial.role}
                  {testimonial.company ? `, ${testimonial.company}` : ""}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
