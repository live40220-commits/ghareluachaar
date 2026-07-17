'use client';

import React, { useState, useEffect } from 'react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { products, CATEGORIES } from '@/data/products';
import { blogs } from '@/data/blogs';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Heart, Leaf, Truck, Award, ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_SLIDES = [
  {
    image: '/images/hero/2.webp',
    title: 'THE ROYAL TASTE OF TRADITION',
    subtitle: '100% Pure Homemade Pickles & Preserves',
    description: 'Prepared using traditional recipes passed down through generations. Saturated in pure cold-pressed mustard oil and sun-cured to perfection.',
    cta: 'DISCOVER COLLECTION',
    link: '/shop?category=pickles'
  },
  {
    image: '/images/hero/3.webp',
    title: 'SWEETpreserves & VITALITY TONICS',
    subtitle: 'Premium Organic Fruit Murabbas',
    description: 'Infused with natural green cardamom and organic syrup. A traditional daily wellness tonic for cardiac health, memory, and physical vigor.',
    cta: 'EXPLORE MURABBAS',
    link: '/shop?category=murabba'
  },
  {
    image: '/images/hero/4.webp',
    title: 'ORGANIC WILD SIDR HONEY',
    subtitle: 'Sourced from the Karak Forests',
    description: '100% pure, raw, and unpasteurized Beri honey. Famous for its thick consistency, rich amber color, and immense healing properties.',
    cta: 'SHOP DESI HONEY',
    link: '/shop?category=honey'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter products
  const featuredPickles = products.filter((p) => p.category === 'pickles' && p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <ShopLayout>
      {/* 1. HERO AUTO-SLIDER */}
      <section className="relative w-full h-[65vh] md:h-[80vh] bg-[#1a0404] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].title}
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-50 scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            
            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="max-w-xl md:max-w-2xl space-y-4 md:space-y-6 text-white">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-secondary text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase block"
                  >
                    {HERO_SLIDES[currentSlide].subtitle}
                  </motion.span>
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-display font-bold text-3xl md:text-5xl text-white tracking-wider leading-tight"
                  >
                    {HERO_SLIDES[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs md:text-sm text-white/70 leading-relaxed font-light"
                  >
                    {HERO_SLIDES[currentSlide].description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-2"
                  >
                    <Link
                      href={HERO_SLIDES[currentSlide].link}
                      className="inline-flex items-center gap-2 bg-primary text-white border border-secondary/30 px-6 py-3 text-xs font-semibold tracking-widest hover:bg-secondary hover:text-white transition-all shadow-lg"
                    >
                      {HERO_SLIDES[currentSlide].cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all border border-secondary ${
                currentSlide === idx ? 'bg-secondary w-8' : 'bg-transparent hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="w-full bg-white py-10 border-b border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-3 space-y-2">
            <Leaf className="w-8 h-8 text-primary" />
            <h3 className="font-display font-medium text-sm text-primary">100% Natural & Organic</h3>
            <p className="text-[10px] text-text-dark/60">No chemicals, preservatives or synthetic flavoring used.</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 space-y-2 border-l border-secondary/10">
            <Award className="w-8 h-8 text-primary" />
            <h3 className="font-display font-medium text-sm text-primary">Authentic Heritage Recipes</h3>
            <p className="text-[10px] text-text-dark/60">Crafted using generational pickling techniques from Multan & Punjab.</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 space-y-2 border-l border-secondary/10">
            <Truck className="w-8 h-8 text-primary" />
            <h3 className="font-display font-medium text-sm text-primary">Safe Delivery Nationwide</h3>
            <p className="text-[10px] text-text-dark/60">Multi-layer shock-absorbent packaging guarantees glass safety.</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 space-y-2 border-l border-secondary/10">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h3 className="font-display font-medium text-sm text-primary">Satisfaction Guaranteed</h3>
            <p className="text-[10px] text-text-dark/60">Hassle-free refunds or instant replacements in case of damage.</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="w-full py-16 md:py-24 bg-bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-secondary">
              Handcrafted Treasures
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary">
              EXPLORE OUR SPECIALTIES
            </h2>
            <div className="w-20 h-0.5 bg-secondary mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 justify-center">
            {CATEGORIES.slice(0, 8).map((cat, idx) => {
              // Map categories to images dynamically
              const catImages = [
                '/images/products/pickle_1.webp',
                '/images/products/pickle_9.webp',
                '/images/products/pickle_13.webp',
                '/images/products/new_arrival_3.webp',
                '/images/products/new_arrival_1.webp',
                '/images/products/new_arrival_5.webp',
                '/images/products/new_arrival_6.webp',
                '/images/products/new_arrival_8.webp'
              ];
              return (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-secondary/20 bg-white group-hover:border-primary group-hover:scale-105 transition-all duration-300 shadow-md">
                    <Image
                      src={catImages[idx] || '/images/products/pickle_1.webp'}
                      alt={cat.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-text-dark group-hover:text-primary transition-colors tracking-wide mt-3 uppercase">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FLASH SALE / TODAY'S DEALS */}
      <section className="w-full bg-[#3d0808] py-12 text-white border-y border-secondary/25 relative overflow-hidden">
        {/* Abstract traditional vectors */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-secondary text-white text-[9px] font-bold px-2 py-0.5 tracking-widest uppercase">
              Limited Time Offer
            </span>
            <h3 className="font-display font-medium text-2xl md:text-3xl text-secondary">
              GRAND AZADI BUNDLE DEALS
            </h3>
            <p className="text-xs text-white/80 max-w-xl">
              Get our signature Mango Achaar (500g) + Royal Seb Murabba (500g) + Anardana Chutney (350g) with flat 21% off and FREE nationwide shipping!
            </p>
          </div>
          <div className="flex flex-col items-center shrink-0 space-y-2">
            <div className="flex gap-2 text-primary font-bold text-center">
              <div className="bg-white px-3 py-2 border border-secondary/20">
                <span className="text-base block">12</span>
                <span className="text-[8px] text-text-dark/60 uppercase">Hours</span>
              </div>
              <div className="bg-white px-3 py-2 border border-secondary/20">
                <span className="text-base block">45</span>
                <span className="text-[8px] text-text-dark/60 uppercase">Mins</span>
              </div>
              <div className="bg-white px-3 py-2 border border-secondary/20">
                <span className="text-base block">21</span>
                <span className="text-[8px] text-text-dark/60 uppercase">Secs</span>
              </div>
            </div>
            <Link
              href="/product/gharelu-shahi-dastarkhwan-bundle"
              className="bg-secondary text-white px-6 py-2.5 text-xs font-bold tracking-widest hover:bg-white hover:text-primary transition-all shadow-md"
            >
              GRAB DEAL FOR RS. 2,999
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TRENDING / BEST SELLERS */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between border-b border-secondary/15 pb-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-secondary">Customer Favorites</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-primary mt-1">BEST SELLING DELICACIES</h2>
            </div>
            <Link href="/shop?filter=best-sellers" className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
              VIEW ALL
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRAND STORY SECTION */}
      <section className="w-full py-20 bg-bg-cream border-t border-b border-secondary/10 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story Image */}
          <div className="relative aspect-square w-full max-w-md mx-auto border border-secondary/20 shadow-2xl p-4 bg-white">
            <div className="relative w-full h-full overflow-hidden bg-bg-cream">
              <Image
                src="/images/products/pickle_10.webp"
                alt="Traditional Achaar Curing Process"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-secondary uppercase block">
              ESTABLISHED 1998
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary leading-tight">
              FROM A GRANDMOTHER'S COURTYARD TO YOUR DASTARKHWAN
            </h2>
            <div className="w-16 h-0.5 bg-secondary" />
            
            <div className="text-xs md:text-sm text-text-dark/85 space-y-4 leading-relaxed font-light">
              <p>
                Gharelu Achaar began in the warm winter courtyards of Punjab, where Dadi Jaan prepared fresh pickles for neighbors, preserving raw seasonal mangoes in earthen pots under sun curing.
              </p>
              <p>
                Today, we maintain the exact same traditional standards. Every batch is produced under strict quality control, without shortcuts. We source local farm-fresh green mangoes, hand-peeled garlic cloves, and Karak Forest Sidr honey, preserving them naturally using cold-pressed mustard oil and sun curing.
              </p>
              <p className="font-semibold text-primary font-display italic text-base">
                "No machinery can mimic the warmth and flavor of hands that cook with love."
              </p>
            </div>
            
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary text-white border border-secondary/30 px-6 py-2.5 text-xs font-semibold tracking-widest hover:bg-secondary transition-all"
              >
                OUR FULL HISTORY
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between border-b border-secondary/15 pb-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-secondary">Just Sunkissed & Packaged</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-primary mt-1">NEW SEASON ARRIVALS</h2>
            </div>
            <Link href="/shop?filter=new-arrivals" className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
              VIEW ALL
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. RECIPES & BLOG PREVIEW */}
      <section className="w-full py-16 md:py-24 bg-bg-cream border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-secondary">Culinary Heritage</span>
            <h2 className="font-display font-bold text-3xl text-primary">RECIPES & HOMEMADE TIPS</h2>
            <div className="w-20 h-0.5 bg-secondary mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-secondary/10 flex flex-col h-full shadow-premium hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative aspect-video bg-bg-cream overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-3 left-3 bg-secondary text-white text-[9px] font-bold px-2 py-0.5 uppercase">
                    {blog.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-text-dark/50 font-medium">
                      {blog.publishedAt} • {blog.readTime}
                    </span>
                    <h3 className="font-display font-semibold text-base text-primary leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-text-dark/70 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-secondary/5">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      READ FULL ARTICLE
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM GALLERY */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-secondary">Connect With Us</span>
            <h2 className="font-display font-bold text-2xl text-primary">@GHARELUACHAAR.PK ON INSTAGRAM</h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              // Map social boxes to product images
              const galleryImages = [
                '/images/products/pickle_1.webp',
                '/images/products/pickle_2.webp',
                '/images/products/pickle_5.webp',
                '/images/products/pickle_9.webp',
                '/images/products/new_arrival_1.webp',
                '/images/products/new_arrival_6.webp'
              ];
              return (
                <div
                  key={num}
                  className="relative aspect-square border border-secondary/15 overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[num - 1]}
                    alt={`Instagram gallery post ${num}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-widest">FOLLOW US</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
