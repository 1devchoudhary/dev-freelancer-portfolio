import { Portrait } from "@/components/Portrait";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/ui";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <Portrait
            width={440}
            height={520}
            sizes="(max-width: 1024px) 100vw, 380px"
            className="mx-auto max-w-[300px] lg:mx-0 lg:max-w-none"
          />
        </Reveal>

        <Reveal delay={0.06}>
          <Eyebrow>About</Eyebrow>
          <h2 id="about-heading" className="mt-4 text-3xl">
            {about.heading}
          </h2>

          <div className="mt-6 flex flex-col gap-4 measure text-lg text-ink-soft">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-line bg-surface p-6 md:p-8">
            <h3 className="text-xl font-semibold">
              {about.workingTogether.heading}
            </h3>
            <dl className="mt-6 flex flex-col gap-6">
              {about.workingTogether.points.map((point) => (
                <div key={point.title}>
                  <dt className="label text-accent-deep">{point.title}</dt>
                  <dd className="mt-2 text-ink-soft">{point.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
