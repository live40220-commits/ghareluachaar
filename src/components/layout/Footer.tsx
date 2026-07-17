'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Youtube, Send, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-primary text-white border-t border-secondary/25 relative z-10">
      {/* Upper Footer: Branding & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-white/10">
        <div className="space-y-4">
          <Link href="/" className="flex flex-col">
            <span className="font-display font-bold text-2xl text-secondary tracking-widest leading-none">
              GHARELU ACHAAR
            </span>
            <span className="text-[9px] text-white/70 font-semibold tracking-[0.25em] uppercase mt-1">
              Pure Homemade Taste, Delivered Fresh
            </span>
          </Link>
          <p className="text-xs text-white/70 leading-relaxed max-w-sm">
            Bringing you the authentic, rich heritage of Pakistani kitchen table delicacies. Prepared by hand, cured under the sun, and delivered with premium quality right to your doorstep.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-secondary hover:border-secondary transition-colors">
              {/* Facebook SVG */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-secondary hover:border-secondary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-secondary hover:border-secondary transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <h4 className="font-display font-medium text-lg text-secondary tracking-wider">
            CONTACT DETAILS
          </h4>
          <ul className="space-y-3 text-xs text-white/80">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              <span>WhatsApp: +92 300 1234567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-secondary shrink-0" />
              <span>support@ghareluachaar.pk</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-secondary shrink-0" />
              <span>Heritage Hub, Multan Road, Lahore, Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Newsletter form */}
        <div className="space-y-4">
          <h4 className="font-display font-medium text-lg text-secondary tracking-wider">
            JOIN OUR NEWSLETTER
          </h4>
          <p className="text-xs text-white/70">
            Subscribe to receive traditional recipes, pickling guides, and exclusive discount announcements.
          </p>
          <form onSubmit={handleSubscribe} className="flex border border-white/20 bg-primary/20 focus-within:border-secondary transition-colors">
            <input
              type="email"
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-4 bg-secondary text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-secondary font-medium animate-pulse">
              Thank you! You have successfully joined the clan.
            </p>
          )}
        </div>
      </div>

      {/* Middle Footer: Links Columns */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">
        <div>
          <h5 className="text-xs font-semibold text-secondary tracking-widest uppercase mb-4">
            INFORMATION
          </h5>
          <ul className="space-y-2.5 text-[11px] text-white/70">
            <li>
              <Link href="/returns" className="hover:text-secondary hover:underline transition-colors">
                Returns And Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-secondary hover:underline transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-secondary hover:underline transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-secondary hover:underline transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-secondary hover:underline transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-secondary tracking-widest uppercase mb-4">
            CUSTOMER SERVICE
          </h5>
          <ul className="space-y-2.5 text-[11px] text-white/70">
            <li>
              <Link href="/faq" className="hover:text-secondary hover:underline transition-colors">
                FAQ's
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-secondary hover:underline transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-secondary hover:underline transition-colors">
                Support Hub
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-secondary hover:underline transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-secondary hover:underline transition-colors">
                Careers (Join Us)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-secondary tracking-widest uppercase mb-4">
            CATEGORIES
          </h5>
          <ul className="space-y-2.5 text-[11px] text-white/70">
            <li>
              <Link href="/shop?category=pickles" className="hover:text-secondary hover:underline transition-colors">
                Pickles (Achaar)
              </Link>
            </li>
            <li>
              <Link href="/shop?category=murabba" className="hover:text-secondary hover:underline transition-colors">
                Murabba Preserves
              </Link>
            </li>
            <li>
              <Link href="/shop?category=chutney" className="hover:text-secondary hover:underline transition-colors">
                Tangy Chutneys
              </Link>
            </li>
            <li>
              <Link href="/shop?category=honey" className="hover:text-secondary hover:underline transition-colors">
                Pure Sidr Honey
              </Link>
            </li>
            <li>
              <Link href="/shop?category=syrups" className="hover:text-secondary hover:underline transition-colors">
                Traditional Syrups
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-secondary tracking-widest uppercase mb-4">
            QUICK LINKS
          </h5>
          <ul className="space-y-2.5 text-[11px] text-white/70">
            <li>
              <Link href="/shop?filter=best-sellers" className="hover:text-secondary hover:underline transition-colors">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/shop?filter=new-arrivals" className="hover:text-secondary hover:underline transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-secondary hover:underline transition-colors">
                My Wishlist
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-secondary hover:underline transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-secondary hover:underline transition-colors">
                Food Recipes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer: Copyright & Payments */}
      <div className="bg-[#560C0C] py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/60">
          <p>© {new Date().getFullYear()} GHARELU ACHAAR. All Rights Reserved. Crafted with love in Pakistan.</p>
          
          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-2 py-0.5 border border-white/10 font-bold uppercase tracking-wider rounded-xs">Cash on Delivery</span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/10 font-bold uppercase tracking-wider rounded-xs">Bank Transfer</span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/10 font-bold uppercase tracking-wider rounded-xs">EasyPaisa</span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/10 font-bold uppercase tracking-wider rounded-xs">JazzCash</span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/10 font-bold uppercase tracking-wider rounded-xs text-[9px]">Stripe Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
