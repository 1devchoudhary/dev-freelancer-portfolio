import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { personSchema, professionalServiceSchema } from "@/lib/jsonld";

/*
 * The FAQ section was removed. Its FAQPage structured data went with it —
 * Google requires that markup to describe content actually visible on the
 * page, so keeping the schema without the section would be a violation, not a
 * free SEO win. `content/faqs.ts` and the `faqSchema` helper are left in place
 * so the section can be restored without rewriting the copy.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={professionalServiceSchema()} />

      <Hero />
      <Services />
      <SelectedWork />
      <Process />
      <About />
      <Testimonials />
      <FinalCta />
    </>
  );
}
