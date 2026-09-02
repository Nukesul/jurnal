import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, Icosahedron, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { HERO_TECH } from "../data/portfolioData";

function Core() {
  const meshRef = useRef();
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.04;
  });
  return (
    <Icosahedron ref={meshRef} args={[1.15, 1]}>
      <meshBasicMaterial color="#F4C84B" wireframe transparent opacity={0.55} />
    </Icosahedron>
  );
}

function OrbitNode({ label, radius, speed, offset, tilt }) {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    groupRef.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.6) * 0.4, Math.sin(t) * radius);
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#F7D876" />
        </mesh>
        <Html center distanceFactor={6} occlude>
          <div className="pointer-events-none select-none whitespace-nowrap font-mono text-[11px] tracking-wide text-gold bg-void/70 border border-gold/30 rounded-full px-2 py-0.5 backdrop-blur-sm">
            {label}
          </div>
        </Html>
      </group>
    </group>
  );
}

function OrbitRing({ radius, tilt }) {
  const points = new THREE.EllipseCurve(0, 0, radius, radius).getPoints(64);
  const positions = points.map((p) => new THREE.Vector3(p.x, 0, p.y));
  return (
    <group rotation={[tilt, 0, 0]}>
      <Line points={positions} color="#8A7132" lineWidth={0.6} transparent opacity={0.35} />
    </group>
  );
}

function Scene() {
  const radii = [1.9, 2.35, 2.8];
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#F4C84B" />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <Core />
      </Float>
      {HERO_TECH.map((tech, i) => {
        const radius = radii[i % radii.length];
        const tilt = ((i % 3) - 1) * 0.5 + 0.2;
        return (
          <group key={tech}>
            <OrbitRing radius={radius} tilt={tilt} />
            <OrbitNode
              label={tech}
              radius={radius}
              speed={0.18 + i * 0.035}
              offset={i * 1.3}
              tilt={tilt}
            />
          </group>
        );
      })}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="relative h-[380px] sm:h-[440px] lg:h-[540px] w-full">
      <Canvas camera={{ position: [0, 1.2, 5.2], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
