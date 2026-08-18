import { Text } from '@react-three/drei';

export const CardText = () => {
  return (
    <group position={[-1.3, -0.7, 0.0201]}>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        fontSize={0.14}
        letterSpacing={0.15}
        color="#ffffff"
        anchorX="left"
        anchorY="bottom"
      >
        ADITYA S SOORAJ
        <meshPhysicalMaterial 
          attach="material" 
          color="#ffffff" 
          metalness={0.8} 
          roughness={0.2}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </Text>
    </group>
  );
};
