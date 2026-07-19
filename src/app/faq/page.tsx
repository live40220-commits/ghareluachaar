'use client';

import React, { useState } from 'react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    category: 'Orders & Delivery',
    items: [
      { q: 'How long does delivery take?', a: 'We deliver within 3–5 business days across Pakistan. Major cities like Lahore, Karachi, and Islamabad usually receive orders within 2–3 days.' },
      { q: 'Do you offer Cash on Delivery?', a: 'Yes! We offer Cash on Delivery (COD) across Pakistan. You can also pay via EasyPaisa, JazzCash, or Bank Transfer.' },
      { q: 'Is there a minimum order amount?', a: 'No minimum order required. Orders above PKR 2,000 get FREE delivery anywhere in Pakistan.' },
      { q: 'Can I track my order?', a: 'Yes, once your order is dispatched, we will send you a tracking number via WhatsApp so you can follow your package.' },
      { q: 'Do you ship internationally?', a: 'Currently we ship within Pakistan only. International shipping is coming soon — stay tuned!' },
    ]
  },
  {
    category: 'Products & Quality',
    items: [
      { q: 'Are your products really homemade?', a: 'Absolutely! Every product is made in our family kitchen using traditional recipes and hand-ground spices. We never use artificial preservatives or shortcuts.' },
      { q: 'How long do your products last?', a: 'Our pickles last 12–18 months when stored properly in a cool, dry place. Honey and syrups last up to 2 years. Always check the packaging for the best-before date.' },
      { q: 'Are your products safe for children?', a: 'Most of our products are made with natural ingredients. However, some items contain mustard oil and strong spices. We recommend mild varieties for children.' },
      { q: 'Do you use any artificial colors or flavors?', a: 'Never. We are strictly natural and preservative-free. All colors come from natural spices like turmeric and red chilies.' },
      { q: 'What oil do you use in your pickles?', a: 'We exclusively use cold-pressed Mustard Oil (Kachi Ghani Sarson Ka Tel) — the traditional and most flavorful choice for authentic Pakistani achaar.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 7-day return/replacement policy. If you receive a damaged or incorrect product, contact us on WhatsApp with a photo and we will arrange a replacement.' },
      { q: 'Can I return an opened product?', a: 'For hygiene reasons, we cannot accept returns on opened food products. However, if you are unsatisfied with quality, please reach out and we will make it right.' },
      { q: 'How long does a refund take?', a: 'Refunds to EasyPaisa/JazzCash are processed within 2–3 business days. Bank transfers may take 3–5 business days.' },
    ]
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<string | null>(null);

  return (
    <ShopLayout>
      {/* Hero */}
      <div className="bg-primary py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C8A96E 0,#C8A96E 1px,transparent 0,transparent 50%)', backgroundSize:'20px 20px' }} />
        <div className="relative z-10">
          <p className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold mb-3">Got Questions?</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-white/60 text-sm max-w-lg mx-auto">Everything you need to know about Gharelu Achaar — our products, delivery, and policies.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 space-y-12">
        {FAQS.map((section, si) => (
          <div key={si}>
            <h2 className="font-display text-xl font-bold text-primary mb-5 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-secondary inline-block" />
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                const isOpen = openIdx === key;
                return (
                  <div key={ii} className={`border transition-colors ${isOpen ? 'border-secondary/40 bg-secondary/5' : 'border-primary/15 bg-white'}`}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-primary pr-4">{item.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-secondary shrink-0" /> : <ChevronDown className="w-4 h-4 text-primary/40 shrink-0" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} className="overflow-hidden">
                          <p className="px-5 pb-4 text-sm text-primary/60 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-primary p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white mb-2">Still Have Questions?</h3>
          <p className="text-white/60 text-sm mb-5">Our support team is available 7 days a week on WhatsApp.</p>
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 font-bold text-sm hover:bg-green-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </ShopLayout>
  );
}
