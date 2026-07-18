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
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[8, 8, 5]}
        intensity={0.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-8, 8, -5]} intensity={0.4} />
      
      {/* Front-corner key light */}
      <directionalLight position={[-10, 10, 10]} intensity={0.7} />
      
      <rectAreaLight
        ref={areaLightRef}
        width={10}
        height={10}
        color="#ffffff"
        intensity={sceneConfig.lighting.areaLightIntensity * 0.5}
        position={[-5, 5, 5]}
        lookAt={[0, 0, 0]}
      />
    </>
  );
};
