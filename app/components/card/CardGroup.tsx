import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CreditCard } from './CreditCard';
import { QRPlane } from './QRPlane';
import { CardChip } from './CardChip';
import { CardText } from './CardText';
import { useIntro } from '@/hooks/useIntro';
import { useCardState } from '@/hooks/useCardState';
import { Float } from '@react-three/drei';

export const CardGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Start intro timeline and interaction states
  useIntro(groupRef);
  useCardState(groupRef);

  return (
    <group ref={groupRef}>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <CreditCard />
        <CardChip />
        <QRPlane />
        <CardText />
      </Float>
    </group>
  );
};
