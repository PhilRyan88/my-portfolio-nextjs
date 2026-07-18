import { useEffect, useRef } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

const projects = [
  { name: 'ALPHA FINANCE', tech: 'NEXT.JS / SOLIDITY', desc: 'A cutting-edge Web3 analytics dashboard built with raw glassmorphism and real-time blockchain socket streaming.' },
  { name: 'STUDIO X', tech: 'REACT / WEBGL', desc: 'An Awwwards-winning immersive creative agency portfolio featuring custom GLSL shaders and GSAP orchestrations.' },
];

export const Developer = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      
      const tl = gsap.timeline({ paused: true });
      tl.to(card.querySelector('.reveal-content'), {
        height: 'auto',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
    });
  }, []);

  return (
    <section id="developer" className="w-full min-h-screen px-6 md:px-16 py-32 relative">
      <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-white tracking-tighter">
        DEVELOPMENT
      </h2>
      
      <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <div 
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="w-full glass-panel border border-white/5 hover:border-neon-cyan/50 transition-colors duration-500 p-8 group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
              <h3 className="text-3xl md:text-6xl font-display font-bold text-gray-500 group-hover:text-white transition-colors duration-500 tracking-tighter">
                {p.name}
              </h3>
              <p className="font-mono text-neon-cyan text-xs md:text-sm tracking-widest uppercase">{p.tech}</p>
            </div>
            
            <div className="reveal-content h-0 opacity-0 overflow-hidden flex flex-col md:flex-row gap-8 mt-0 group-hover:mt-12">
              <div className="flex-1 aspect-video bg-black/50 border border-white/10 relative overflow-hidden group/img">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-gray-600">
                  IMAGE PLACEHOLDER
                </div>
                {/* Simulated scan line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/50 -translate-y-full group-hover/img:translate-y-[500px] transition-transform duration-[3s] ease-linear" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-xl text-gray-400 font-sans leading-relaxed font-light">
                  {p.desc}
                </p>
                <div className="flex gap-4 mt-8 font-mono text-sm uppercase tracking-widest">
                  <MagneticButton className="px-8 py-4 bg-white text-black hover:bg-neon-cyan hover:text-black transition-colors duration-300">
                    Live Demo
                  </MagneticButton>
                  <MagneticButton className="px-8 py-4 border border-white/20 text-white hover:border-neon-violet hover:text-neon-violet transition-colors duration-300">
                    GitHub
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
