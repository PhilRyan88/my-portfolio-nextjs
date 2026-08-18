import { useRef } from 'react';
import * as THREE from 'three';
import { CardMaterials } from './CardMaterials';

export const CardSecurityElement = () => {
  return (
    <group position={[1.2, -0.7, 0.0201]}>
      {/* Subtle iridescent security mark / monogram */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        {/* A tiny, precision-cut geometric shape (e.g. an elegant hexagon) */}
        <cylinderGeometry args={[0.08, 0.08, 0.002, 6]} />
        <meshPhysicalMaterial 
          color="#111111"
          metalness={1.0}
          roughness={0.1}
          iridescence={1.0}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1.0}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
      {/* Inner subtle engraving */}
      <mesh position={[0, 0, 0.0011]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.001, 3]} />
        <meshPhysicalMaterial 
          color="#0B0C0D"
          metalness={0.8}
          roughness={0.5}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
    </group>
  );
};
