import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { 
  SiHtml5, SiCss, SiJavascript, SiTailwindcss, 
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, 
  SiNestjs, SiFastify, SiMongodb, SiPostgresql, 
  SiWeb3Dotjs, SiSolidity 
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
  { name: 'SQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Web3', icon: SiWeb3Dotjs, color: '#F16822' },
  { name: 'Solidity', icon: SiSolidity, color: '#363636' }
];

export const Skills = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Trigger physics when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !inView) return;

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
    engine.gravity.y = 0.8;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const wallLeft = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const wallRight = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -1000, width * 2, 100, wallOptions);

    World.add(world, [ground, wallLeft, wallRight, ceiling]);

    // Create DOM-synced bodies for each skill
    const isMobile = width < 768;
    const radius = isMobile ? 40 : 55; // Adjust circle size for mobile

    const bodies = skills.map((_, i) => {
      return Bodies.circle(
        width / 2 + (Math.random() * 200 - 100), // Random horizontal cluster
        -(i * 100) - 200, // Staggered drop from way above
        radius,
        {
          restitution: 0.6, // Bounciness
          friction: 0.05,
          density: 0.04,
          render: { visible: false } // We render via DOM
        }
      );
    });

    World.add(world, bodies);

    // Add mouse control
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    
    // Fix scroll bug when touching the canvas on mobile
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    
    World.add(world, mouseConstraint);

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync DOM
    let animationFrameId: number;
    const updateDOM = () => {
      bodies.forEach((body, i) => {
        const el = document.getElementById(`skill-node-${i}`);
        if (el) {
          // Translate from center of circle body to top-left of DOM element
          el.style.transform = `translate(${body.position.x - radius}px, ${body.position.y - radius}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };
    updateDOM();

    // Handle window resize dynamically
    const handleResize = () => {
      const newWidth = sceneRef.current?.clientWidth || window.innerWidth;
      const newHeight = sceneRef.current?.clientHeight || window.innerHeight;
      
      // Update right wall and ground positions
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(wallRight, { x: newWidth + 50, y: newHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
    };
  }, [inView]);

  return (
    <section id="skills" className="w-full min-h-screen py-32 bg-[#0a0a0a] overflow-hidden flex flex-col relative">
      <div className="absolute top-16 left-8 md:left-16 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mix-blend-difference">
          TECH STACK
        </h2>
        <p className="text-neon-cyan/70 font-mono text-sm uppercase tracking-widest mt-4 animate-pulse">
          Grab and throw to interact
        </p>
      </div>
      
      {/* Physics Container */}
      <div ref={sceneRef} className="w-full flex-grow relative cursor-grab active:cursor-grabbing z-10 min-h-[70vh]">
        {skills.map((skill, i) => (
          <div 
            key={i}
            id={`skill-node-${i}`}
            className="absolute top-0 left-0 flex flex-col items-center justify-center rounded-full select-none"
            style={{ 
              width: 'var(--size)', 
              height: 'var(--size)',
              '--size': 'clamp(80px, 9vw, 110px)',
              // Advanced 3D Sphere CSS
              background: 'radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0 40%, #cccccc 80%, #999999)',
              boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.15), inset 10px 10px 20px rgba(255,255,255,1), 0 20px 30px rgba(0,0,0,0.6)',
            } as React.CSSProperties}
          >
            <skill.icon 
              className="w-1/2 h-1/2 drop-shadow-md transition-transform duration-300 hover:scale-110" 
              style={{ color: skill.color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
