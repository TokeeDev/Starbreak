'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  // Auto-rotate the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-white">Loading...</div>
    </div>
  );
}

interface ModelViewerProps {
  url: string;
  width?: number;
  height?: number;
}

export default function ModelViewer({ url, width = 400, height = 400 }: ModelViewerProps) {
  return (
    <div 
      style={{ width, height }} 
      className="rounded-lg overflow-hidden bg-neutral-900"
    >
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 50 
        }}
        gl={{ 
          antialias: true,
          alpha: true 
        }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <Model url={url} />
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
} 