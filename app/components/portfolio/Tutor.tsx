import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const subjects = [
  { name: 'HTML', color: 'hover:bg-orange-500' },
  { name: 'CSS', color: 'hover:bg-blue-500' },
  { name: 'JavaScript', color: 'hover:bg-yellow-500' },
  { name: 'SQL', color: 'hover:bg-sky-500' },
  { name: 'React', color: 'hover:bg-cyan-500' },
  { name: 'Node.js', color: 'hover:bg-green-500' },
  { name: 'Python', color: 'hover:bg-blue-400' },
  { name: 'Blockchain Basics', color: 'hover:bg-gray-500' },
];

export const Tutor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section id="tutor" className="w-full min-h-[70vh] px-8 md:px-16 py-32 bg-[#050505]">
      <h2 className="text-5xl md:text-7xl font-bold mb-16 text-white tracking-tighter">
        TUTOR
      </h2>
      <div ref={containerRef} className="flex flex-wrap gap-4">
        {subjects.map((s, i) => (
          <div 
            key={i}
            className={`px-8 py-4 border border-gray-800 rounded-full text-xl text-gray-400 cursor-pointer transition-all duration-300 ${s.color} hover:text-white hover:border-transparent`}
          >
            {s.name}
          </div>
        ))}
      </div>
    </section>
  );
};
