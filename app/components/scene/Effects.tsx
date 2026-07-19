import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing';
import { sceneConfig } from '@/config/scene';

export const Effects = () => {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={sceneConfig.postProcessing.bloomThreshold}
        luminanceSmoothing={sceneConfig.postProcessing.bloomSmoothing}
        intensity={sceneConfig.postProcessing.bloomIntensity}
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};
