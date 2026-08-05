'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

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
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-secondary hover:border-secondary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-secondary hover:border-secondary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-secondary hover:border-secondary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM15.194 12L10 15V9l5.194 3z" clipRule="evenodd" />
              </svg>
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
              <Link href="/shop?category=bundles" className="hover:text-secondary hover:underline transition-colors">
                Pickle Bundles
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
