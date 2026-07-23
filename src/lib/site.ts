/**
 * Single source of truth for the site's canonical URL and owner identity.
 * Everything SEO-related (metadata, sitemap, robots, JSON-LD) reads from here.
 */

/**
 * Used only when nothing else resolves — i.e. a local build. This domain is
 * NOT registered yet; it is the intended home once there is a reason to buy it.
 * On Vercel the deployment URL is detected automatically, so this value never
 * reaches production.
 */
const FALLBACK_SITE_URL = "https://devendrachoudhary.dev";

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return stripTrailingSlash(explicit);
  }

  /*
   * Vercel sets this to the project's production domain — the shortest custom
   * domain, or the *.vercel.app one when there is no custom domain yet. It
   * carries no protocol, and it is populated on preview builds too, so shared
   * links and OG images always point at production rather than at a one-off
   * deployment URL.
   *
   * The practical effect: deploying without a custom domain still produces
   * correct canonical tags and working link previews, with nothing to
   * configure. Set NEXT_PUBLIC_SITE_URL to override once a domain exists.
   */
  const vercelDomain =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (vercelDomain) {
    return `https://${stripTrailingSlash(vercelDomain.trim())}`;
  }

  return FALLBACK_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}
