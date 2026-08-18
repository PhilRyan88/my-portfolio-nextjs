import { RoundedBox } from '@react-three/drei';
import { CardMaterials } from './CardMaterials';

export const CardChip = () => {
  return (
    <group position={[-1.2, 0, 0.021]}>
      {/* Base Chip - Embedded slightly into the card (card face is at z=0.02) */}
      <RoundedBox args={[0.4, 0.3, 0.004]} radius={0.04} smoothness={2}>
        <primitive object={CardMaterials.chip} attach="material" />
      </RoundedBox>
      
      {/* EMV Segmentation Lines - using polygonOffset to prevent z-fighting */}
      <group position={[0, 0, 0.0021]}>
        {/* Vertical lines */}
        <mesh position={[-0.08, 0, 0]}>
          <planeGeometry args={[0.01, 0.28]} />
          <meshPhysicalMaterial color="#886611" roughness={0.9} metalness={0.8} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <planeGeometry args={[0.01, 0.28]} />
          <meshPhysicalMaterial color="#886611" roughness={0.9} metalness={0.8} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        
        {/* Horizontal lines */}
        <mesh position={[0, -0.05, 0]}>
          <planeGeometry args={[0.38, 0.01]} />
          <meshPhysicalMaterial color="#886611" roughness={0.9} metalness={0.8} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <planeGeometry args={[0.38, 0.01]} />
          <meshPhysicalMaterial color="#886611" roughness={0.9} metalness={0.8} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
      </group>
    </group>
  );
};
