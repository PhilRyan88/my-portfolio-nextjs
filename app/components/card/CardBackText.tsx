import { Text } from '@react-three/drei';

export const CardBackText = () => {
  return (
    <group position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]}>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        fontSize={0.18}
        letterSpacing={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.2, 0]}
      >
        ✉ adithyasrk5@gmail.com
        <meshStandardMaterial attach="material" color="#ffffff" metalness={0.8} roughness={0.2} />
      </Text>
      
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        fontSize={0.18}
        letterSpacing={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.2, 0]}
      >
        📞 +91 9061715827
        <meshStandardMaterial attach="material" color="#ffffff" metalness={0.8} roughness={0.2} />
      </Text>
    </group>
  );
};
