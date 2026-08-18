import { RoundedBox } from '@react-three/drei';
import { CardMaterials } from './CardMaterials';

export const CreditCard = () => {
  return (
    <group>
      {/* Luxury Proportions: Slightly thinner, refined bevel */}
      <RoundedBox args={[3.37, 2.12, 0.04]} radius={0.08} smoothness={4}>
        {/* In three.js, BoxGeometry faces are: right, left, top, bottom, front, back */}
        <primitive object={CardMaterials.edge} attach="material-0" />
        <primitive object={CardMaterials.edge} attach="material-1" />
        <primitive object={CardMaterials.edge} attach="material-2" />
        <primitive object={CardMaterials.edge} attach="material-3" />
        <primitive object={CardMaterials.base} attach="material-4" />
        <primitive object={CardMaterials.base} attach="material-5" />
      </RoundedBox>
    </group>
  );
};
