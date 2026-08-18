"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for custom cursor text attribute
      const textElement = target.closest('[data-cursor-text]');
      if (textElement) {
        setCursorText(textElement.getAttribute('data-cursor-text'));
        setIsHovered(true);
        return;
      }

      setCursorText(null);

      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: position.x - (cursorText ? 40 : 16),
        y: position.y - (cursorText ? 40 : 16),
        width: cursorText ? 80 : 32,
        height: cursorText ? 80 : 32,
        scale: isHovered && !cursorText ? 1.5 : 1,
        backgroundColor: cursorText ? 'rgba(255, 255, 255, 1)' : (isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)'),
        border: cursorText ? 'none' : '2px solid white',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {cursorText && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-black font-display text-[10px] tracking-widest font-bold mix-blend-normal"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};
