/**
 * Owner identity, positioning, and the narrative copy used across the site.
 * Edit this file to change names, links, headlines, and the About section.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type TrustPoint = {
  /** Short monospace fragment shown in the trust strip. */
  label: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export const site = {
  name: "Devendra Choudhary",
  /** Used in the metadata title template and the logo mark. */
  shortName: "Devendra Choudhary",
  jobTitle: "Full-stack developer",
  email: "devendrachoudhary253@gmail.com",
  location: {
    city: "Indore",
    region: "Madhya Pradesh",
    country: "India",
    countryCode: "IN",
  },
  /** Where the "Book a free call" buttons point. */
  bookingUrl: "https://cal.com/devendrachoudhary/15min",
  social: {
    github: "https://github.com/1devchoudhary",
    linkedin: "https://www.linkedin.com/in/devendra-choudhary-2a538a1b3/",
  },
  positioning:
    "I build the internal tools small teams run on — and automate the manual work around them.",
  description:
    "Full-stack developer building custom web applications, internal tools, and workflow automation for small teams in the US, UK, Canada, and Australia. Fixed-price engagements, React and Node.js.",
} as const;

export const nav: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  /* No "Contact" item: the header's "Contact us" button already points at
     #contact, and two links to the same anchor is a dead choice for the
     visitor. The footer builds its column from this same array. */
];

export const hero = {
  headline: "Custom software that removes the manual work from your business.",
  subhead:
    "I build the dashboards, portals, and internal tools small teams currently run on spreadsheets and email — in React, Node.js, and MongoDB, deployed and handed over with the source code.",
  primaryCta: "Send message",
  secondaryCta: "See my portfolio",
  availability: "Currently taking on freelance projects — building my client portfolio",
} as const;

export const trustPoints: TrustPoint[] = [
  { label: "MERN stack" },
  { label: "JWT auth" },
  { label: "Docker & VPS deployment" },
  { label: "Replies within 24h" },
];

export const process: ProcessStep[] = [
  {
    title: "Call",
    description:
      "A free call. You describe the process that is costing you time; I ask the questions that decide what it takes to build. No slide deck, no pitch. If I am not the right person for it, I will tell you on that call.",
  },
  {
    title: "Fixed proposal",
    description:
      "Within 2-3 working days you get a written proposal: what gets built, what is explicitly out of scope, the delivery date, and one fixed price. Nothing in it changes unless you ask for a change and approve it in writing.",
  },
  {
    title: "Build & handover",
    description:
      "You see working software every week, not status reports. At the end you get the deployed application, the source code in your own repository, and a walkthrough of how to run it. The code is yours whether or not you keep working with me.",
  },
];

export const about = {
  heading: "Who you'd be working with",
  paragraphs: [
    "I'm Devendra. I'm a production developer at Quark Consulting in Indore, India, where I build and maintain multi-role web platforms that real businesses run their operations on — the kind with role-based dashboards, payment and accounting integrations, and support queues that cannot go down on a Monday morning.",
    "I hold an MCA, and I work almost entirely in the MERN stack: React on the front, Node and Express behind it, MongoDB underneath. The other half of my work is integrations — wiring an application into the CRM, accounting system, or messaging channel a business already uses, so nobody has to retype data between two tabs.",
    "I'm opening up freelance capacity alongside that work, taking on a small number of projects where I can give real attention rather than juggling too many at once.",
  ],
  workingTogether: {
    heading: "How I work with clients",
    points: [
      {
        title: "Timezone",
        detail:
          "I'm in IST (UTC+5:30). My afternoons overlap with US Eastern mornings and cover the full UK and EU working day. Calls get scheduled inside your working hours, not mine.",
      },
      {
        title: "Communication",
        detail:
          "A written update every Friday with what shipped, what is next, and anything blocking. Email or Slack for everything else, answered within 24 hours on working days. You never have to ask where the project stands.",
      },
      {
        title: "Fixed price, not hourly",
        detail:
          "Every engagement is quoted as a fixed price against a written scope. You know the total before work starts, and a slow week is my problem to solve rather than a line on your invoice.",
      },
    ],
  },
} as const;

export const finalCta = {
  heading: "Tell me what's costing you time.",
  subhead:
    "Send a message using the form and you'll get a straight answer about whether this is worth building, roughly what it would cost, and how long it would take.",
} as const;
