/**
 * The three service offerings shown on the home page.
 * `startingAt` is rendered verbatim in mono type — include the currency.
 */

export type Service = {
  slug: string;
  title: string;
  /** Two to three lines. Lead with the outcome, not the technology. */
  description: string;
  /** Concrete deliverables. Keep each to one line. */
  includes: string[];
  startingAt: string;
  /** Optional qualifier shown under the price, e.g. billing cadence. */
  priceNote?: string;
};

export const services: Service[] = [
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description:
      "The dashboard, client portal, or internal tool your team currently runs on spreadsheets and email. Built on React, Node.js/Express, and MongoDB — deployed on your own infrastructure so it holds up as you grow.",
    includes: [
      "React front end and Node/Express API",
      "MongoDB or MySQL schema designed around your workflow",
      "JWT authentication with role-based access, 2FA where needed",
      "Admin tooling so you can run it without me",
      "Deployed, documented, and handed over with the source code",
    ],
    startingAt: "$350",
    priceNote: "Fixed price, quoted against a written scope",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation & Integrations",
    description:
      "The manual steps between your systems — re-keying data, chasing updates by hand, copying between tools. Automated using n8n, connected to the CRM, accounting, or calendar tools you already use.",
    includes: [
      "n8n workflows connecting your existing tools",
      "Integration with common CRM, accounting, or scheduling platforms",
      "Automated task handling (e.g. file/image processing pipelines)",
      "Scoped after a short technical call, so the price reflects the actual tools involved"
    ],
    startingAt: "$200",
    priceNote: "Fixed price per workflow scope",
  }
];
