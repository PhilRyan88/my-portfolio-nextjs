import { Text } from '@react-three/drei';
import { CardMaterials } from './CardMaterials';

export const CardText = () => {
  return (
    <group position={[-1.3, -0.7, 0.026]}>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        fontSize={0.15}
        letterSpacing={0.1}
        color="#ffffff"
        anchorX="left"
        anchorY="bottom"
      >
        ADITYA  S SOORAJ
        <meshStandardMaterial attach="material" color="#ffffff" metalness={0.8} roughness={0.2} />
      </Text>
    </group>
  );
};
