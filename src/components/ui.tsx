import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Shared primitives. Deliberately small — the design system lives in
   globals.css, and these only encode the combinations used repeatedly.
--------------------------------------------------------------------------- */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-150";

/*
 * `text-ink` is a LIGHT colour on this theme, so any variant with a white or
 * near-white fill must name its foreground explicitly as black — inheriting
 * `text-ink` there would be light-on-light.
 */
const buttonVariants = {
  primary: "bg-white text-black hover:bg-white/88",
  secondary: "border border-line bg-white/5 text-ink hover:border-ink-soft",
  onInk: "bg-white text-black hover:bg-white/88",
  onInkGhost:
    "border border-on-ink-field text-on-ink hover:border-on-ink-soft hover:text-white",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/**
 * A link styled as a button. External hrefs get `rel="noopener noreferrer"`
 * and open in a new tab; internal ones route through next/link.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonLinkProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Monospace, letter-spaced eyebrow that opens most sections. */
export function Eyebrow({
  children,
  onInk = false,
}: {
  children: ReactNode;
  onInk?: boolean;
}) {
  return (
    <p className={`label ${onInk ? "text-on-ink-soft" : "text-accent-deep"}`}>
      {children}
    </p>
  );
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Dark band treatment — inverts text colours and enables `.on-ink` focus rings. */
  tone?: "ground" | "surface" | "ink";
  className?: string;
  /** Rendered as <section aria-labelledby> target by the caller's heading. */
  labelledBy?: string;
};

export function Section({
  children,
  id,
  tone = "ground",
  className = "",
  labelledBy,
}: SectionProps) {
  // `bg-ink` would now be a *light* fill — recessed panels use `bg-band`.
  const toneClasses = {
    ground: "bg-ground text-ink",
    surface: "bg-surface text-ink border-y border-line",
    ink: "bg-band text-on-ink on-ink border-y border-line",
  }[tone];

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClasses} py-20 md:py-28 ${className}`}
    >
      <div className="container-content">{children}</div>
    </section>
  );
}
