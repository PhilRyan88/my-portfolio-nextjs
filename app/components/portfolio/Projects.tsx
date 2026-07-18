import { motion } from 'framer-motion';

export const Projects = () => {
  return (
    <section id="projects" className="min-h-[50vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-white mb-8"
      >
        Selected Work
      </motion.h2>
      <div className="grid grid-cols-1 gap-8">
        <div className="group relative rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer">
          <p className="text-gray-500 group-hover:text-white transition-colors z-10">Project Alpha</p>
        </div>
      </div>
    </section>
  );
};
