import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CameraRig } from './CameraRig';
import { Lights } from './Lights';
import { SceneEnvironment } from './Environment';
import { Effects } from './Effects';
import { CardGroup } from '../card/CardGroup';
import { Loader } from '@react-three/drei';

export const CanvasScene = () => {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        style={{ pointerEvents: 'none' }}
        shadows
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, toneMappingExposure: 1.5 }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <Lights />
          <SceneEnvironment />
          <CardGroup />
          <Effects />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};
