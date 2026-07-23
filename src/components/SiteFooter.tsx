import Link from "next/link";

import { nav, site } from "@/content/site";

const year = new Date().getFullYear();

const socials = [
  { label: "GitHub", href: site.social.github, external: true },
  { label: "LinkedIn", href: site.social.linkedin, external: true },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-band">
      {/* A single violet bloom bleeding up from the base, echoing the hero
          without paying for a second WebGL context. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(139,92,246,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container-content relative">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:py-20">
          <div>
            <p
              className="flex items-center gap-2.5 text-base font-semibold text-ink"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span aria-hidden="true" className="logo-mark" />
              {site.name}
            </p>
            <p className="mt-4 measure text-sm leading-relaxed text-ink-soft">
              {site.positioning}
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              {site.location.city}, {site.location.country} · Working with
              clients in the US, UK, Canada, and Australia
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-sm text-accent-deep transition-colors hover:text-accent-deeper"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <p className="label text-ink-soft">Explore</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <p className="label text-ink-soft">Elsewhere</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Send message
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ink-soft">
            © {year} {site.name}
          </p>
          <p className="label text-ink-soft">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
