import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useAnimationStore } from '@/store/animationStore';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';

export const QRPlane = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const { phase } = useAnimationStore();

  // Load a real QR code texture dynamically
  const qrTexture = useTexture('https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=AdityaSooraj');

  useEffect(() => {
    if (phase === 'scanning' && groupRef.current && scanLineRef.current) {
      const tl = gsap.timeline();
      
      // 1. QR Code pops out of the card
      tl.to(groupRef.current.position, {
        z: 0.2,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      // 2. Scan line moves across the QR code
      .to(scanLineRef.current.position, {
        y: -0.4,
        duration: 1.5, // Sweep duration
        ease: 'power2.inOut',
      })
      // 3. QR Code pops back into the card
      .to(groupRef.current.position, {
        z: 0.031,
        duration: 0.5,
        ease: 'power2.in'
      });
      
      return () => { tl.kill(); };
    }
  }, [phase]);

  return (
    <group position={[1.0, 0, 0.031]} ref={groupRef}>
      {/* Main QR Code Plane */}
      <mesh>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial map={qrTexture} roughness={0.2} metalness={0.5} />
      </mesh>
      
      {/* Scan Line */}
      <mesh ref={scanLineRef} position={[0, 0.4, 0.05]}>
        <planeGeometry args={[0.9, 0.02]} />
        <meshBasicMaterial 
          color="#00ffcc" 
          transparent 
          opacity={phase === 'scanning' ? 1 : 0} 
        />
      </mesh>
    </group>
  );
};
