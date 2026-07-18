import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useMouseTilt } from '@/hooks/useMouseTilt';
import { cameraConfig } from '@/config/camera';
import * as THREE from 'three';

export const CameraRig = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Apply subtle mouse tilt to the camera
  useMouseTilt(cameraRef);

  return (
    <PerspectiveCamera
      makeDefault
      ref={cameraRef}
      position={cameraConfig.initialPosition}
      fov={cameraConfig.fov}
      near={cameraConfig.near}
      far={cameraConfig.far}
    />
  );
};
