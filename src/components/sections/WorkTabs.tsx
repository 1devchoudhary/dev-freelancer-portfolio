"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { CaseStudyCategory } from "@/content/caseStudies";

const ALL = "All work";

export type WorkTabItem = {
  slug: string;
  categories: readonly CaseStudyCategory[];
  /**
   * The fully-rendered card, built on the server. It arrives as a ReactNode
   * rather than raw data so that ScreenshotFrame — which touches the
   * filesystem to detect missing images — never enters the client bundle.
   */
  card: ReactNode;
};

export function WorkTabs({
  items,
  categories,
}: {
  items: WorkTabItem[];
  /** Category order, already filtered to those a project actually uses. */
  categories: readonly CaseStudyCategory[];
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>(ALL);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /*
   * Tabs only earn their place when they can actually change what you see.
   * A lone category means every project matches it; a lone project means every
   * tab shows the same card. Either way the control is decorative, and a filter
   * that never filters reads as padding — so render nothing instead.
   */
  const tabs = useMemo(
    () =>
      categories.length > 1 && items.length > 1 ? [ALL, ...categories] : [],
    [categories, items.length]
  );

  const countFor = (tab: string) =>
    tab === ALL
      ? items.length
      : items.filter((item) =>
          item.categories.includes(tab as CaseStudyCategory)
        ).length;

  const visible =
    active === ALL
      ? items
      : items.filter((item) =>
          item.categories.includes(active as CaseStudyCategory)
        );

  /** Arrow-key roving focus, per the WAI-ARIA tabs pattern. */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + tabs.length) % tabs.length;
    setActive(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      {tabs.length > 0 && (
        <div
          role="tablist"
          aria-label="Filter projects by capability"
          className="mt-10 flex flex-wrap gap-2"
        >
          {tabs.map((tab, index) => {
            const selected = tab === active;
            return (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="work-panel"
                // Only the active tab is in the tab order; arrows move between
                // them once focus is inside the strip.
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  selected
                    ? "border-transparent text-black"
                    : "border-line text-ink-soft hover:border-ink-soft hover:text-ink"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="work-tab-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative">
                  {tab}
                  <span
                    className={`ml-1.5 tabular-nums ${
                      selected ? "text-black/50" : "text-ink-soft/60"
                    }`}
                  >
                    {countFor(tab)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <ul
        id="work-panel"
        role="tabpanel"
        aria-live="polite"
        className="mt-10 flex flex-col gap-6"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink-soft md:p-8"
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
