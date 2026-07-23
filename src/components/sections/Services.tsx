import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/ui";
import { services } from "@/content/services";

export function Services() {
  return (
    <Section id="services" tone="surface" labelledBy="services-heading">
      <Reveal>
        <Eyebrow>Services</Eyebrow>
        <h2 id="services-heading" className="mt-4 text-3xl">
          How I work with small teams
        </h2>
        <p className="mt-4 measure text-lg text-ink-soft">
          Every engagement is quoted as a fixed price against a written scope. You approve a number and a date before any work starts.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {services.map((service, index) => (
          <Reveal
            as="li"
            key={service.slug}
            delay={index * 0.08}
            className="flex flex-col rounded-xl border border-line bg-ground p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold">{service.title}</h3>

            <p className="mt-3 text-ink-soft">{service.description}</p>

            <p className="label mt-6 text-ink">What you get</p>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm text-ink-soft">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Price pinned to the card foot so the three cards align. */}
            <div className="mt-auto pt-8">
              <div className="border-t border-line pt-5">
                <p className="label text-ink-soft">Starting at</p>
                <p
                  className="mt-1.5 font-mono text-2xl font-medium text-ink"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {service.startingAt}
                </p>
                {service.priceNote && (
                  <p className="mt-1.5 text-sm text-ink-soft">
                    {service.priceNote}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
