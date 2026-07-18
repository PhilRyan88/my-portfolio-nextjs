import * as THREE from 'three';

export const cameraConfig = {
  initialPosition: new THREE.Vector3(0, 0, 8),
  fov: 45,
  near: 0.1,
  far: 1000,
  mouseInfluence: {
    x: 0.5, // How much the camera moves horizontally based on mouse
    y: 0.5, // How much the camera moves vertically based on mouse
  },
  dockedPosition: new THREE.Vector3(-4, 0, 6), // Position when card is docked to left
};
