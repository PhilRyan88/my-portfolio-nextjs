import { sceneConfig } from '@/config/scene';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Lights = () => {
  const areaLightRef = useRef<THREE.RectAreaLight>(null);

  useFrame((state) => {
    if (areaLightRef.current) {
      // Subtle pulse to the area light for dynamic feeling
      areaLightRef.current.intensity = sceneConfig.lighting.areaLightIntensity + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      {/* Main Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#ffffff"
      />
      {/* Sharp Edge/Rim Light (Cool) */}
      <directionalLight position={[-8, 8, -5]} intensity={2.0} color="#dbeafe" />

      {/* Subtle Fill Light (Warm) */}
      <directionalLight position={[0, -5, 5]} intensity={0.5} color="#fef3c7" />

      {/* Front-corner Specular Highlight */}
      <directionalLight position={[-10, 10, 10]} intensity={1.2} color="#ffffff" />

      <rectAreaLight
        ref={areaLightRef}
        width={15}
        height={15}
        color="#ffffff"
        intensity={sceneConfig.lighting.areaLightIntensity * 0.7}
        position={[-5, 5, 5]}
        lookAt={[0, 0, 0]}
      />
    </>
  );
};
