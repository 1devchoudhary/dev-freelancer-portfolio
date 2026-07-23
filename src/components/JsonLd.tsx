/**
 * Renders a JSON-LD payload as a native <script type="application/ld+json">.
 *
 * `<` is escaped to < so a stray "</script>" inside any content string
 * cannot break out of the tag. All content on this site is authored, but the
 * escape costs nothing and removes the failure mode entirely.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
