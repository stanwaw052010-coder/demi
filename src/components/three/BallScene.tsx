"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { createBallTextures, createGlowTexture } from "./ballTexture";

/**
 * The hero ball — a physically-lit procedural tennis ball that floats,
 * leans toward the cursor, and takes a spin impulse when struck.
 */
function Ball() {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const textures = useMemo(() => createBallTextures(), []);
  const impulse = useRef(0);
  const spin = useRef({ x: 0.14, y: 0.3 });
  const cursor = useRef({ x: 0, y: 0 });

  // composition — desktop: parked over the right of the wordmark;
  // narrow screens: a small moon floating above it
  const narrow = viewport.width < 2.4;
  const home = narrow
    ? { x: 0.16, y: 1.07, s: 0.24, amp: 0.05 }
    : { x: 1.18, y: -0.06, s: 0.52, amp: 0.12 };

  // the canvas ignores pointer events (CTAs live above it), so the
  // ball listens to the window instead — lean on move, strike on tap
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cursor.current.x = (e.clientX / innerWidth) * 2 - 1;
      cursor.current.y = -(e.clientY / innerHeight) * 2 + 1;
    };
    const onDown = (e: PointerEvent) => {
      if (window.scrollY > innerHeight * 0.8) return; // hero only
      const t = e.target as HTMLElement;
      if (t.closest("a,button,input,select,textarea,header")) return;
      impulse.current = 1;
      spin.current.y = 0.3 + (Math.random() - 0.5) * 0.6;
      spin.current.x = 0.14 + (Math.random() - 0.5) * 0.35;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(dt, 0.05);

    // float around home position, clear of the CTAs
    group.current.position.y = home.y + Math.sin(t * 0.7) * home.amp;
    group.current.position.x = home.x + Math.sin(t * 0.43) * 0.07;
    group.current.scale.setScalar(home.s);

    // cursor lean — lazy, weighted
    const tx = cursor.current.x * 0.45;
    const ty = cursor.current.y * 0.32;
    group.current.rotation.y += (tx - group.current.rotation.y) * 2.2 * d;
    group.current.rotation.x += (-ty - group.current.rotation.x) * 2.2 * d;

    // idle spin + impulse decay
    impulse.current *= 1 - 3.2 * d;
    mesh.current.rotation.y += (spin.current.y + impulse.current * 5) * d;
    mesh.current.rotation.x += (spin.current.x + impulse.current * 2.4) * d;

    // squash on impact, springs back
    const s = 1 - Math.min(impulse.current, 1) * 0.12;
    mesh.current.scale.setScalar(s);
  });

  return (
    <group ref={group} scale={0.52} position={[home.x, home.y, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={1.4}
          roughness={0.82}
          metalness={0.02}
          envMapIntensity={0.55}
        />
      </mesh>
    </group>
  );
}

function Halo() {
  const tex = useMemo(() => createGlowTexture("rgba(20, 83, 45, 0.5)"), []);
  const gold = useMemo(() => createGlowTexture("rgba(194, 161, 94, 0.16)"), []);
  return (
    <>
      <sprite scale={[9, 9, 1]} position={[1.6, 0.1, -2.4]}>
        <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[13, 13, 1]} position={[-1.4, -0.8, -3.2]}>
        <spriteMaterial map={gold} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </>
  );
}

/** Deterministic scatter so the field is stable (and render-pure). */
function makeDustPositions(count: number) {
  let s = 1962;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (rnd() - 0.5) * 11;
    arr[i * 3 + 1] = (rnd() - 0.5) * 7;
    arr[i * 3 + 2] = (rnd() - 0.5) * 5 - 0.5;
  }
  return arr;
}

/** Slow-drifting court dust caught in the light. */
function Dust({ count = 220 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => makeDustPositions(count), [count]);

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const pos = points.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + d * (0.05 + (i % 5) * 0.016);
      let x = pos.getX(i) + Math.sin(state.clock.elapsedTime * 0.3 + i) * d * 0.02;
      if (y > 3.6) y = -3.6;
      if (x > 5.6) x = -5.6;
      pos.setY(i, y);
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ede8db"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  return (
    <>
      <ambientLight intensity={0.32} color="#dfe8d0" />
      <directionalLight position={[4, 3, 5]} intensity={2.1} color="#fff4dc" />
      <spotLight
        position={[-5, 2, -3]}
        intensity={26}
        angle={0.5}
        penumbra={1}
        color="#d9f74f"
      />
      <directionalLight position={[0, -4, 2]} intensity={0.35} color="#14532d" />
      <Environment resolution={64} frames={1}>
        <color attach="background" args={["#060806"]} />
        <Lightformer intensity={2.4} position={[4, 2, 3]} scale={[3, 3, 1]} color="#fdf6e3" />
        <Lightformer intensity={1.4} position={[-4, -1, -3]} scale={[4, 2, 1]} color="#d9f74f" />
        <Lightformer intensity={1.1} position={[0, 4, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} color="#c2a15e" />
      </Environment>
    </>
  );
}

export default function BallScene({ active = true }: { active?: boolean }) {
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  // pause rendering entirely once the hero has scrolled away
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={visible && active ? "always" : "never"}
        camera={{ position: [0, 0, 4.6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Rig />
        <Halo />
        <Ball />
        <Dust />
      </Canvas>
    </div>
  );
}
