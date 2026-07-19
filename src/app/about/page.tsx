'use client';

import React from 'react';
import Image from 'next/image';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { Leaf, Award, Heart, Users, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TEAM = [
  { name: 'Ammi Jaan', role: 'Head Chef & Founder', since: '1998', emoji: '👩‍🍳' },
  { name: 'Abba Ji', role: 'Quality & Sourcing', since: '1998', emoji: '👨‍🌾' },
  { name: 'Fatima', role: 'Packaging & Delivery', since: '2010', emoji: '📦' },
  { name: 'Hassan', role: 'Digital & Marketing', since: '2020', emoji: '💻' },
];

const STATS = [
  { value: '25+', label: 'Years of Heritage' },
  { value: '15,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Unique Products' },
  { value: '100%', label: 'No Preservatives' },
];

export default function AboutPage() {
  return (
    <ShopLayout>
      {/* Hero */}
      <div className="relative bg-primary py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold mb-3">Est. 1998 · Lahore, Pakistan</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-white/70 text-base leading-relaxed">
            What started as a mother's love in a small kitchen has grown into Pakistan's most trusted name in homemade pickles and traditional foods.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-secondary/10 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-primary/60 uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-20">
        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}>
            <p className="text-secondary text-xs tracking-widest uppercase font-semibold mb-3">The Beginning</p>
            <h2 className="font-display text-3xl font-bold text-primary mb-4">From One Kitchen, To Every Home</h2>
            <p className="text-primary/60 text-sm leading-relaxed mb-4">
              In 1998, in the heart of Lahore, Ammi Jaan began making pickles using recipes inherited from her mother — recipes that had been perfected over generations. Word spread quickly among neighbors and relatives who couldn't get enough of her authentic, preservative-free achaar.
            </p>
            <p className="text-primary/60 text-sm leading-relaxed">
              Today, Gharelu Achaar has grown into a full brand, but our soul remains the same: pure, homemade, honest food made with love and delivered fresh to your doorstep across Pakistan.
            </p>
          </motion.div>
          <div className="bg-amber-100 h-72 flex items-center justify-center text-8xl rounded-sm">🫙</div>
        </div>

        {/* Values */}
        <div>
          <p className="text-secondary text-xs tracking-widest uppercase font-semibold mb-3 text-center">What We Stand For</p>
          <h2 className="font-display text-3xl font-bold text-primary text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Leaf className="w-6 h-6 text-green-600" />, title: 'No Preservatives', desc: 'Every product is made fresh with natural ingredients only. No artificial colors, flavors, or chemicals — ever.' },
              { icon: <ShieldCheck className="w-6 h-6 text-secondary" />, title: '100% Authentic', desc: 'Our recipes have been passed down through generations. We never compromise on the authenticity of taste.' },
              { icon: <Heart className="w-6 h-6 text-red-500" />, title: 'Made With Love', desc: 'Every jar is handcrafted with care. We treat every order as if we are cooking for our own family.' },
              { icon: <Award className="w-6 h-6 text-amber-600" />, title: 'Premium Quality', desc: 'Only the finest raw mangoes, mustard oil, and hand-ground spices make it into our products.' },
              { icon: <Users className="w-6 h-6 text-blue-600" />, title: 'Customer First', desc: '15,000+ happy families trust us. Your satisfaction is our biggest reward and motivation.' },
              { icon: <Star className="w-6 h-6 text-secondary" />, title: 'Heritage Recipe', desc: 'Traditional curing methods, sun-dried naturally, no shortcuts. This is the Gharelu way.' },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="bg-amber-50 p-6">
                <div className="w-10 h-10 bg-white flex items-center justify-center mb-4">{v.icon}</div>
                <h3 className="font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-xs text-primary/60 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <p className="text-secondary text-xs tracking-widest uppercase font-semibold mb-3 text-center">The Gharelu Family</p>
          <h2 className="font-display text-3xl font-bold text-primary text-center mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((t, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">{t.emoji}</div>
                <p className="font-bold text-primary text-sm">{t.name}</p>
                <p className="text-xs text-secondary">{t.role}</p>
                <p className="text-[10px] text-primary/40 mt-1">Since {t.since}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
