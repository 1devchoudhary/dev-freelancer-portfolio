/**
 * FAQ accordion content. These answer real buying objections — keep them
 * specific and honest. Vague answers here cost more trust than no answer.
 */

export type Faq = {
  question: string;
  /** Each string is one paragraph. */
  answer: string[];
};

export const faqs: Faq[] = [
  {
    question: "How long does a project take?",
    answer: [
      "Most automation work is one to two weeks. A first version of a custom application — enough to put in front of real users — is typically three to six weeks. Larger multi-role platforms run longer, and I will say so before you commit rather than after.",
      "Whatever the number is, it goes in the proposal as a date. If something threatens that date, you hear about it in the Friday update while there is still time to do something about it, not on the deadline.",
    ],
  },
  {
    question: "How does payment work?",
    answer: [
      "Fixed price, quoted against a written scope, split into milestones. Typically 40% to start, 30% at an agreed midpoint, and 30% on handover. Retainers are billed monthly in advance.",
      "There is no hourly rate and no metered billing. If the work takes me longer than I estimated, that is my problem — the price you approved is the price you pay. The only thing that changes it is you asking for something outside the agreed scope, and that gets quoted and approved in writing before I build it.",
      "I invoice in USD and accept international bank transfer, Wise, and PayPal.",
    ],
  },
  {
    question: "What if I'm in a different timezone?",
    answer: [
      "I'm in India (IST, UTC+5:30) and I plan my day around clients who are not. My afternoons overlap with US Eastern mornings — roughly four hours of real-time overlap — and cover the entire UK and EU working day. For Australian clients the overlap is the reverse: my mornings, your afternoons.",
      "In practice this means calls happen inside your working hours, and work you send at the end of your day is often waiting for you when you start the next one. Every message gets a reply within 24 hours on working days, and you get a written update every Friday whether or not you have asked for one.",
    ],
  },
  {
    question: "What happens after launch?",
    answer: [
      "Every project includes 30 days of support after handover. If something I built is broken in that window, I fix it — that is not a paid change request, it is finishing the job.",
      "After that you can take the Care Plan for ongoing maintenance and small features, come back for individual pieces of work as you need them, or take the code and run it yourself. You get the source in your own repository along with the documentation to deploy it, so the third option is genuinely available. I would rather you stay because the work is good than because you are locked in.",
    ],
  },
  {
    question: "Do you sign an NDA?",
    answer: [
      "Yes, routinely, and I will sign yours before the first call if you would prefer to discuss specifics under it.",
      "The standard you can expect is this: I will talk about what I built and how, and not about who for, unless you tell me otherwise in writing. Client work stays off this site — or goes on it described by its engineering, with the client unnamed — whichever you are comfortable with.",
    ],
  },
  {
    question: "Can you work with my existing developer?",
    answer: [
      "Yes, and it is often the right way to do it. I have worked as the additional pair of hands on a team's own codebase, as the integrations specialist alongside an in-house developer, and as the person who builds one self-contained piece that plugs into a system somebody else maintains.",
      "What I will ask for is clarity on who owns which decisions and a code review path, so we are not quietly overwriting each other. I write to your existing conventions rather than importing my own, and I would rather match a pattern I would not have picked than leave your codebase with two of everything.",
    ],
  },
];
