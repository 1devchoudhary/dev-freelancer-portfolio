"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to stagger this element behind its siblings. */
  delay?: number;
  className?: string;
  /** Render as a list item instead of a div, so lists stay valid. */
  as?: "div" | "li";
};

/**
 * Fade-and-rise on scroll entry. Once only, ~400ms, no parallax, no loops.
 *
 * Children are passed through from Server Components and stay server-rendered —
 * only the wrapper is client-side. When the user prefers reduced motion we skip
 * Motion entirely rather than animating to a shorter duration.
 *
 * Without JavaScript the initial `opacity: 0` would hide the content, so the
 * root layout ships a <noscript> rule that neutralises `[data-reveal]`.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  if (prefersReducedMotion) {
    return as === "li" ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
