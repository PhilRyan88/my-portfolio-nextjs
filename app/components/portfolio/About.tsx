import { motion } from 'framer-motion';
import { animationConfig } from '@/config/animation';

export const About = () => {
  return (
    <section id="about" className="min-h-[50vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationConfig.durations.sectionEntry }}
        className="text-2xl font-semibold text-white mb-8"
      >
        About
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationConfig.durations.sectionEntry, delay: 0.1 }}
        className="prose prose-invert prose-lg text-gray-400"
      >
        <p>
          I am a senior frontend engineer with a passion for pushing the boundaries of web experiences.
          Specializing in React Three Fiber, Three.js, and GSAP, I build award-quality websites that feel
          more like native applications than traditional web pages.
        </p>
        <p className="mt-4">
          My philosophy is simple: never settle for ordinary. Every pixel, every animation, and every
          interaction is carefully crafted to create a truly premium digital experience.
        </p>
      </motion.div>
    </section>
  );
};
