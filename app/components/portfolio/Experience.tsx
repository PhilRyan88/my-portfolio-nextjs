import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineData = [
  {
    year: '2019 — 2023',
    title: 'B.Tech in Computer Science',
    role: 'Sree Buddha College of Engineering',
    description: 'Built a strong foundation in computer science, software engineering principles, and data structures. Developed early programming skills and architectural understanding.',
  },
  {
    year: '2023 — March 2025',
    title: 'Independent Freelancer',
    role: 'Creative Web & Design',
    description: 'Operated as a freelancer in parallel with studies and training. Designed and engineered custom digital solutions, mastering visual storytelling and client-driven web development.',
  },
  {
    year: 'April 2024 — June 2024',
    title: 'Blockchain Developer Intern',
    role: 'Kerala Blockchain Academy',
    description: 'Single-handedly developed a fully functional Decentralized Crowdfunding Application from scratch. Completed an intense 3-month contract focused on Web3 upskilling and smart contract ecosystems.',
  },
  {
    year: 'July 2024 — March 2025',
    title: 'MERN Stack Engineering',
    role: 'Jspiders Bangalore',
    description: 'Underwent rigorous professional training in the MERN stack (MongoDB, Express, React, Node.js), transitioning from theoretical computer science to modern, production-ready full-stack web development.',
  },
  {
    year: 'April 2025 — June 2025',
    title: 'Software Engineer Intern',
    role: 'Lean Transition Solutions (Technopark)',
    description: 'Joined the core engineering team for a 3-month internship in Trivandrum. Contributed to enterprise software solutions and honed agile development practices in a corporate environment.',
  },
  {
    year: 'July 2025 — Present',
    title: 'Junior Software Engineer',
    role: 'Lean Transition Solutions',
    description: 'Transitioned to a full-time engineering role. Currently developing scalable software solutions, optimizing architectures, and driving frontend innovations in a fast-paced enterprise tech environment.',
  },
];

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the height of the glowing line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="w-full py-32 bg-[#030305] relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
        <div className="mb-24 md:text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-4">
            JOURNEY
          </h2>
          <p className="text-neon-cyan/70 uppercase tracking-widest text-sm font-mono animate-pulse">
            2019 — Present
          </p>
        </div>

        <div className="relative">
          {/* The Track (Background Line) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
          
          {/* The Glowing Line (Foreground Line) */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-neon-cyan to-neon-violet md:-translate-x-1/2 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
            style={{ height: lineHeight }}
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-24 relative">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Glowing Dot */}
                  <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#030305] border-2 border-neon-cyan z-20 shadow-[0_0_10px_rgba(0,240,255,0.8)] mt-2 md:mt-0" />
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] hover:border-neon-cyan/30 transition-all duration-500 group"
                    >
                      <div className="font-mono text-neon-cyan text-sm tracking-widest mb-2 group-hover:text-neon-violet transition-colors duration-500">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                        {item.title}
                      </h3>
                      <div className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                        {item.role}
                      </div>
                      <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
