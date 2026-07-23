import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/ui";
import { process } from "@/content/site";

export function Process() {
  return (
    <Section id="process" tone="surface" labelledBy="process-heading">
      <Reveal>
        <Eyebrow>How it works</Eyebrow>
        <h2 id="process-heading" className="mt-4 text-3xl">
          What happens after you get in touch
        </h2>
        <p className="mt-4 measure text-lg text-ink-soft">
          Three steps, in this order, every time. You always know which one
          we&apos;re on.
        </p>
      </Reveal>

      <ol className="mt-12 grid gap-6 lg:grid-cols-3">
        {process.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 0.08}
            className="rounded-xl border border-line bg-ground p-6 md:p-8"
          >
            <p className="label text-accent-deep">Step {index + 1}</p>
            <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-ink-soft">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
