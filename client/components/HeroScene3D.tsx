import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#00e6ff" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function CoreOrb() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.35) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[1.1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00e6ff"
            emissive="#0066aa"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.85}
            distort={0.35}
            speed={2}
            transparent
            opacity={0.92}
          />
        </Sphere>
      </Float>
      <Torus args={[1.65, 0.025, 16, 100]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshStandardMaterial color="#a855f7" emissive="#6b21a8" emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
      </Torus>
      <Torus args={[2.1, 0.018, 16, 100]} rotation={[Math.PI / 3.5, 0.4, 0.2]}>
        <meshStandardMaterial color="#00e6ff" emissive="#004466" emissiveIntensity={0.4} metalness={0.85} roughness={0.25} transparent opacity={0.7} />
      </Torus>
    </group>
  );
}

function OrbitNodes() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        radius: 2.8 + (i % 2) * 0.4,
        speed: 0.3 + (i % 3) * 0.08,
        size: 0.08 + (i % 2) * 0.04,
      })),
    []
  );

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.12;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => {
        const t = node.angle;
        return (
          <mesh key={i} position={[Math.cos(t) * node.radius, Math.sin(t * 0.5) * 0.8, Math.sin(t) * node.radius]}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#00e6ff' : '#c084fc'} emissive={i % 2 === 0 ? '#003344' : '#4c1d95'} emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#00e6ff" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#a855f7" />
      <spotLight position={[0, 6, 2]} angle={0.4} penumbra={0.5} intensity={0.6} color="#ffffff" />
      <CoreOrb />
      <OrbitNodes />
      <ParticleField />
    </>
  );
}

export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
    </div>
  );
}
