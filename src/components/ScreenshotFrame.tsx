import Image from "next/image";

import type { CaseStudyImage } from "@/content/caseStudies";
import { publicAssetExists } from "@/lib/assets";

type ScreenshotFrameProps = {
  image: CaseStudyImage;
  sizes: string;
  eager?: boolean;
  className?: string;
};

/**
 * A product screenshot in a browser-style frame.
 *
 * When the image file is not yet in /public the frame renders an empty chrome
 * placeholder at the same aspect ratio. That is a deliberate choice: an
 * invented screenshot would misrepresent the work, and a broken image would
 * undermine the thing this page is trying to establish. Add the real capture
 * at the declared dimensions and it appears with no code change.
 */
export function ScreenshotFrame({
  image,
  sizes,
  eager = false,
  className = "",
}: ScreenshotFrameProps) {
  const hasImage = publicAssetExists(image.src);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>

      {hasImage ? (
        <div
          // Narrow captures (a chat widget, a mobile view) would be blown up to
          // the full frame width and go soft. Capping the display width at the
          // file's own width keeps them at 1:1 and centres them instead.
          style={
            image.maxDisplayWidth
              ? { maxWidth: image.maxDisplayWidth, marginInline: "auto" }
              : undefined
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className="h-auto w-full"
          />
        </div>
      ) : (
        <div
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
          className="flex w-full items-center justify-center bg-ground"
        >
          <span className="label px-6 text-center text-ink-soft">
            Screenshot to follow
          </span>
        </div>
      )}
    </div>
  );
}
