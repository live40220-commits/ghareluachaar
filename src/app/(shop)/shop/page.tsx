'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { products as staticProducts, CATEGORIES } from '@/data/products';
import { supabase } from '@/lib/supabase';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Best Sellers First', value: 'bestseller' },
  { label: 'Top Rated', value: 'rating' },
];

const bestSellers = staticProducts.filter(p => p.isBestSeller).slice(0, 3);

function ShopContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get('category') || 'all';
  const initFilter = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState(initCat);
  const [sortBy, setSortBy] = useState(initFilter === 'best-sellers' ? 'bestseller' : initFilter === 'new-arrivals' ? 'newest' : 'featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [availability, setAvailability] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ categories: true, availability: true, price: true });
  const [products, setProducts] = useState(staticProducts);

  useEffect(() => {
    supabase.from('products').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (!data?.length) return;
      setProducts(data.map((p: any) => ({
        id: p.id, name: p.name, slug: p.slug, category: p.category, price: Number(p.price),
        originalPrice: p.original_price == null ? undefined : Number(p.original_price), image: p.image || '',
        rating: Number(p.rating || 0), reviewsCount: Number(p.reviews_count || 0), description: p.description || '',
        ingredients: p.ingredients || [], benefits: p.benefits || [], weight: p.weight || ['500g'],
        availability: p.availability, isNew: !!p.is_new, isBestSeller: !!p.is_best_seller, isFeatured: !!p.is_featured,
        discount: p.discount == null ? undefined : Number(p.discount), weightPrices: p.weight_prices || undefined,
      })));
    });
  }, []);

  const toggle = (section: keyof typeof expandedSections) =>
    setExpandedSections(p => ({ ...p, [section]: !p[section] }));

  const filtered = useMemo(() => {
    let r = [...products];
    if (selectedCategory !== 'all') r = r.filter(p => p.category === selectedCategory);
    if (searchQuery.trim()) r = r.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    r = r.filter(p => p.price <= maxPrice);
    if (availability.length > 0) r = r.filter(p => availability.includes(p.availability));
    switch (sortBy) {
      case 'newest': r = r.filter(p => p.isNew).concat(r.filter(p => !p.isNew)); break;
      case 'price-asc': r.sort((a, b) => a.price - b.price); break;
      case 'price-desc': r.sort((a, b) => b.price - a.price); break;
      case 'bestseller': r = r.filter(p => p.isBestSeller).concat(r.filter(p => !p.isBestSeller)); break;
      case 'rating': r.sort((a, b) => b.rating - a.rating); break;
      default: r = r.filter(p => p.isFeatured).concat(r.filter(p => !p.isFeatured));
    }
    return r;
  }, [selectedCategory, sortBy, searchQuery, maxPrice, availability]);

  const toggleAvail = (val: string) =>
    setAvailability(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  const SidebarSection = ({ title, expanded, onToggle, children }: any) => (
    <div className="border-b border-secondary/10 py-4">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-left group">
        <span className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">{title}</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5 text-primary/40" /> : <ChevronDown className="w-3.5 h-3.5 text-primary/40" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const Sidebar = () => (
    <div className="space-y-0">
      {/* Categories */}
      <SidebarSection title="Categories" expanded={expandedSections.categories} onToggle={() => toggle('categories')}>
        <div className="space-y-1.5">
          <button onClick={() => setSelectedCategory('all')} className={`flex items-center justify-between w-full text-xs py-1 transition-colors ${selectedCategory === 'all' ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'}`}>
            <span>All Products</span>
            <span className="text-[9px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-sm">{products.length}</span>
          </button>
          {CATEGORIES.map(cat => {
            const count = products.filter(p => p.category === cat.slug).length;
            return (
              <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)} className={`flex items-center justify-between w-full text-xs py-1 transition-colors ${selectedCategory === cat.slug ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'}`}>
                <span>{cat.name}</span>
                <span className="text-[9px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-sm">{count}</span>
              </button>
            );
          })}
        </div>
      </SidebarSection>

      {/* Availability */}
      <SidebarSection title="Availability" expanded={expandedSections.availability} onToggle={() => toggle('availability')}>
        <div className="space-y-2">
          {[
            { val: 'in-stock', label: 'In Stock', color: 'bg-green-500' },
            { val: 'low-stock', label: 'Low Stock', color: 'bg-amber-500' },
            { val: 'out-of-stock', label: 'Out of Stock', color: 'bg-red-400' },
          ].map(opt => (
            <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={availability.includes(opt.val)} onChange={() => toggleAvail(opt.val)} className="accent-primary w-3.5 h-3.5" />
              <span className={`w-2 h-2 rounded-full ${opt.color}`} />
              <span className="text-xs text-text-muted group-hover:text-primary transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </SidebarSection>

      {/* Price */}
      <SidebarSection title="Price" expanded={expandedSections.price} onToggle={() => toggle('price')}>
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>Rs. 0</span>
            <span className="font-bold text-primary">Rs. {maxPrice.toLocaleString()}</span>
          </div>
          <input type="range" min={200} max={5000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-secondary h-1.5 cursor-pointer" />
          <button onClick={() => setMaxPrice(5000)} className="text-[10px] text-secondary hover:text-primary transition-colors">Reset</button>
        </div>
      </SidebarSection>

      {/* Bestselling Widget */}
      <div className="pt-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Bestselling</p>
        <div className="space-y-3">
          {bestSellers.map(p => (
            <a key={p.id} href={`/product/${p.slug}`} className="flex gap-3 group">
              <div className="relative w-12 h-12 bg-bg-warm overflow-hidden shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">{p.name}</p>
                <div className="flex gap-0.5 my-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5" style={{ fill: '#C8A96E', color: '#C8A96E' }} />)}
                </div>
                <p className="text-[11px] font-bold text-primary">Rs. {p.price.toLocaleString()}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ShopLayout>
      {/* Page Hero */}
      <div className="bg-primary py-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C8A96E 0,#C8A96E 1px,transparent 0,transparent 50%)', backgroundSize: '18px 18px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-secondary text-[10px] tracking-[0.3em] uppercase font-black mb-2">Gharelu Achaar Store</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Our Complete Collection</h1>
          <p className="text-white/60 text-xs mt-1">{products.length}+ premium homemade products, crafted with love in Pakistan.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Top Bar */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/30" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2.5 border border-primary/15 bg-white text-xs text-primary input-premium" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="w-3.5 h-3.5 text-primary/30" /></button>}
          </div>

          {/* Mobile filter toggle */}
          <button onClick={() => setSidebarOpen(true)} className="md:hidden flex items-center gap-1.5 px-4 py-2.5 border border-primary/15 text-xs font-semibold text-primary hover:border-secondary transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>

          {/* Sort */}
          <div className="relative ml-auto">
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 px-4 py-2.5 border border-primary/15 text-xs font-semibold text-primary hover:border-secondary transition-colors min-w-[160px] justify-between">
              <span>{SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-full mt-1 bg-white border border-primary/10 shadow-xl z-30 w-full min-w-[180px]">
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs hover:bg-secondary/8 hover:text-secondary transition-colors ${sortBy === opt.value ? 'text-secondary font-bold bg-secondary/5' : 'text-primary'}`}>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-5">
          <p className="text-xs text-text-muted">
            Showing <span className="font-bold text-primary">{filtered.length}</span> products
            {selectedCategory !== 'all' && <span> in <span className="text-secondary font-bold capitalize">{selectedCategory}</span></span>}
          </p>
          {(selectedCategory !== 'all' || searchQuery || availability.length > 0 || maxPrice < 5000) && (
            <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setAvailability([]); setMaxPrice(5000); }}
              className="text-[10px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 ml-2">
              <X className="w-3 h-3" /> Clear Filters
            </button>
          )}
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-52 shrink-0">
            <Sidebar />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🫙</p>
                <p className="text-xl font-display text-primary mb-2">No products found</p>
                <p className="text-sm text-text-muted">Try adjusting your filters.</p>
                <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className="mt-5 px-6 py-2.5 bg-primary text-white text-xs font-bold hover:bg-secondary transition-colors">
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product, i) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="absolute inset-0 bg-black/50" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-72 bg-white h-full overflow-y-auto p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-bold text-lg text-primary">Filters</p>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-text-muted" /></button>
              </div>
              <Sidebar />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ShopLayout>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
