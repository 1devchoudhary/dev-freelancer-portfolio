import fs from "node:fs";
import path from "node:path";

/**
 * Checks at build time whether a file exists in /public.
 *
 * The site ships before every real photograph and product screenshot is in
 * place, and a missing file should degrade to a designed fallback rather than
 * a broken image. Server Components only — this touches the filesystem, and is
 * evaluated during static generation, so it costs nothing at runtime.
 *
 * @param publicPath Site-relative path, e.g. "/devendra.jpg".
 */
export function publicAssetExists(publicPath: string): boolean {
  // Reject anything that could escape /public before touching the filesystem.
  const normalized = path.posix.normalize(publicPath);
  if (!normalized.startsWith("/") || normalized.includes("..")) {
    return false;
  }

  try {
    const absolute = path.join(process.cwd(), "public", normalized);
    return fs.statSync(absolute).isFile();
  } catch {
    return false;
  }
}
