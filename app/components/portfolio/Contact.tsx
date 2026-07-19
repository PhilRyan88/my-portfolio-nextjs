import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <section id="contact" className="min-h-[50vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-white mb-8"
      >
        Get in touch
      </motion.h2>
      <p className="text-gray-400 mb-8">
        I am always open to discussing new ideas, technologies, and interesting collaborations. Let's connect!
      </p>
      <a href="mailto:hello@example.com" className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform">
        hello@example.com
      </a>
    </section>
  );
};
