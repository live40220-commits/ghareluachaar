'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { blogs } from '@/data/blogs';
import { Search, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BLOG_CATEGORIES = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = blogs.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchQ = !query.trim() || b.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = blogs[0];

  return (
    <ShopLayout>
      {/* Hero */}
      <div className="bg-primary py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C8A96E 0,#C8A96E 1px,transparent 0,transparent 50%)', backgroundSize: '18px 18px' }} />
        <div className="relative z-10">
          <p className="text-secondary text-[10px] tracking-[0.3em] uppercase font-black mb-2">Gharelu Kitchen</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Recipes & Food Stories</h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg mx-auto">Traditional recipes, pickling guides, and stories from Pakistan's homemade food culture.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Featured Post */}
        {featured && (
          <Link href={`/blogs/${featured.slug}`} className="group block mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-secondary/15 overflow-hidden card-lift">
              <div className="relative aspect-video md:aspect-auto md:min-h-[340px] bg-bg-warm overflow-hidden">
                <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw, 50vw" />
                <span className="absolute top-4 left-4 bg-secondary text-white text-[9px] font-black px-3 py-1 uppercase tracking-wider">Featured</span>
              </div>
              <div className="p-8 md:p-10 bg-white flex flex-col justify-center">
                <span className="text-[9px] uppercase font-black tracking-widest text-secondary mb-3">{featured.category}</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-primary leading-tight mb-3 group-hover:text-secondary transition-colors">{featured.title}</h2>
                <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-[10px] text-text-muted mb-5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  <span>{featured.publishedAt}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                  READ FULL ARTICLE <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {BLOG_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'border-primary/20 text-primary hover:border-secondary hover:text-secondary'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/30" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles..." className="pl-8 pr-4 py-2 border border-primary/15 text-xs text-primary input-premium w-52" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.slice(1).map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={`/blogs/${blog.slug}`} className="group block bg-white border border-secondary/10 overflow-hidden card-lift h-full flex flex-col">
                <div className="relative aspect-video bg-bg-warm overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <span className="absolute bottom-3 left-3 bg-secondary text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">{blog.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] text-text-muted mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                    <span>{blog.publishedAt}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base text-primary leading-snug line-clamp-2 mb-2 group-hover:text-secondary transition-colors">{blog.title}</h3>
                  <p className="text-xs text-text-muted line-clamp-3 flex-1 mb-4">{blog.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary group-hover:text-primary transition-colors uppercase">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📖</p>
            <p className="font-display text-xl text-primary">No articles found</p>
            <p className="text-sm text-text-muted mt-1">Try a different category or search term.</p>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
