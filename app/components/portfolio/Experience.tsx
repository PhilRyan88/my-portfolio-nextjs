import { motion } from 'framer-motion';

export const Experience = () => {
  return (
    <section id="experience" className="min-h-[50vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-white mb-8"
      >
        Experience
      </motion.h2>
      <div className="space-y-12 text-gray-400">
        <div className="border-l border-gray-800 pl-6 relative">
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <h3 className="text-xl text-white font-medium">Senior Creative Developer</h3>
          <p className="text-sm text-blue-400 mb-4">Studio X — 2022 - Present</p>
          <p>Led development on multiple Awwwards-winning websites. Architected scalable 3D experiences using R3F and Next.js.</p>
        </div>
      </div>
    </section>
  );
};
