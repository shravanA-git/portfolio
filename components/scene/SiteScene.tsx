"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 5200;
const SPINE_LENGTH = 52;
const AMBIENT_RADIUS = 8;
const TRAVEL_RANGE = 42;

const HELIX_RADIUS = 1.5;
const HELIX_PITCH = 4;       // vertical units per full revolution
const Z_SCALE = 0.65;
const Z_OFFSET = -1.5;

const STRAND_PARTICLES = 1000;  // per strand
const BASE_PAIR_COUNT = 65;     // rungs connecting the two strands
const BASE_PAIR_PTS = 7;        // particles per rung

// ── Shader material ──────────────────────────────────────────────────────────
const ParticleFieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uPixelRatio: 1,
    uColor: new THREE.Color("#4d8dff"),
    uMouse: new THREE.Vector2(0, 0),
  },
  /* glsl */ `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform vec2  uMouse;

    attribute float aScale;
    attribute float aSeed;

    varying float vAlpha;
    varying float vMouseDist;

    void main() {
      vec3 pos = position;

      // Subtle organic drift
      float drift = uTime * 0.05;
      pos.x += sin(drift + aSeed * 6.2831) * 0.18;
      pos.y += cos(drift * 0.8 + aSeed * 6.2831) * 0.10;
      pos.z += sin(drift * 0.6 + aSeed * 12.566) * 0.12;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Mouse interaction — very subtle displacement
      vec2 screenPos = gl_Position.xy / gl_Position.w;
      float distToMouse = length(screenPos - uMouse);
      vMouseDist = distToMouse;

      float repulsion = smoothstep(0.38, 0.0, distToMouse) * 0.18;
      vec2 repelDir = normalize(screenPos - uMouse + vec2(0.0001));
      gl_Position.xy += repelDir * repulsion * gl_Position.w;

      float pulse = 0.7 + 0.3 * sin(uTime * 0.6 + aSeed * 6.2831);
      // Particles glow slightly larger near cursor
      float sizeBoost = 1.0 + smoothstep(0.32, 0.0, distToMouse) * 0.55;
      gl_PointSize = aScale * uPixelRatio * pulse * sizeBoost * (20.0 / -mvPosition.z);

      vAlpha = pulse;
    }
  `,
  /* glsl */ `
    uniform vec3 uColor;
    varying float vAlpha;
    varying float vMouseDist;

    void main() {
      vec2 uv = gl_PointCoord.xy - 0.5;
      float dist = length(uv);
      float circle = smoothstep(0.5, 0.0, dist);

      if (circle <= 0.001) discard;

      // Base color: warm core blending to accent blue at the ring
      vec3 core = mix(vec3(1.0), uColor, 0.3);
      vec3 ring = mix(vec3(1.0), uColor, 0.75);
      vec3 color = mix(core, ring, smoothstep(0.0, 0.45, dist));

      // Color bloom near cursor — shift toward bright blue-white
      float mouseInfluence = smoothstep(0.42, 0.0, vMouseDist);
      vec3 bloomColor = vec3(0.78, 0.92, 1.0); // icy blue-white
      color = mix(color, bloomColor, mouseInfluence * 0.82);

      gl_FragColor = vec4(color, circle * vAlpha);
    }
  `
);

extend({ ParticleFieldMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    particleFieldMaterial: ThreeElement<typeof ParticleFieldMaterial>;
  }
}

// ── Geometry generator ────────────────────────────────────────────────────────
type ParticleAttributes = {
  positions: Float32Array;
  scales: Float32Array;
  seeds: Float32Array;
};

function generateParticleAttributes(): ParticleAttributes {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);
  const seeds = new Float32Array(PARTICLE_COUNT);
  let idx = 0;

  // Helper to write one particle
  const put = (x: number, y: number, z: number, scale: number) => {
    positions[idx * 3] = x;
    positions[idx * 3 + 1] = y;
    positions[idx * 3 + 2] = z;
    scales[idx] = scale;
    seeds[idx] = Math.random();
    idx++;
  };

  // ── Strand A ──────────────────────────────────────────────────────────────
  for (let i = 0; i < STRAND_PARTICLES; i++) {
    const t = i / STRAND_PARTICLES;
    const y = (t - 0.5) * SPINE_LENGTH;
    const angle = (y / HELIX_PITCH) * Math.PI * 2;
    const r = HELIX_RADIUS + (Math.random() - 0.5) * 0.14;
    put(
      Math.cos(angle) * r,
      y + (Math.random() - 0.5) * 0.1,
      Math.sin(angle) * r * Z_SCALE + Z_OFFSET,
      0.7 + Math.random() * 1.3
    );
  }

  // ── Strand B (half-turn offset = π) ───────────────────────────────────────
  for (let i = 0; i < STRAND_PARTICLES; i++) {
    const t = i / STRAND_PARTICLES;
    const y = (t - 0.5) * SPINE_LENGTH;
    const angle = (y / HELIX_PITCH) * Math.PI * 2 + Math.PI;
    const r = HELIX_RADIUS + (Math.random() - 0.5) * 0.14;
    put(
      Math.cos(angle) * r,
      y + (Math.random() - 0.5) * 0.1,
      Math.sin(angle) * r * Z_SCALE + Z_OFFSET,
      0.7 + Math.random() * 1.3
    );
  }

  // ── Base-pair rungs ────────────────────────────────────────────────────────
  for (let bp = 0; bp < BASE_PAIR_COUNT && idx < PARTICLE_COUNT; bp++) {
    const y = ((bp / BASE_PAIR_COUNT) - 0.5) * SPINE_LENGTH;
    const angle = (y / HELIX_PITCH) * Math.PI * 2;

    const ax = Math.cos(angle) * HELIX_RADIUS;
    const az = Math.sin(angle) * HELIX_RADIUS * Z_SCALE + Z_OFFSET;
    const bx = Math.cos(angle + Math.PI) * HELIX_RADIUS;
    const bz = Math.sin(angle + Math.PI) * HELIX_RADIUS * Z_SCALE + Z_OFFSET;

    for (let p = 0; p < BASE_PAIR_PTS && idx < PARTICLE_COUNT; p++) {
      const t = (p + 0.5) / BASE_PAIR_PTS;
      const jitter = (Math.random() - 0.5) * 0.07;
      put(
        ax + t * (bx - ax) + jitter,
        y + (Math.random() - 0.5) * 0.05,
        az + t * (bz - az) + jitter,
        0.25 + Math.random() * 0.5
      );
    }
  }

  // ── Ambient scatter ────────────────────────────────────────────────────────
  while (idx < PARTICLE_COUNT) {
    const r = AMBIENT_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    put(
      Math.cos(theta) * r,
      (Math.random() - 0.5) * SPINE_LENGTH,
      Math.sin(theta) * r * 0.6 - 2,
      Math.random() * 0.9 + 0.2
    );
  }

  return { positions, scales, seeds };
}

// ── ParticleField ─────────────────────────────────────────────────────────────
type ParticleFieldProps = {
  reducedMotion: boolean;
  scrollProgress: React.RefObject<number>;
  mouseNDC: React.RefObject<{ x: number; y: number }>;
};

function ParticleField({ reducedMotion, scrollProgress, mouseNDC }: ParticleFieldProps) {
  const materialRef = useRef<InstanceType<typeof ParticleFieldMaterial>>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { positions, scales, seeds } = useMemo(() => generateParticleAttributes(), []);

  useFrame((state, delta) => {
    const progress = scrollProgress.current;

    if (materialRef.current) {
      if (!reducedMotion) {
        materialRef.current.uTime += delta;
      }
      materialRef.current.uPixelRatio = state.viewport.dpr;
      const m = mouseNDC.current;
      materialRef.current.uMouse.set(m.x, m.y);
    }

    if (groupRef.current) {
      groupRef.current.position.y = (0.5 - progress) * TRAVEL_RANGE;
      groupRef.current.rotation.y = progress * Math.PI * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <particleFieldMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ── Scroll progress ───────────────────────────────────────────────────────────
function useGlobalScrollProgress(
  scrollProgress: React.RefObject<number>,
  reducedMotion: boolean
) {
  useGSAP(() => {
    if (reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => { trigger.kill(); };
  }, [reducedMotion, scrollProgress]);
}

// ── SiteScene (exported) ──────────────────────────────────────────────────────
export function SiteScene() {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const scrollProgress = useRef(0.5);
  const mouseNDC = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNDC.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useGlobalScrollProgress(scrollProgress, reducedMotion);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField
          reducedMotion={reducedMotion}
          scrollProgress={scrollProgress}
          mouseNDC={mouseNDC}
        />
      </Canvas>
    </div>
  );
}
