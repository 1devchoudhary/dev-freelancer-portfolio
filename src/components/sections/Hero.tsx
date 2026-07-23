"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { BlobStage } from "@/components/three/BlobStage";
import { hero, site, trustPoints } from "@/content/site";

/**
 * Full-screen hero. The 3D cluster fills the section behind the copy, with a
 * radial scrim between them — without it the gloss sits directly under the
 * headline and neither reads.
 */

const HEADLINE_ACCENT_FROM = 2; // "Custom Software | & Automation"
const HEADLINE = "Custom Software & Automation";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The backdrop drifts slower than the page, and clears before the next
  // section arrives so nothing bleeds through.
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const stageFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "48%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const words = HEADLINE.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[68px] flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 md:pb-28 md:pt-36"
    >
      {/* --- Backdrop --- */}
      <motion.div
        aria-hidden="true"
        style={
          reduced ? undefined : { y: stageY, scale: stageScale, opacity: stageFade }
        }
        className="pointer-events-none absolute inset-0 z-0"
      >
        <BlobStage />
      </motion.div>

      {/* Scrim: darkens the middle of the frame where the type sits, and fades
          the shapes into the page edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 58% 44% at 50% 50%, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.22) 82%, transparent 100%)",
        }}
      />
      {/* A second, tighter pass directly behind the type block. The wide scrim
          above keeps the shapes visible at the edges; this one guarantees the
          copy itself always has a dark ground under it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 42% 26% at 50% 50%, rgba(0,0,0,0.72) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #000 92%)",
        }}
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-[2] opacity-50" />

      {/* --- Copy --- */}
      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyFade }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.p
          className="label flex items-center gap-3 text-ink-soft"
          initial={reduced ? false : { opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.28em" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {site.jobTitle.split(" ")[0]}{" "}
          <span className="text-gradient" aria-hidden="true">
            ✦
          </span>{" "}
          Engineering
        </motion.p>

        <h1 className="mt-7 max-w-[16ch] text-[clamp(2.9rem,8.2vw,6.6rem)] font-bold leading-[0.98] tracking-[-0.045em]">
          {words.map((word, i) => (
            /* The trailing space is a real text node, not CSS padding: the
               words live in separate overflow-hidden spans, so without it the
               accessible name and the indexed text both collapse to
               "CustomSoftware&Automation". */
            <span key={i}>
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${
                    i >= HEADLINE_ACCENT_FROM ? "text-gradient" : ""
                  }`}
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.05,
                    delay: 0.2 + i * 0.085,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <Fade delay={0.75}>
          <p className="mt-6 max-w-[40rem] text-[1.04rem] leading-[1.72] text-ink-soft">
            {hero.subhead}
          </p>
        </Fade>

        <Fade delay={0.87}>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            {/* Points at the on-page form rather than the external booking
                link — one fewer tab, and no calendar to negotiate before the
                visitor can say anything. */}
            <a href="#contact" className="btn-primary group">
              {hero.primaryCta}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a href="#services" className="btn-ghost">
              Explore services
            </a>
          </div>
        </Fade>

        <Fade delay={0.98}>
          <p className="mt-7 flex items-center justify-center gap-2.5 text-sm text-ink-soft">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-accent-bright"
            />
            {hero.availability}
          </p>
        </Fade>
      </motion.div>

      {/* --- Trust strip, pinned to the bottom of the viewport --- */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-line bg-black/40 backdrop-blur-sm">
        <div className="container-content py-4">
          <ul className="label flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-ink-soft">
            {trustPoints.map((point, index) => (
              <li key={point.label} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-line">
                    ·
                  </span>
                )}
                {point.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Entry fade used for the copy below the headline. */
function Fade({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
