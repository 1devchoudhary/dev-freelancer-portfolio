import { site } from "@/content/site";
import { services } from "@/content/services";
import type { CaseStudy } from "@/content/caseStudies";
import { absoluteUrl, SITE_URL } from "@/lib/site";

/**
 * Structured data builders. Rendered via <JsonLd /> which escapes `<` before
 * it reaches dangerouslySetInnerHTML.
 */

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: site.name,
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    knowsAbout: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "Workflow automation",
      "REST API design",
    ],
    sameAs: [site.social.github, site.social.linkedin],
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${site.name} — Custom Web Development`,
    description: site.description,
    url: SITE_URL,
    image: absoluteUrl("/og-image.png"),
    email: `mailto:${site.email}`,
    founder: { "@id": `${SITE_URL}/#person` },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "Ireland" },
      { "@type": "Country", name: "New Zealand" },
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: Number(service.startingAt.replace(/[^0-9.]/g, "")),
        },
      })),
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.join(" "),
      },
    })),
  };
}

export function caseStudySchema(study: CaseStudy) {
  const url = absoluteUrl(`/work/${study.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.problem,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(study.cover.src),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    about: study.tech,
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
