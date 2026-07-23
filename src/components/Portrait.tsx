import Image from "next/image";

import { site } from "@/content/site";
import { publicAssetExists } from "@/lib/assets";

/**
 * Candidates for the portrait, in preference order. Photos arrive from a phone
 * or a designer with whatever extension they happen to have, and a silent
 * fallback to the monogram because the file said `.jpeg` rather than `.jpg` is
 * a bug that looks exactly like "no photo yet".
 */
const PHOTO_CANDIDATES = [
  "/devendra.jpg",
  "/devendra.jpeg",
  "/devendra.png",
  "/devendra.webp",
];

type PortraitProps = {
  /** Frame width. With `height`, sets the aspect ratio the photo is cropped to. */
  width: number;
  height: number;
  /** Sizes hint — the hero and About use different column widths. */
  sizes: string;
  className?: string;
};

/**
 * Devendra's photo in a soft-bordered frame.
 *
 * The frame is a fixed `width / height` box and the photo is cropped to fill it
 * with `object-cover`. That decouples the layout from whatever the source image
 * happens to measure: a 4:5 portrait and a 6:5 snapshot both render as the same
 * shape, and the reserved space is correct before the file loads either way —
 * so there is no shift. It also means the monogram fallback and the real photo
 * occupy identical space.
 *
 * If no candidate file exists at build time the monogram renders instead.
 */
export function Portrait({
  width,
  height,
  sizes,
  className = "",
}: PortraitProps) {
  const photo = PHOTO_CANDIDATES.find(publicAssetExists);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface p-2 ${className}`}
    >
      <div
        style={{ aspectRatio: `${width} / ${height}` }}
        className="relative w-full overflow-hidden rounded-lg"
      >
        {photo ? (
          <Image
            src={photo}
            alt={`${site.name}, ${site.jobTitle.toLowerCase()}, based in ${site.location.city}, ${site.location.country}`}
            fill
            sizes={sizes}
            // Only rendered in About, well below the fold — lazy is correct.
            loading="lazy"
            // Bias the crop above centre. The current photo is wider than the
            // frame, so only its sides are trimmed and this has no effect; it
            // matters if a future portrait is taller than the frame, where a
            // centred crop would take the top of the head off.
            className="object-cover object-[50%_35%]"
          />
        ) : (
          <Monogram />
        )}
      </div>
    </div>
  );
}

/**
 * Fallback shown when no photograph is present. Fills the frame set by the
 * parent, so it reserves exactly the space the image would.
 */
function Monogram() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-band text-center">
      <span
        aria-hidden="true"
        className="text-4xl font-semibold text-white"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        DC<span className="text-accent">.</span>
      </span>
      <span className="label px-6 text-on-ink-soft">{site.name}</span>
    </div>
  );
}
