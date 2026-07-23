"use client";

/**
 * Iridescent 3D blobs — the hero's full-bleed backdrop.
 *
 * The cluster is spread toward the edges of the frame and pushed back in z so
 * the centre stays clear for the headline. Motion is deliberately slow and
 * ambient: this is a background, not a demo reel.
 *
 * Perf: the canvas stops rendering when the hero scrolls away, dpr is capped
 * at 1.5, and antialiasing is off (the shapes are soft-edged anyway).
 */

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Frame-rate-independent easing. A raw `x += (target - x) * k` moves faster on
 * a 144Hz display than a 60Hz one; this normalises k against real elapsed time
 * so the motion feels identical everywhere.
 */
function damp(current: number, target: number, lambda: number, delta: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * delta));
}

type BlobSpec = {
  position: [number, number, number];
  scale: number;
  color: string;
  /** Distortion amount — higher is more liquid. */
  distort: number;
  /** Seconds per drift cycle; primes keep the cluster from re-syncing. */
  period: number;
  /** Fixed starting offset, authored rather than randomised so the opening
      frame is identical on every load. */
  phase: number;
  /** How far this blob drifts, in world units. */
  travel: number;
};

/**
 * Positions form a ring around the centre of frame. Nothing sits near [0,0],
 * which is where the headline lands.
 */
const BLOBS: BlobSpec[] = [
  { position: [-4.3, 1.5, -1], scale: 1.5, color: "#7C3AED", distort: 0.34, period: 23, phase: 0, travel: 0.4 },
  { position: [4.1, 1.9, -1.8], scale: 1.25, color: "#22D3EE", distort: 0.4, period: 29, phase: 1.9, travel: 0.34 },
  { position: [3.5, -1.9, -0.6], scale: 1.65, color: "#A855F7", distort: 0.3, period: 31, phase: 3.4, travel: 0.46 },
  { position: [-3.6, -2.1, -1.4], scale: 1.15, color: "#EC4899", distort: 0.44, period: 37, phase: 4.8, travel: 0.3 },
  { position: [-0.6, 3.1, -3.2], scale: 1.0, color: "#38BDF8", distort: 0.46, period: 41, phase: 2.6, travel: 0.38 },
  { position: [1.2, -3.3, -2.6], scale: 0.9, color: "#8B5CF6", distort: 0.5, period: 43, phase: 5.5, travel: 0.32 },
];

function Blob({
  position,
  scale,
  color,
  distort,
  period,
  phase,
  travel,
}: BlobSpec) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const w = (Math.PI * 2) / period;
    ref.current.position.y = position[1] + Math.sin(t * w + phase) * travel;
    ref.current.position.x =
      position[0] + Math.cos(t * w * 0.66 + phase) * travel * 0.6;
    ref.current.rotation.y = t * 0.07;
    ref.current.rotation.z = Math.sin(t * w * 0.5 + phase) * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {/* 64 segments rather than 96: at this distance the silhouette is
          identical and it costs a third fewer vertices per blob. */}
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={0.7}
        roughness={0.06}
        metalness={0.32}
        iridescence={1}
        iridescenceIOR={1.6}
        iridescenceThicknessRange={[100, 780]}
        clearcoat={1}
        clearcoatRoughness={0.12}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

/** Eases the whole cluster toward the pointer. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    // Clamp delta so a backgrounded tab returning does not snap the rig.
    const d = Math.min(delta, 0.1);
    ref.current.rotation.y = damp(ref.current.rotation.y, pointer.x * 0.12, 1.6, d);
    ref.current.rotation.x = damp(ref.current.rotation.x, -pointer.y * 0.09, 1.6, d);
    ref.current.position.x = damp(ref.current.position.x, pointer.x * 0.3, 1.2, d);
    ref.current.position.y = damp(ref.current.position.y, pointer.y * 0.22, 1.2, d);
  });

  return <group ref={ref}>{children}</group>;
}

export default function BlobCluster({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={1.4} color="#22D3EE" />
      <pointLight position={[0, -3, 2]} intensity={14} color="#EC4899" distance={16} />

      <ParallaxRig>
        {BLOBS.map((blob, i) => (
          <Blob key={i} {...blob} />
        ))}
      </ParallaxRig>

      {/* Hand-built environment rather than a preset: drei's presets fetch an
          HDRI from a CDN, which is a network dependency the hero should not
          have. Lightformers give the same glossy highlights, locally. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={5}
          color="#ffffff"
          position={[0, 5, 3]}
          scale={[10, 5, 1]}
          rotation={[-Math.PI / 2.4, 0, 0]}
        />
        <Lightformer
          form="circle"
          intensity={4}
          color="#22D3EE"
          position={[-7, 1, 2]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          form="circle"
          intensity={4}
          color="#EC4899"
          position={[7, -1, 2]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#8B5CF6"
          position={[0, -5, -2]}
          scale={[10, 5, 1]}
        />
      </Environment>
    </Canvas>
  );
}
