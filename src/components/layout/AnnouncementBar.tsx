'use client';

import React from 'react';

const MESSAGES = [
  '🚚 Free Shipping across Pakistan on orders above Rs. 2,000',
  '🔥 100% Pure Homemade — No Preservatives, No Shortcuts',
  '🎁 Premium Gifting Hampers Available — Order Now',
  '✨ Use Code GHARELU10 for 10% off your first order',
  '⭐ Rated 4.9/5 by 15,000+ happy customers across Pakistan',
  '🫙 Freshly batch-made every week — Order yours today',
];

export const AnnouncementBar: React.FC = () => {
  const repeated = [...MESSAGES, ...MESSAGES]; // duplicate for seamless loop

  return (
    <div className="w-full bg-primary text-white overflow-hidden border-b border-secondary/20 relative z-50 py-2">
      <div className="marquee-track">
        {repeated.map((msg, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wide whitespace-nowrap px-10">
            {msg}
            <span className="text-secondary/60 ml-6">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};
