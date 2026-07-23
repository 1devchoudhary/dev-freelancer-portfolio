"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { nav, site } from "@/content/site";

/**
 * Fixed header that starts fully transparent over the hero and fades in a
 * blurred panel once the page moves. It is `fixed`, not `sticky`, so the hero
 * renders underneath it edge to edge — a sticky header would reserve its own
 * strip of layout and push the 3D stage down.
 *
 * No mobile drawer: the home page is a single scroll and the CTA is visible at
 * every width, so a hamburger would add state for no conversion gain.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 24px rather than 0 so a one-pixel scroll jitter cannot flicker the panel.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-line bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-content flex h-[68px] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-[0.98rem] font-semibold tracking-tight text-ink"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span aria-hidden="true" className="logo-mark" />
          <span className="hidden sm:inline">{site.name}</span>
          <span className="sr-only sm:hidden">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Points at the on-page contact section rather than the external
            booking link: the hero already carries "Book a free call",
            and a visitor who scrolled past it wants the form, not a new tab. */}
        <a
          href="#contact"
          className="shrink-0 rounded-full border border-line bg-white/5 px-[1.15rem] py-[0.55rem] text-[0.82rem] font-semibold text-ink transition-colors duration-300 hover:bg-white/12"
        >
          Contact us
        </a>
      </div>
    </header>
  );
}
