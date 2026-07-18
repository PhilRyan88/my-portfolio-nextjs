import { RoundedBox } from '@react-three/drei';
import { CardMaterials } from './CardMaterials';

export const CardChip = () => {
  return (
    <group position={[-1.2, 0, 0.026]}>
      <RoundedBox args={[0.4, 0.3, 0.01]} radius={0.05} smoothness={2}>
        <primitive object={CardMaterials.chip} attach="material" />
      </RoundedBox>
    </group>
  );
};
