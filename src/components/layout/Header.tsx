'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useShop } from '@/context/ShopContext';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products, CATEGORIES } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_CATEGORIES = [
  { label: 'New Arrivals', href: '/shop?filter=new-arrivals' },
  { label: 'Pickles', href: '/shop?category=pickles' },
  { label: 'Best Selling', href: '/shop?filter=best-sellers' },
  { label: 'Bundles', href: '/shop?category=bundles' },
  { label: 'All Products', href: '/shop' },
];

export const Header: React.FC = () => {
  const { cart, wishlist, user, setIsCartOpen } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [isSearchOpen]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* ── Top Bar: Logo + Actions ── */}
      <div
        className={`w-full z-45 transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 left-0 right-0 glass shadow-premium-lg'
            : 'relative bg-bg-cream border-b border-secondary/10'
        }`}
      >
        {/* Top info bar */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-1.5 border-b border-secondary/10 text-[10px] text-text-muted">
          <span className="font-semibold tracking-wide">📦 Free Shipping on orders above Rs. 2,000</span>
          <span className="font-semibold tracking-wide">Customer Service — <a href="tel:+923001234567" className="text-primary hover:underline">WhatsApp & Call: 0300-1234567</a></span>
        </div>

        {/* Main header row */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Mobile: Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-text-dark hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center text-center shrink-0">
            <span className="font-display font-bold text-xl md:text-2xl text-primary tracking-[0.15em] leading-none">
              GHARELU ACHAAR
            </span>
            <span className="text-[7px] md:text-[8px] text-secondary font-semibold tracking-[0.3em] uppercase mt-0.5">
              Pure Homemade Taste, Delivered Fresh
            </span>
          </Link>

          {/* Desktop middle nav links */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <Link href="/" className="nav-link text-[11px] font-semibold tracking-widest text-text-dark hover:text-primary transition-colors uppercase">Home</Link>
            <Link href="/shop" className="nav-link text-[11px] font-semibold tracking-widest text-text-dark hover:text-primary transition-colors uppercase">Shop</Link>
            <Link href="/about" className="nav-link text-[11px] font-semibold tracking-widest text-text-dark hover:text-primary transition-colors uppercase">Our Story</Link>
            <Link href="/blogs" className="nav-link text-[11px] font-semibold tracking-widest text-text-dark hover:text-primary transition-colors uppercase">Recipes</Link>
            <Link href="/contact" className="nav-link text-[11px] font-semibold tracking-widest text-text-dark hover:text-primary transition-colors uppercase">Contact</Link>
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-text-dark hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/wishlist" className="p-1.5 text-text-dark hover:text-primary transition-colors relative" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-1 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-primary text-white text-[10px] font-bold tracking-wider px-3 py-1.5 hover:bg-secondary transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden md:inline">CART</span>
              {totalCartItems > 0 && (
                <span className="bg-secondary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
                  {totalCartItems}
                </span>
              )}
            </button>

              <Link href={user?.isAdmin ? '/admin' : (user ? '/account' : '/login')} className="hidden md:flex p-1.5 text-text-dark hover:text-primary transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
          </div>
        </div>

        <nav className="hidden md:block bg-white border-t border-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
            <div className="flex items-center justify-between gap-8 min-w-max h-12">
              {NAV_CATEGORIES.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[12px] font-black uppercase tracking-[0.24em] text-primary hover:text-secondary transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Scroll offset spacer when sticky */}
      {isScrolled && <div className="h-[112px]" />}

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white border-b border-secondary/15 shadow-2xl"
            >
              <div className="max-w-3xl mx-auto px-4 py-5">
                <div className="flex items-center gap-3 mb-1">
                  <Search className="w-5 h-5 text-primary/50 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search pickles, bundles..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 text-base text-text-dark focus:outline-none bg-transparent placeholder-text-dark/30"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-1 text-text-dark/50 hover:text-primary transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Results */}
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 border-t border-secondary/10 pt-3">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-secondary mb-2">Products Found</p>
                      <div className="space-y-1">
                        {searchResults.map(p => (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-bg-cream rounded-sm transition-colors group"
                          >
                            <div className="relative w-10 h-10 bg-bg-cream overflow-hidden shrink-0">
                              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors truncate">{p.name}</p>
                              <p className="text-[10px] text-text-dark/50 capitalize">{p.category}</p>
                            </div>
                            <span className="text-sm font-bold text-primary shrink-0">Rs. {p.price.toLocaleString()}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {searchQuery && searchResults.length === 0 && (
                      <p className="text-sm text-text-dark/40 pt-3 border-t border-secondary/10 mt-2">
                        No products found for <strong>{searchQuery}</strong>
                      </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="relative w-72 bg-bg-cream h-full flex flex-col shadow-2xl border-r border-secondary/15 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-secondary/10 bg-primary">
                <span className="font-display font-bold text-lg text-white tracking-widest">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Links */}
              <div className="flex-1 p-5 space-y-1">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'All Products', href: '/shop' },
                  { label: 'Best Sellers', href: '/shop?filter=best-sellers' },
                  { label: 'New Arrivals', href: '/shop?filter=new-arrivals' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="block py-2.5 text-sm font-semibold text-primary hover:text-secondary border-b border-secondary/10 transition-colors">{l.label}</Link>
                ))}

                <p className="text-[9px] font-bold uppercase tracking-widest text-secondary pt-4 pb-1">Categories</p>
                {CATEGORIES.map(cat => (
                  <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="block py-2 text-sm text-text-dark hover:text-primary border-b border-secondary/5 transition-colors pl-2">
                    {cat.name}
                  </Link>
                ))}

                <p className="text-[9px] font-bold uppercase tracking-widest text-secondary pt-4 pb-1">Info</p>
                {[
                  { label: 'Our Story', href: '/about' },
                  { label: 'Recipes & Blog', href: '/blogs' },
                  { label: 'FAQs', href: '/faq' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Track Order', href: '/track-order' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="block py-2 text-sm text-text-dark hover:text-primary border-b border-secondary/5 transition-colors">{l.label}</Link>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-secondary/10 bg-primary/5">
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Support
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
