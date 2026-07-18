import * as THREE from 'three';

export const CardMaterials = {
  base: new THREE.MeshPhysicalMaterial({
    color: '#333333',
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }),
  chip: new THREE.MeshPhysicalMaterial({
    color: '#d4af37', // Gold
    metalness: 1,
    roughness: 0.3,
  }),
  text: new THREE.MeshStandardMaterial({
    color: '#ffffff',
    metalness: 0.5,
    roughness: 0.5,
  }),
  qrGlow: new THREE.MeshBasicMaterial({
    color: '#0088ff',
    transparent: true,
    opacity: 0,
  }),
};
