import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CameraRig } from './CameraRig';
import { Lights } from './Lights';
import { SceneEnvironment } from './Environment';
import { Effects } from './Effects';
import { CardGroup } from '../card/CardGroup';
import { Loader } from '@react-three/drei';
import { Info } from 'lucide-react';
import { useAnimationStore } from '@/store/animationStore';

const DesktopNotice = () => {
  const { phase } = useAnimationStore();
  if (phase !== 'scanning') return null;
  return (
    <div className="md:hidden absolute top-[75vh] left-0 w-full flex justify-center z-[9999] pointer-events-none px-6">
      <div className="flex items-center gap-2 text-neon-cyan/80 animate-pulse drop-shadow-md bg-[#030305]/50 px-4 py-2 rounded-full border border-neon-cyan/20 backdrop-blur-sm">
        <Info size={16} />
        <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase">
          View on PC for the complete experience
        </p>
      </div>
    </div>
  );
};

export const CanvasScene = () => {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        style={{ pointerEvents: 'none' }}
        shadows
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, toneMappingExposure: 1.5, logarithmicDepthBuffer: true }}
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
      <DesktopNotice />
    </div>
  );
};
