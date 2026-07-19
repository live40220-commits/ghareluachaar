'use client';

import React, { useState } from 'react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <ShopLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-bg-cream">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md bg-white border border-secondary/15 p-8 shadow-premium"
        >
          {sent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary mb-2">Check Your Email</h2>
              <p className="text-xs text-text-muted mb-6">
                We have sent password recovery instructions to <strong>{email}</strong>
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs font-black tracking-widest uppercase hover:bg-secondary transition-colors">
                Back to Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Recovery</span>
                <h1 className="font-display text-3xl font-bold text-primary mt-1">Reset Password</h1>
                <p className="text-xs text-text-muted mt-1">Enter your email and we'll send you recovery details</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="ahmed@email.com"
                      className="w-full border border-primary/15 pl-10 pr-4 py-3 text-xs text-primary input-premium" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  Send Reset Link <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-secondary/10 text-center">
                <Link href="/login" className="text-xs text-text-muted hover:text-primary transition-colors">
                  Remember password? Sign In
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </ShopLayout>
  );
}
