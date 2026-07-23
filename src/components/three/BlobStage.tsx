"use client";

/**
 * Gate + mount point for the 3D cluster.
 *
 * The canvas loads only when it is worth loading: WebGL available, a real
 * pointing device, a wide enough viewport, and motion not suppressed at the OS
 * level. Everything else gets a gradient occupying the same box, so the layout
 * is identical and nothing shifts when the scene swaps in.
 *
 * The gate re-evaluates on resize — a desktop window dragged narrow must fall
 * back rather than keep a canvas running at phone width.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BlobCluster = dynamic(() => import("./BlobCluster"), { ssr: false });

/**
 * Fallback art. Written inline rather than as a CSS utility class so it cannot
 * silently fail to compile — if this box ever renders empty, it is a real bug,
 * not a missing stylesheet.
 */
const FALLBACK_BACKGROUND = [
  "radial-gradient(circle at 18% 26%, #7C3AED 0%, transparent 42%)",
  "radial-gradient(circle at 82% 30%, #22D3EE 0%, transparent 38%)",
  "radial-gradient(circle at 76% 72%, #A855F7 0%, transparent 40%)",
  "radial-gradient(circle at 24% 76%, #EC4899 0%, transparent 36%)",
].join(", ");

export function BlobStage({ className = "" }: { className?: string }) {
  const [show3D, setShow3D] = useState(false);
  const [inView, setInView] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const hasWebGL = !!(
      probe.getContext("webgl2") || probe.getContext("webgl")
    );

    /*
     * Deliberately NOT gated on pointer type. The obvious query,
     * `(pointer: fine)`, describes only the PRIMARY input device — a Windows
     * laptop with a touchscreen reports it as coarse even with a mouse
     * attached, which sent capable desktops to the 2D fallback. `any-pointer`
     * has the same problem under Chrome's touch emulation.
     *
     * Pointer type was always a proxy for "is this machine big and powerful
     * enough". Viewport width answers that directly, and core count catches
     * the low-end devices that a width check alone would let through.
     */
    const cores = navigator.hardwareConcurrency ?? 4;
    const enoughCores = cores >= 4;

    const evaluate = () => {
      const wideEnough = window.innerWidth >= 1024;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setShow3D(hasWebGL && enoughCores && wideEnough && !reduced);
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  // Stop rendering frames once the hero scrolls away.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    // Sizing lives here rather than in a stylesheet: the canvas has no
    // intrinsic dimensions, so if this box ever collapses the scene silently
    // renders into a few pixels instead of erroring.
    <div
      ref={hostRef}
      data-stage={show3D ? "3d" : "fallback"}
      className={`h-full w-full ${className}`}
    >
      {show3D ? (
        <BlobCluster paused={!inView} />
      ) : (
        <div
          aria-hidden="true"
          className="blob-fallback"
          style={{
            width: "100%",
            height: "100%",
            filter: "blur(72px)",
            opacity: 0.62,
            background: FALLBACK_BACKGROUND,
          }}
        />
      )}
    </div>
  );
}
