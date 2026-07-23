/**
 * Client testimonials.
 *
 * This array is intentionally EMPTY. The testimonials section does not render
 * at all while it is empty — no placeholder quotes, no "coming soon" card.
 * Add a real entry only when you have permission to publish the person's name
 * and role; an anonymous testimonial is worth less than no testimonial.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional company name, shown after the role. */
  company?: string;
};

export const testimonials: Testimonial[] = [];
