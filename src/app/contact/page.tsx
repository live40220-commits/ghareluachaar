'use client';

import React, { useState } from 'react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <ShopLayout>
      {/* Hero */}
      <div className="bg-primary py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10">
          <p className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold mb-3">We Are Here For You</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/60 text-sm">Have a question or a special order? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Cards */}
        <div className="space-y-5">
          {[
            { icon: <Phone className="w-5 h-5 text-secondary" />, title: 'WhatsApp / Call', lines: ['+92 300 1234567', 'Mon–Sat, 9am–8pm'] },
            { icon: <Mail className="w-5 h-5 text-secondary" />, title: 'Email Us', lines: ['support@ghareluachaar.pk', 'We reply within 24 hours'] },
            { icon: <MapPin className="w-5 h-5 text-secondary" />, title: 'Our Location', lines: ['Heritage Hub, Multan Road', 'Lahore, Pakistan'] },
            { icon: <Clock className="w-5 h-5 text-secondary" />, title: 'Business Hours', lines: ['Mon – Sat: 9:00am – 8:00pm', 'Sunday: 11:00am – 5:00pm'] },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} transition={{ delay: i*0.1 }} className="flex gap-4 p-5 bg-amber-50 border border-amber-100">
              <div className="w-10 h-10 bg-white shrink-0 flex items-center justify-center">{c.icon}</div>
              <div>
                <p className="font-bold text-primary text-sm mb-1">{c.title}</p>
                {c.lines.map((l, j) => <p key={j} className="text-xs text-primary/60">{l}</p>)}
              </div>
            </motion.div>
          ))}

          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="h-full flex flex-col items-center justify-center text-center py-16 bg-green-50 border border-green-200">
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="font-display text-2xl font-bold text-primary mb-2">Message Sent!</h2>
              <p className="text-sm text-primary/60">Thank you, {form.name || 'friend'}! We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-primary mb-6">Send a Message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label:'Full Name', name:'name', type:'text', placeholder:'Your name', required:true },
                  { label:'Email', name:'email', type:'email', placeholder:'your@email.com', required:false },
                  { label:'Phone', name:'phone', type:'tel', placeholder:'03XX-XXXXXXX', required:false },
                  { label:'Subject', name:'subject', type:'text', placeholder:'Order inquiry, complaint...', required:true },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input
                      type={f.type} name={f.name} value={(form as any)[f.name]} required={f.required}
                      onChange={e => setForm(p => ({...p, [e.target.name]: e.target.value}))}
                      placeholder={f.placeholder}
                      className="w-full border border-primary/15 px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  name="message" value={form.message} required rows={5}
                  onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  placeholder="Tell us how we can help you..."
                  className="w-full border border-primary/15 px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:border-secondary transition-colors resize-none"
                />
              </div>
              <button type="submit" className="flex items-center gap-2 bg-primary text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-secondary transition-colors">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </ShopLayout>
  );
}
