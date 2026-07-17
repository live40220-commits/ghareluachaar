'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { AnnouncementBar } from './AnnouncementBar';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products, CATEGORIES } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { cart, wishlist, user, setIsCartOpen } = useShop();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isSticky, setIsSticky] = useState(false);

  // Handle sticky navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle live search suggestions
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
    setSearchResults(filtered);
  }, [searchQuery]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <AnnouncementBar />
      
      <header
        className={`w-full z-45 transition-all duration-300 ${
          isSticky
            ? 'fixed top-0 left-0 right-0 glass shadow-md py-3'
            : 'relative bg-bg-cream border-b border-secondary/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1 text-text-dark hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center text-center">
            <span className="font-display font-bold text-xl md:text-2xl text-primary tracking-widest leading-none">
              GHARELU ACHAAR
            </span>
            <span className="text-[7px] md:text-[9px] text-secondary font-semibold tracking-[0.25em] uppercase mt-1">
              Pure Homemade Taste
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors">
              HOME
            </Link>
            
            {/* Shop Mega Menu Trigger */}
            <div className="relative group">
              <Link href="/shop" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors flex items-center gap-1">
                SHOP
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full -left-10 hidden group-hover:block bg-white border border-secondary/15 p-4 shadow-xl min-w-[200px] mt-2 z-50">
                <div className="flex flex-col space-y-2.5">
                  <Link href="/shop" className="text-[11px] font-semibold text-text-dark hover:text-primary transition-colors">
                    ALL PRODUCTS
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shop?category=${cat.slug}`}
                      className="text-[11px] text-text-dark/80 hover:text-primary transition-colors"
                    >
                      {cat.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/shop?filter=best-sellers" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors">
              BEST SELLERS
            </Link>
            <Link href="/shop?filter=new-arrivals" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors">
              NEW ARRIVALS
            </Link>
            <Link href="/blogs" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors">
              BLOGS & RECIPES
            </Link>
            <Link href="/about" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors">
              OUR STORY
            </Link>
            <Link href="/contact" className="text-xs font-semibold tracking-wider text-text-dark hover:text-secondary transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-text-dark hover:text-primary transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-1 text-text-dark hover:text-primary transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-bg-cream">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 text-text-dark hover:text-primary transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-bg-cream">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Profile */}
            <Link
              href={user ? '/account' : '/login'}
              className="p-1 text-text-dark hover:text-primary transition-colors"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Instant Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-full bg-bg-cream border-b border-secondary/20 p-6 md:p-8"
            >
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <h3 className="font-display font-medium text-lg text-primary tracking-wide">
                  Instant Store Search
                </h3>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 text-text-dark hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="max-w-4xl mx-auto mt-4 relative">
                <input
                  type="text"
                  placeholder="Search homemade pickles, raw honey, apple murabba..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-secondary/20 px-4 py-3 pl-12 text-sm text-text-dark focus:outline-none focus:border-primary shadow-inner"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dark/40" />

                {/* Live Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-secondary/15 shadow-2xl z-55 overflow-hidden">
                    <div className="p-3 bg-bg-cream/40 border-b border-secondary/5 text-[10px] uppercase font-bold tracking-wider text-secondary">
                      Search Suggestions
                    </div>
                    <div className="divide-y divide-secondary/5">
                      {searchResults.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-bg-cream transition-colors"
                        >
                          <div className="relative w-10 h-10 border border-secondary/10 bg-white">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-primary">{p.name}</h4>
                            <p className="text-[10px] text-text-dark/50 capitalize">{p.category}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-primary">Rs. {p.price}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            <div className="flex-1" onClick={() => setIsSearchOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-bg-cream flex flex-col p-6 shadow-2xl border-r border-secondary/20"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 p-1 text-text-dark hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-8 flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors"
                >
                  HOME
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors border-b border-secondary/10 pb-2"
                >
                  SHOP ALL PRODUCTS
                </Link>

                <div className="flex flex-col space-y-2 pl-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-xs text-text-dark/85 hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/shop?filter=best-sellers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors border-t border-secondary/10 pt-2"
                >
                  BEST SELLERS
                </Link>
                <Link
                  href="/shop?filter=new-arrivals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors"
                >
                  NEW ARRIVALS
                </Link>
                <Link
                  href="/blogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors"
                >
                  BLOGS & RECIPES
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors"
                >
                  OUR STORY
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-medium text-lg text-primary hover:text-secondary transition-colors"
                >
                  CONTACT
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
