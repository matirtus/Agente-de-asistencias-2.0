import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Colony = ({ position, size, color }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(size + Math.sin(t * 2 + position[0]) * 0.05);
  });

  return (
    <mesh position={position} ref={mesh}>
      <circleGeometry args={[size, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

const Dish = () => {
  const colonies = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      position: [
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5,
        0.01,
      ],
      size: Math.random() * 0.2 + 0.05,
      color: Math.random() > 0.3 ? '#00FF95' : '#0D4435'
    }));
  }, []);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Base of Petri Dish */}
      <mesh>
        <cylinderGeometry args={[2, 2, 0.1, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.9} 
          thickness={0.5} 
          roughness={0.1} 
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Agar Layer */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.05, 64]} />
        <meshStandardMaterial color="#f0f0e0" opacity={0.6} transparent />
      </mesh>

      {/* Colonies */}
      <group position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {colonies.map((c, i) => (
          <Colony key={i} {...c} />
        ))}
      </group>
    </group>
  );
};

const PetriSim = () => {
  return (
    <div className="w-full h-80 bg-graphite rounded-3xl overflow-hidden relative group">
      <div className="absolute top-4 left-4 z-10">
        <h4 className="text-[10px] font-mono text-gfp uppercase tracking-[0.2em]">Live Simulation</h4>
        <p className="text-white font-serif italic text-lg opacity-80">Petri-V Node 84</p>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
         <div className="w-2 h-2 bg-gfp rounded-full animate-pulse" />
         <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Active Stream</span>
      </div>

      <Canvas shadowMap>
        <PerspectiveCamera makeDefault position={[0, 5, 5]} fov={40} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Dish />
        </Float>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default PetriSim;
