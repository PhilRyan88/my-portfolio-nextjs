import { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CardMaterials } from './CardMaterials';
import * as THREE from 'three';

export const CreditCard = () => {
  return (
    <group>
      {/* Placeholder for GLB Model - Using a RoundedBox */}
      <RoundedBox args={[3.37, 2.12, 0.05]} radius={0.1} smoothness={4}>
        <primitive object={CardMaterials.base} attach="material" />
      </RoundedBox>
    </group>
  );
};
