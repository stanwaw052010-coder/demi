"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { createGlowTexture } from "./ballTexture";

const HEAD_A = 0.92; // ellipse semi-axis x
const HEAD_B = 1.22; // ellipse semi-axis y

/** String bed — mains and crosses clipped to the head ellipse. */
function Strings() {
  const geometry = useMemo(() => {
    const verts: number[] = [];
    const a = HEAD_A * 0.94;
    const b = HEAD_B * 0.94;
    for (let x = -a + 0.115; x < a; x += 0.115) {
      const y = b * Math.sqrt(Math.max(0, 1 - (x * x) / (a * a)));
      verts.push(x, -y, 0, x, y, 0);
    }
    for (let y = -b + 0.13; y < b; y += 0.13) {
      const x = a * Math.sqrt(Math.max(0, 1 - (y * y) / (b * b)));
      verts.push(-x, y, 0, x, y, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#ddd8c6" transparent opacity={0.75} />
    </lineSegments>
  );
}

function Racket({ hovered }: { hovered: boolean }) {
  const graphite = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#171c18",
        metalness: 0.78,
        roughness: 0.28,
        envMapIntensity: 1.15,
      }),
    []
  );
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c2a15e",
        metalness: 0.92,
        roughness: 0.22,
        envMapIntensity: 1.4,
      }),
    []
  );
  const leather = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#12100c",
        metalness: 0.1,
        roughness: 0.85,
      }),
    []
  );

  const throatCurves = useMemo(() => {
    const mk = (side: 1 | -1) =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(side * 0.52, -HEAD_B * 0.84, 0),
        new THREE.Vector3(side * 0.34, -HEAD_B - 0.34, 0),
        new THREE.Vector3(side * 0.045, -HEAD_B - 0.62, 0)
      );
    return [mk(1), mk(-1)];
  }, []);

  useFrame(() => {
    const target = hovered ? 1.35 : 1.15;
    // eslint-disable-next-line react-hooks/immutability -- imperative three.js material driven per-frame
    graphite.envMapIntensity += (target - graphite.envMapIntensity) * 0.08;
  });

  return (
    <group>
      {/* head frame + gold pinstripe */}
      <mesh scale={[HEAD_A, HEAD_B, 1]}>
        <torusGeometry args={[1, 0.055, 24, 96]} />
        <primitive object={graphite} attach="material" />
      </mesh>
      <mesh scale={[HEAD_A * 0.985, HEAD_B * 0.985, 1]} position={[0, 0, 0.052]}>
        <torusGeometry args={[1, 0.008, 12, 96]} />
        <primitive object={gold} attach="material" />
      </mesh>
      <Strings />
      {/* throat */}
      {throatCurves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 24, 0.048, 12, false]} />
          <primitive object={graphite} attach="material" />
        </mesh>
      ))}
      {/* collar ring */}
      <mesh position={[0, -HEAD_B - 0.63, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.075, 0.012, 12, 32]} />
        <primitive object={gold} attach="material" />
      </mesh>
      {/* shaft */}
      <mesh position={[0, -HEAD_B - 0.82, 0]}>
        <cylinderGeometry args={[0.052, 0.055, 0.44, 24]} />
        <primitive object={graphite} attach="material" />
      </mesh>
      {/* octagonal leather grip */}
      <mesh position={[0, -HEAD_B - 1.5, 0]}>
        <cylinderGeometry args={[0.075, 0.08, 0.95, 8]} />
        <primitive object={leather} attach="material" />
      </mesh>
      {/* butt cap */}
      <mesh position={[0, -HEAD_B - 2.0, 0]}>
        <cylinderGeometry args={[0.088, 0.088, 0.06, 24]} />
        <primitive object={gold} attach="material" />
      </mesh>
    </group>
  );
}

/**
 * Drag to spin with momentum; floats and slowly presents itself
 * when idle; lighting warms toward lime on hover.
 */
function RacketRig() {
  const group = useRef<THREE.Group>(null!);
  const spot = useRef<THREE.SpotLight>(null!);
  const [hovered, setHovered] = useState(false);
  const drag = useRef({
    on: false,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
    idle: 0,
  });

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const g = group.current;
    const dr = drag.current;

    if (!dr.on) {
      // momentum bleed-off + gentle idle presentation
      dr.velX *= 1 - 2.6 * d;
      dr.velY *= 1 - 2.6 * d;
      dr.idle += d;
      g.rotation.y += dr.velX * d + Math.sin(dr.idle * 0.5) * 0.0016;
      g.rotation.x += dr.velY * d;
      g.rotation.x += (-0.12 - g.rotation.x) * 0.8 * d;
    } else {
      g.rotation.y += dr.velX * d;
      g.rotation.x += dr.velY * d;
    }
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.07 + 0.55;

    const s = hovered ? 1.04 : 1;
    g.scale.lerp(new THREE.Vector3(s, s, s), 4 * d);

    if (spot.current) {
      const target = hovered
        ? new THREE.Color("#d9f74f")
        : new THREE.Color("#fdf2d7");
      spot.current.color.lerp(target, 4 * d);
    }
  });

  return (
    <>
      <group
        ref={group}
        rotation={[-0.12, 0.4, -0.14]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={(e) => {
          e.stopPropagation();
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          drag.current.on = true;
          drag.current.lastX = e.clientX;
          drag.current.lastY = e.clientY;
        }}
        onPointerMove={(e) => {
          const dr = drag.current;
          if (!dr.on) return;
          dr.velX = (e.clientX - dr.lastX) * 0.14;
          dr.velY = (e.clientY - dr.lastY) * 0.08;
          dr.lastX = e.clientX;
          dr.lastY = e.clientY;
        }}
        onPointerUp={() => (drag.current.on = false)}
        onPointerLeave={() => (drag.current.on = false)}
      >
        <Racket hovered={hovered} />
      </group>

      <ambientLight intensity={0.3} color="#e8e4d5" />
      <spotLight ref={spot} position={[4, 4, 4]} intensity={34} angle={0.55} penumbra={1} />
      <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#2f6f4f" />
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#05070a"]} />
        <Lightformer intensity={3} position={[3, 3, 3]} scale={[4, 1.2, 1]} color="#fff7e0" />
        <Lightformer intensity={1.6} position={[-4, 0, -2]} scale={[3, 4, 1]} color="#d9f74f" />
        <Lightformer intensity={1.2} position={[0, -3, 2]} scale={[5, 1, 1]} color="#c2a15e" />
      </Environment>
    </>
  );
}

function GlowBackdrop() {
  const tex = useMemo(() => createGlowTexture("rgba(14, 58, 38, 0.55)"), []);
  return (
    <sprite scale={[11, 11, 1]} position={[0, 0, -3]}>
      <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

export default function RacketScene() {
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

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
    <div ref={wrap} className="h-full w-full touch-pan-y" data-cursor="SPIN">
      <Canvas
        dpr={[1, 1.6]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, -0.4, 5.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <GlowBackdrop />
        <RacketRig />
      </Canvas>
    </div>
  );
}
