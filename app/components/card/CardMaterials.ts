import * as THREE from "three";

// Lightweight procedural noise for brushed metal effect
const createBrushedNoise = () => {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      // Horizontal brushed effect by stretching noise
      const noise = Math.random() * 255;
      const r = Math.floor((noise + (Math.random() * 20 - 10)) * 0.8);
      ctx.fillStyle = `rgb(${r},${r},${r})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1); // Stretch horizontally
  return texture;
};

const brushedNoiseMap = createBrushedNoise();

export const CardMaterials = {
  // Main card face: Black Titanium
  base: new THREE.MeshPhysicalMaterial({
    color: "#0B0C0D",
    metalness: 0.85,
    roughness: 0.35,
    clearcoat: 0.15,
    clearcoatRoughness: 0.2,
    bumpMap: brushedNoiseMap,
    bumpScale: 0.0003,
  }),
  
  // Card edges: Polished Titanium
  edge: new THREE.MeshPhysicalMaterial({
    color: "#1a1c1e",
    metalness: 1.0,
    roughness: 0.15,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  }),

  // EMV Chip: Manufactured Gold
  chip: new THREE.MeshPhysicalMaterial({
    color: "#d4af37",
    metalness: 1.0,
    roughness: 0.2,
    clearcoat: 0.1,
  }),

  // Text: Laser etched / metallic print
  text: new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1.5,
  }),

  // Holographic/Security element base
  holographic: new THREE.MeshPhysicalMaterial({
    color: "#111111",
    metalness: 1.0,
    roughness: 0.1,
    iridescence: 1.0,
    iridescenceIOR: 1.5,
    iridescenceThicknessRange: [100, 400],
    clearcoat: 1.0,
  }),
};
