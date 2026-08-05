'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, ShieldCheck, Truck, Leaf, Star } from 'lucide-react';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { CATEGORIES, products } from '@/data/products';

const HERO_SLIDES = [
  {
    image: '/images/hero/hero_banner_1.png',
    alt: 'Gharelu Achaar - Bring home the taste of tradition',
    title: 'Bring Home The',
    titleHighlight: 'Taste of Tradition',
    subtitle: 'Authentic homemade achaar made with love & traditional recipes.',
    cta: { label: 'Shop Now', href: '/shop' },
    ctaSecondary: { label: 'View All Pickles', href: '/shop?category=pickles' },
  },
  {
    image: '/images/products/new_product_1.webp',
    alt: 'Desi Lasoora and Garlic Pickles - Heritage recipes of Punjab',
    title: 'Heritage Recipes of',
    titleHighlight: 'Desi Pickles',
    subtitle: 'Soft, flavorful, and perfectly cured in pure cold-pressed mustard oil.',
    cta: { label: 'Explore Pickles', href: '/shop?category=pickles' },
    ctaSecondary: { label: 'Best Sellers', href: '/shop?filter=best-sellers' },
  },
  {
    image: '/images/products/new_product_0.jpg',
    alt: 'Special Pickle Bundles and Hampers for Family',
    title: 'Perfect Gifts',
    titleHighlight: 'For Your Loved Ones',
    subtitle: 'Share the taste of home with our beautifully curated pickle assortments.',
    cta: { label: 'Shop Bundles', href: '/shop?category=bundles' },
    ctaSecondary: { label: 'All Products', href: '/shop' },
  },
];

const CATEGORY_IMAGES: Record<string, string> = {
  pickles: '/images/products/mango_pickle.png',
  bundles: '/images/products/mango_pickle.png',
};

const TRUST_BADGES = [
  { icon: <Leaf className="w-5 h-5" />, title: '100% Natural', desc: 'No preservatives or artificial colors' },
  { icon: <Truck className="w-5 h-5" />, title: 'Free Shipping', desc: 'On orders above Rs. 2,000' },
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Hygiene Certified', desc: 'Made in clean, hygienic kitchens' },
  { icon: <Star className="w-5 h-5" />, title: '15,000+ Customers', desc: 'Rated 4.9/5 across Pakistan' },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 md:mb-14">
      <h2 className="font-display text-3xl md:text-4xl text-primary uppercase tracking-[0.15em] font-light">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="block w-12 h-px bg-secondary/40" />
        <span className="text-secondary text-sm">✦</span>
        <span className="block w-12 h-px bg-secondary/40" />
      </div>
      {subtitle && <p className="text-text-muted text-xs md:text-sm mt-4 tracking-wider font-light">{subtitle}</p>}
    </div>
  );
}

function SectionHeader({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex items-end justify-between border-b border-secondary/20 pb-4 mb-8">
      <h2 className="font-display text-2xl md:text-3xl text-primary uppercase tracking-[0.15em] font-light">
        {label}
      </h2>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[10px] font-semibold text-secondary hover:text-primary transition-colors uppercase tracking-[0.2em]"
      >
        View all <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(current => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.filter(product => product.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(product => product.isNew).slice(0, 4);
  const allProducts = products.slice(0, 8);

  const prev = () => setSlide(current => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setSlide(current => (current + 1) % HERO_SLIDES.length);

  const currentSlide = HERO_SLIDES[slide];

  return (
    <ShopLayout>

      {/* ── Hero Slider ── */}
      <section className="relative w-full overflow-hidden bg-bg-warm">
        <div className="relative h-[52vh] min-h-[360px] md:h-[75vh]">
          <Image
            key={currentSlide.image}
            src={currentSlide.image}
            alt={currentSlide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-opacity duration-700"
          />

          {/* Dark gradient overlay on left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

          {/* Text content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
              <div className="max-w-lg">
                <p className="text-secondary text-xs font-semibold uppercase tracking-[0.4em] mb-4">
                  ✦ Gharelu Achaar ✦
                </p>
                <h1 className="font-display text-4xl md:text-6xl text-white leading-tight font-light tracking-wide">
                  {currentSlide.title}
                  <br />
                  <span className="text-secondary italic font-serif">{currentSlide.titleHighlight}</span>
                </h1>
                <p className="text-white/70 text-sm md:text-base mt-6 mb-8 leading-relaxed max-w-md font-light tracking-wide">
                  {currentSlide.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={currentSlide.cta.href}
                    className="inline-flex items-center justify-center min-w-[160px] bg-secondary text-white font-semibold text-[11px] px-8 py-3.5 hover:bg-white hover:text-primary transition-all duration-300 tracking-[0.2em] uppercase"
                  >
                    {currentSlide.cta.label}
                  </Link>
                  <Link
                    href={currentSlide.ctaSecondary.href}
                    className="inline-flex items-center justify-center min-w-[160px] border border-white/40 text-white font-semibold text-[11px] px-8 py-3.5 hover:bg-white hover:text-primary transition-all duration-300 tracking-[0.2em] uppercase"
                  >
                    {currentSlide.ctaSecondary.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 border border-white/40 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
            aria-label="Previous hero image"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 border border-white/40 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
            aria-label="Next hero image"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.image}
                onClick={() => setSlide(index)}
                className={`rounded-full transition-all ${index === slide ? 'w-8 h-2 bg-secondary' : 'w-2 h-2 bg-white/60'}`}
                aria-label={`Show hero image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-white border-y border-secondary/20 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-secondary/20">
            {TRUST_BADGES.map(badge => (
              <div key={badge.title} className="flex flex-col items-center text-center gap-4 px-4">
                <span className="text-secondary p-3 rounded-full bg-bg-cream border border-secondary/20 shadow-sm">{badge.icon}</span>
                <div>
                  <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{badge.title}</p>
                  <p className="text-text-muted text-[10px] leading-relaxed mt-1.5 font-light">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop The Favourites / Categories ── */}
      <section className="bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title="Shop The Favourites" subtitle="Explore our handcrafted collections" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-5">
            {CATEGORIES.map(category => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span className="relative block w-20 h-20 md:w-28 md:h-28 rounded-full p-1 border border-secondary/30 group-hover:border-secondary transition-colors duration-500">
                  <span className="relative block w-full h-full overflow-hidden rounded-full bg-bg-warm">
                    <Image
                      src={CATEGORY_IMAGES[category.slug]}
                      alt={category.name}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </span>
                </span>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-text-dark group-hover:text-primary transition-colors mt-2">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banners ── */}
      <section className="py-10 md:py-16 bg-bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { image: '/images/hero/hero_banner_1.png', href: '/shop?category=pickles', label: 'SHOP PICKLES', title: 'Authentic Achaar' },
            { image: '/images/hero/hero_banner_2.png', href: '/shop?category=bundles', label: 'SHOP BUNDLES', title: 'Shahi Pickle Bundles' },
          ].map(item => (
            <Link
              key={item.image}
              href={item.href}
              className="relative block aspect-[2/1] overflow-hidden group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.05] transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-4 md:inset-6 border border-white/30 flex flex-col items-center justify-center text-center p-4 transition-all duration-500 group-hover:border-white/50">
                <p className="text-white font-display text-2xl md:text-3xl font-light tracking-[0.1em] uppercase mb-4">{item.title}</p>
                <span className="inline-block text-[9px] font-semibold tracking-[0.3em] uppercase text-white bg-primary/90 backdrop-blur-sm px-6 py-2.5 hover:bg-secondary transition-colors">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader label="Best Selling" href="/shop?filter=best-sellers" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-10 md:py-16 bg-bg-cream border-y border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader label="New Arrivals" href="/shop?filter=new-arrivals" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── All Products ── */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader label="All Products" href="/shop" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center min-w-[200px] border border-primary text-primary font-semibold text-[11px] px-8 py-3.5 hover:bg-primary hover:text-white transition-all duration-300 tracking-[0.2em] uppercase"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── WhatsApp Float ── */}
      <a
        href="https://wa.me/923001234567?text=Hi%20Gharelu%20Achaar!%20I%20want%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-green-600 transition-colors"
        title="Chat on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </ShopLayout>
  );
}
