'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOUNCEMENTS = [
  '🚚 Free Shipping across Pakistan on orders above Rs. 2,999',
  '🔥 Pure Homemade Pickles & Murabbas Since 1998',
  '🎁 Premium Quality & Packaging - Perfect for Gifting',
  '✨ Flat 10% Off on your first order! Use code: GHARELU10'
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-primary text-white text-xs md:text-sm py-2 px-4 flex items-center justify-center overflow-hidden border-b border-secondary/20 relative z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="text-center font-medium tracking-wide flex items-center gap-2"
        >
          {ANNOUNCEMENTS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
