import { useFrame } from '@react-three/fiber';
import { cameraConfig } from '@/config/camera';
import * as THREE from 'three';
import { useAnimationStore } from '@/store/animationStore';

export const useMouseTilt = (cameraRef: React.RefObject<THREE.PerspectiveCamera | null>) => {
  const targetPosition = new THREE.Vector3();
  const { phase } = useAnimationStore();

  useFrame((state) => {
    if (!cameraRef.current || phase !== 'unlocked') return;

    // Calculate mouse influence
    const { x, y } = state.pointer;
    
    // The camera should base its movement around its post-intro position (-2, 0, 6)
    targetPosition.set(
      -2 + (x * cameraConfig.mouseInfluence.x),
      0 + (y * cameraConfig.mouseInfluence.y),
      6
    );

    // Smoothly interpolate current camera position to target position
    cameraRef.current.position.lerp(targetPosition, 0.05);
    cameraRef.current.lookAt(-1, 0, 0);
  });
};
