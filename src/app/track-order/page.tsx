'use client';

import React, { useState } from 'react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ORDERS: Record<string, { id: string; status: string; product: string; city: string; date: string; step: number }> = {
  'GA-2024-001': { id: 'GA-2024-001', status: 'Out for Delivery', product: 'Mango Achaar + Seb Murabba Bundle', city: 'Lahore', date: '19 Jul 2026', step: 3 },
  'GA-2024-002': { id: 'GA-2024-002', status: 'Processing', product: 'Lasoora Pickle 1kg', city: 'Karachi', date: '18 Jul 2026', step: 1 },
};

const STEPS = [
  { label: 'Order Placed', icon: CheckCircle2 },
  { label: 'Processing', icon: Package },
  { label: 'Dispatched', icon: Truck },
  { label: 'Out for Delivery', icon: MapPin },
  { label: 'Delivered', icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<typeof MOCK_ORDERS[string] | null | 'not-found'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_ORDERS[orderId.toUpperCase().trim()];
    setResult(found || 'not-found');
  };

  return (
    <ShopLayout>
      {/* Hero */}
      <div className="bg-primary py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C8A96E 0,#C8A96E 1px,transparent 0,transparent 50%)', backgroundSize: '18px 18px' }} />
        <div className="relative z-10">
          <p className="text-secondary text-[10px] tracking-[0.3em] uppercase font-black mb-2">Real-Time Tracking</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Track Your Order</h1>
          <p className="text-white/60 text-sm mt-2">Enter your order ID to see live delivery status.</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 md:px-8 py-14">
        {/* Search Form */}
        <form onSubmit={handleTrack} className="bg-white border border-secondary/15 shadow-premium p-8 space-y-4 mb-8">
          <h2 className="font-display text-xl font-bold text-primary">Enter Order Details</h2>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1.5">Order ID</label>
            <input value={orderId} onChange={e => setOrderId(e.target.value)} required placeholder="e.g. GA-2024-001"
              className="w-full border border-primary/15 px-4 py-3 text-sm text-primary input-premium" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1.5">Phone / WhatsApp Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder="03XX-XXXXXXX" type="tel"
              className="w-full border border-primary/15 px-4 py-3 text-sm text-primary input-premium" />
          </div>
          <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
            <Search className="w-4 h-4" /> Track Order
          </button>
          <p className="text-[10px] text-text-muted text-center">Try: <button type="button" onClick={() => setOrderId('GA-2024-001')} className="text-secondary font-bold hover:underline">GA-2024-001</button></p>
        </form>

        {/* Result */}
        {result === 'not-found' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 p-6 text-center">
            <p className="text-red-600 font-bold">Order not found!</p>
            <p className="text-xs text-red-500 mt-1">Please check your Order ID or contact us on WhatsApp.</p>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-5 py-2 bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors">
              Chat on WhatsApp
            </a>
          </motion.div>
        )}

        {result && result !== 'not-found' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-secondary/15 shadow-premium p-8 space-y-6">
            <div className="border-b border-secondary/10 pb-4">
              <p className="text-[10px] uppercase font-black tracking-widest text-secondary mb-1">Order Found</p>
              <h3 className="font-display text-xl font-bold text-primary">{result.id}</h3>
              <p className="text-xs text-text-muted mt-1">{result.product}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <p className="text-text-muted mb-0.5">Status</p>
                <p className="font-bold text-primary">{result.status}</p>
              </div>
              <div>
                <p className="text-text-muted mb-0.5">Delivery City</p>
                <p className="font-bold text-primary">{result.city}</p>
              </div>
              <div>
                <p className="text-text-muted mb-0.5">Order Date</p>
                <p className="font-bold text-primary">{result.date}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const done = i < result.step;
                const active = i === result.step - 1;
                const Icon = step.icon;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-sm transition-colors ${active ? 'bg-secondary/10 border border-secondary/30' : done ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-secondary text-white' : done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${active ? 'text-secondary' : done ? 'text-green-700' : 'text-gray-400'}`}>{step.label}</p>
                      {active && <p className="text-[10px] text-secondary/70 flex items-center gap-1"><Clock className="w-3 h-3" /> Current Status</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </ShopLayout>
  );
}
