/**
 * Case studies. Each entry statically generates a page at /work/[slug].
 *
 * `confidential: true` means the work is under NDA: the UI hides any live link
 * and shows a "Client project — details anonymised" note instead. Describe the
 * system and the engineering, never the client. Nothing currently uses the flag
 * — it is kept because the first client project that needs it will.
 *
 * Images live in /public/work/. If a file is missing at build time the UI falls
 * back to a neutral frame rather than breaking the layout — see src/lib/assets.ts.
 *
 * Everything in here must be true and checkable. A prospective client can open
 * the live link and the repo, so an inflated claim is not a marketing risk, it
 * is a provable one.
 */

export type CaseStudyImage = {
  /** Path under /public, e.g. "/work/slotly/landing-dark.png". */
  src: string;
  /** Descriptive alt text. Required — this is an accessibility and SEO surface. */
  alt: string;
  width: number;
  height: number;
  /**
   * Cap the rendered width, in pixels, instead of filling the frame. Set this
   * for narrow captures — a chat widget or a mobile view — which would
   * otherwise be upscaled to the full column width and look soft next to the
   * full-width desktop shots. Usually the file's own width.
   */
  maxDisplayWidth?: number;
  /** Shown beneath the image on the case study page. */
  caption?: string;
};

export type CaseStudySection = {
  heading: string;
  /** Each string is one paragraph. */
  body: string[];
};

/**
 * Filter categories for the portfolio tabs. These deliberately mirror the
 * services offered, so a visitor who arrives via "Workflow Automation" can
 * immediately see the work that backs it.
 *
 * Add a new member only when a real project earns it. The tab strip is built
 * from the studies themselves, so an unused category simply never renders.
 */
export const CASE_STUDY_CATEGORIES = [
  "Web Development",
  "Automation & AI",
  "Integrations",
] as const;

export type CaseStudyCategory = (typeof CASE_STUDY_CATEGORIES)[number];

export type CaseStudy = {
  slug: string;
  title: string;
  /** One line, used on the home page card and as the meta description seed. */
  problem: string;
  /** Short label for the client, anonymised where required. */
  clientContext: string;
  confidential: boolean;
  /** Year or range the work was delivered. */
  period: string;
  /** Live product URL. Ignored when `confidential` is true. */
  liveUrl?: string;
  /** Public source repository. Ignored when `confidential` is true. */
  repoUrl?: string;
  /**
   * Capability tags, used to build the filter tabs on the home page. A study
   * may carry several. Only categories that actually appear on a study get a
   * tab — an empty tab is worse than no tab, so do not invent one here hoping
   * to fill it later.
   */
  categories: CaseStudyCategory[];
  tech: string[];
  /** Headline outcomes, rendered as a mono metric row. */
  outcomes: { metric: string; label: string }[];
  cover: CaseStudyImage;
  screenshots: CaseStudyImage[];
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "slotly-ai-booking-assistant",
    // Colon, not an em-dash: the metadata template already appends
    // "— Devendra Choudhary", and two em-dashes in one <title> reads badly.
    title: "Slotly: AI Booking Assistant",
    problem:
      "Booking forms make patients guess at a time; Slotly lets them just ask, then checks the calendar before it promises anything.",
    clientContext: "Self-built product — live demo and source are public",
    confidential: false,
    period: "2026",
    liveUrl: "https://slotly-xi.vercel.app/",
    repoUrl: "https://github.com/1devchoudhary/slotly",
    // Full-stack product plus an LLM driving real writes to the database.
    // Deliberately NOT tagged "Integrations": it talks to the Gemini API, but
    // it does not wire up a client's CRM, accounting, or calendar tooling,
    // which is what that category promises on the services side.
    categories: ["Web Development", "Automation & AI"],
    tech: [
      "React 19",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Google Gemini",
      "Express",
      "Mongoose",
      "Zod",
      "TanStack Query",
      "Tailwind CSS v4",
      "JWT",
      "bcrypt",
      "Vite 7",
      "Vercel",
    ],
    outcomes: [
      { metric: "54", label: "Automated tests" },
      { metric: "2", label: "Ways to book — chat or form" },
      { metric: "RBAC", label: "Role-scoped staff access" },
    ],
    cover: {
      src: "/work/slotly/landing-dark.png",
      alt: "Slotly's landing page in dark mode. The headline reads 'Booking that answers back' beside a chat panel for the booking assistant, with a badge noting it is powered by Google Gemini.",
      width: 1532,
      height: 773,
    },
    screenshots: [
      {
        src: "/work/slotly/HowItWork-dark.png",
        alt: "Slotly's 'How it works' section, showing three numbered steps: ask in plain English, the engine finds real slots, then the booking is confirmed and the calendar updates.",
        width: 1522,
        height: 758,
        caption:
          "The product's own explanation of the split the whole build rests on. Step two is the important one: working hours, buffers, existing bookings and time-off are what decide availability — not the assistant.",
      },
      {
        src: "/work/slotly/chat-in-action-dark.png",
        alt: "The Slotly booking assistant widget, headed 'Online · powered by Gemini'. A visitor has asked what services are offered and the assistant has replied with the clinic's five services, each with its duration and price.",
        width: 371,
        height: 500,
        // A 371px-wide capture of the floating widget. Rendered 1:1 rather than
        // stretched across the column, which would upscale it roughly 2x.
        maxDisplayWidth: 371,
        caption:
          "The assistant answering in the widget. The services, durations and prices it quotes are read from the database rather than written into the prompt — which is why they match what the booking flow will actually let you reserve.",
      },
      {
        src: "/work/slotly/service-light.png",
        alt: "Slotly's services section in light mode, listing four dental services as cards with a starting price and appointment duration on each.",
        width: 1536,
        height: 768,
        caption:
          "The marketing side of the same application, in light mode. Every surface is themed from one set of Tailwind tokens, so light and dark are the same components rather than two stylesheets kept in sync by hand.",
      },
      {
        src: "/work/slotly/booking-light.png",
        alt: "Slotly's four-step booking wizard in light mode, on step three, showing a two-week strip of selectable dates and a summary panel for a 45-minute cavity filling with Dr Emily Chen.",
        width: 1432,
        height: 776,
        caption:
          "The conventional path, for people who would rather click than type. Step three lists only genuinely open slots — the day shown has none, and says so instead of offering a time that would fail on submit.",
      },
      {
        src: "/work/slotly/dashboard-dark.png",
        alt: "Slotly's staff dashboard in dark mode showing today's bookings, utilisation, revenue and the share of bookings made by the assistant, above a weekly capacity chart and per-practitioner utilisation bars.",
        width: 1532,
        height: 773,
        caption:
          "The staff view. Every figure here is computed server-side from the appointment records — though the numbers in this screenshot come from the demo seed, not a real practice.",
      },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "A booking form asks the customer to do the clinic's thinking. Pick a service, pick a practitioner, pick a date, discover nothing is free, go back, try again. Every one of those steps is a place to give up, and the ones who give up at half past nine in the evening never appear in any report — the practice simply never learns the enquiry happened.",
          "What people actually want to do is ask. \"Any chance of a cleaning with Dr Chen next week, ideally after four?\" That single sentence contains a service, a practitioner, a date range and a time constraint, and a form makes you disassemble it into four separate widgets.",
          "I built Slotly to see whether a language model could take that sentence and still produce a booking you can trust — which is the hard part, because the failure mode of a chatty booking bot is that it cheerfully confirms an appointment that does not exist.",
        ],
      },
      {
        heading: "The approach: the model talks, the database decides",
        body: [
          "The rule the whole system is built around is that the assistant is allowed to interpret, but never to decide. It does not know what is free and it is not asked to. Availability comes out of the slot engine, which reads working hours, appointment buffers, minimum lead time and staff time-off from the database, and returns the set of times that genuinely exist.",
          "The assistant's only route to a booking is a `create_booking` tool — a validated call into the same API the web form uses. If it asks for a slot that has since been taken, the call fails and the conversation offers alternatives. There is no path where a confident sentence from the model becomes an appointment that the calendar does not agree with, because the sentence is never what creates the appointment.",
          "That constraint is also what makes the feature honest to sell. The worst case is a patient being told to ring the practice, rather than turning up for an appointment nobody has.",
          "Bookings made through the assistant are written with `source: 'assistant'`, separate from form submissions. Without that you cannot answer the only question that decides whether the feature is worth keeping: is anyone actually using it?",
        ],
      },
      {
        heading: "What was built",
        body: [
          "A monorepo in three parts: a React 19 client built with Vite 7, Tailwind CSS v4 and TanStack Query; an Express API using Mongoose and Zod, with `@google/genai` driving the assistant; and MongoDB underneath. Client and API deploy as a single Vercel project, with the Express app running as a serverless function — one origin, so there is no CORS layer to get wrong.",
          "Two ways to book, sharing one source of truth. The four-step wizard is for people who prefer to click; the chat assistant is for people who would rather just say what they want. Both go through the same validation and the same conflict checks, so neither can produce a booking the other would consider impossible.",
          "The staff side is a real application rather than a list view. Login verifies a bcrypt hash and issues a seven-day JWT, rate-limited to five attempts a minute. Role-based access gates the admin endpoints, and staff are scoped to their own appointments — enforced server-side, so a staff account cannot read a colleague's diary by changing an ID in the URL. A 401 clears the session and returns you to login rather than leaving a half-authenticated page on screen.",
          "Dashboard metrics — today's bookings, utilisation, revenue, seven-day trend, per-practitioner load, and the split between assistant and form bookings — are computed on the server from the appointment records. The client renders numbers; it never derives them, so two people looking at the same dashboard cannot see different figures.",
        ],
      },
      {
        heading: "Testing, and keeping a public demo alive",
        body: [
          "54 tests, aimed at the parts where being wrong is expensive. The slot engine is tested against working hours, buffers, lead time and time-off. The utilisation maths is tested as pure functions, including the interval-overlap cases that are easy to get subtly wrong and hard to notice. The admin surface is tested over the real HTTP stack against an in-memory MongoDB — login, authorisation, and the demo-reset endpoint included.",
          "A public demo also has a problem no client project has: visitors change the data. Left alone for a week, the calendar fills with test bookings and cancellations and stops demonstrating anything. So a nightly Vercel cron drops and reseeds the demo at 04:00 UTC. That endpoint requires demo mode to be switched on and does a constant-time comparison against a secret, so finding the URL is not enough to trigger it.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "Slotly is live and the source is public, so both claims on this page can be checked rather than taken on trust. Sign in to the staff dashboard with the demo credentials in the repo's README and everything described above is there to poke at.",
          "It is a product I built to demonstrate an approach, not a system a dental practice currently runs on — the figures on the dashboard are seeded demo data, and I would rather say so than let a screenshot imply a customer base I do not have.",
          "The part that transfers to client work is the constraint, not the chat window. When an AI feature sits in front of real business data, keeping every hard rule in the database and treating the model as an interface layer is what makes the result safe to put in front of customers. That is the pattern I reach for whenever a project puts an assistant near something that matters.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
