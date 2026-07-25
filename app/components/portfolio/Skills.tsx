import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { 
  SiHtml5, SiCss, SiJavascript, SiTailwindcss, 
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, 
  SiNestjs, SiFastify, SiMongodb, SiSolidity 
} from 'react-icons/si';

const skills = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#000000' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
  { name: 'Fastify', icon: SiFastify, color: '#000000' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Solidity', icon: SiSolidity, color: '#363636' }
];

export const Skills = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const isPaused = useRef(false);

  // Trigger physics when scrolled into view, and pause when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        isPaused.current = false;
      } else {
        isPaused.current = true;
      }
    }, { threshold: 0.1 });
    
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !hasStarted) return;

    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;
    
    // Get container dimensions
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Set a realistic gravity for dropping
    engine.gravity.y = 1.2;

    // Boundaries: Tight 4-wall box to prevent balls from flying out
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const wallLeft = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const wallRight = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, wallOptions); // Actual ceiling

    World.add(world, [ground, wallLeft, wallRight, ceiling]);

    // Create DOM-synced bodies for each skill
    const isMobile = width < 768;
    const radius = isMobile ? 40 : 55; // Adjust circle size for mobile

    const bodies = skills.map((_, i) => {
      return Bodies.circle(
        width / 2 + (Math.random() * 200 - 100), // Random horizontal cluster
        Math.random() * (height / 2), // Spawn inside the box
        radius,
        {
          restitution: 0.8, // Bounciness
          friction: 0.005,
          density: 0.04,
          render: { visible: false } // We render via DOM
        }
      );
    });

    World.add(world, bodies);

    // Enable mouse control on all devices (mobile + desktop)
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    
    // Override matter.js hijacking all touch events
    // pan-y allows vertical scrolling on mobile while still letting us grab balls!
    mouse.element.style.touchAction = 'pan-y';
    mouse.element.style.pointerEvents = 'auto';
    
    // Fix scroll bug when touching the canvas on desktop
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
    
    World.add(world, mouseConstraint);

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync DOM
    let animationFrameId: number;
    const updateDOM = () => {
      runner.enabled = !isPaused.current; // Pause physics calculations when off-screen

      if (!isPaused.current) {
        bodies.forEach((body, i) => {
          const el = document.getElementById(`skill-node-${i}`);
          const iconEl = document.getElementById(`skill-icon-${i}`);
          if (el && iconEl) {
            // Translate the sphere container (Keeps the 3D light source static)
            el.style.transform = `translate(${body.position.x - radius}px, ${body.position.y - radius}px)`;
            // Rotate ONLY the icon inside it
            iconEl.style.transform = `rotate(${body.angle}rad)`;
          }
        });
      }
      animationFrameId = requestAnimationFrame(updateDOM);
    };
    updateDOM();

    // Handle window resize dynamically
    const handleResize = () => {
      const newWidth = sceneRef.current?.clientWidth || window.innerWidth;
      const newHeight = sceneRef.current?.clientHeight || window.innerHeight;
      
      // Update walls
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(wallRight, { x: newWidth + 50, y: newHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -50 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
    };
  }, [hasStarted]);

  return (
    <section id="skills" className="w-full pt-20 md:pt-32 pb-0 bg-[#0a0a0a] overflow-hidden flex flex-col relative">
      <div className="absolute top-32 md:top-40 left-6 md:left-16 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
          TECH STACK
        </h2>
        <p className="hidden md:block text-neon-cyan/70 font-mono text-sm uppercase tracking-widest mt-4 animate-pulse">
          Grab and throw to interact
        </p>
      </div>
      
      {/* Physics Container */}
      <div ref={sceneRef} className="w-full mt-24 md:mt-0 relative z-10 h-[60vh] md:h-[70vh]">
        {skills.map((skill, i) => (
          <div 
            key={i}
            id={`skill-node-${i}`}
            className="group/ball absolute top-0 left-0 flex flex-col items-center justify-center rounded-full select-none touch-none cursor-pointer"
            style={{ 
              width: 'var(--size)', 
              height: 'var(--size)',
              '--size': 'clamp(80px, 9vw, 110px)',
              // Upgraded Photorealistic 3D Sphere CSS
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #e6e6e6 30%, #b3b3b3 70%, #666666 100%)',
              boxShadow: 'inset -15px -15px 25px rgba(0,0,0,0.4), inset 10px 10px 20px rgba(255,255,255,0.9), 10px 20px 35px rgba(0,0,0,0.6)',
            } as React.CSSProperties}
          >
            {/* Hover Tooltip - strictly outside the rotating icon container */}
            <div 
              className="absolute -top-14 opacity-0 group-hover/ball:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-white border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50"
              style={{ transform: 'rotate(0deg)' }}
            >
              {skill.name}
            </div>

            {/* Rotating Icon Container */}
            <div id={`skill-icon-${i}`} className="flex items-center justify-center w-full h-full">
              <skill.icon 
                className="w-1/2 h-1/2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110" 
                style={{ color: skill.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
