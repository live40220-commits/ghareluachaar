'use client';

import React, { useState } from 'react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login } = useShop();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && !name) {
      setMsg('Please enter your name.');
      return;
    }
    
    login(email, name || 'Customer');
    
    // Redirect admin to admin panel, users to their account
    if (email.trim().toLowerCase() === 'admin@ghareluachaar.pk') {
      router.push('/admin');
    } else {
      router.push('/account');
    }
  };

  return (
    <ShopLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-bg-cream">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md bg-white border border-secondary/15 p-8 shadow-premium"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Authentication</span>
            <h1 className="font-display text-3xl font-bold text-primary mt-1">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-text-muted mt-1">
              {isRegister ? 'Register to manage orders and track wishlist' : 'Sign in to access your profile'}
            </p>
          </div>

          {msg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 mb-4 font-bold">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Ahmed Khan"
                    className="w-full border border-primary/15 pl-10 pr-4 py-3 text-xs text-primary input-premium" 
                  />
                </div>
              </div>
            )}

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

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                <input 
                  type="password" 
                  required 
                  defaultValue="123456"
                  placeholder="••••••"
                  className="w-full border border-primary/15 pl-10 pr-4 py-3 text-xs text-primary input-premium" 
                />
              </div>
            </div>

            {!isRegister && (
              <div className="text-right">
                <Link href="/forgot-password" className="text-[10px] text-secondary font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              {isRegister ? 'Sign Up' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-secondary/10 text-center">
            <button 
              onClick={() => { setIsRegister(!isRegister); setMsg(''); }}
              className="text-xs text-text-muted hover:text-primary transition-colors"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 text-[9px] text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/40" /> 100% secure connection
          </div>
        </motion.div>
      </div>
    </ShopLayout>
  );
}
