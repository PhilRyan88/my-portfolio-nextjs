import { Environment, Sparkles } from '@react-three/drei';
import { sceneConfig } from '@/config/scene';
import { useAnimationStore } from '@/store/animationStore';

export const SceneEnvironment = () => {
  const { phase } = useAnimationStore();

  const particleCount = phase === 'scanning' ? sceneConfig.particles.scanCount : sceneConfig.particles.idleCount;

  return (
    <>
      {/* City environment gives great premium reflections for metallic materials */}
      <Environment preset="city" />
      
      {/* Soft floating particles */}
      <Sparkles
        count={particleCount}
        scale={12}
        size={2}
        speed={0.4}
        opacity={0.2}
        color={sceneConfig.particles.color}
      />
    </>
  );
};
