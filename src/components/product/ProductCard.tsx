'use client';

import React, { useState } from 'react';
import { Product, getProductPriceRange, getProductOriginalPriceRange } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { Heart, Eye, ShoppingCart, Star, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useShop();
  const [added, setAdded] = useState(false);

  const isLiked = isInWishlist(product.id);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.weight[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className="group relative bg-white border border-secondary/10 flex flex-col h-full card-lift overflow-hidden"
    >
      {/* ── Badges ── */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
        {product.discount && (
          <span className="badge-sale text-[9px] font-black px-2 py-0.5 tracking-wider rounded-sm">
            -{product.discount}%
          </span>
        )}
        {product.isBestSeller && (
          <span className="badge-hot text-[9px] font-black px-2 py-0.5 tracking-wider rounded-sm">
            BEST SELLER
          </span>
        )}
        {product.isNew && (
          <span className="badge-new text-[9px] font-black px-2 py-0.5 tracking-wider rounded-sm">
            NEW
          </span>
        )}
      </div>

      {/* ── Hover Action Buttons ── */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md border border-secondary/10 transition-colors ${
            isLiked ? 'text-red-500' : 'text-text-dark/50 hover:text-red-500'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={e => { e.preventDefault(); setQuickViewProduct(product); }}
          className="w-8 h-8 rounded-full bg-white text-text-dark/50 hover:text-secondary flex items-center justify-center shadow-md border border-secondary/10 transition-colors"
          title="Quick View"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Image ── */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden bg-bg-warm" style={{ aspectRatio: '1/1' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          priority={priority}
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* ── Slide-up Quick Add ── */}
      <div className="slide-up-overlay absolute bottom-0 left-0 right-0 z-10">
        <button
          onClick={handleQuickAdd}
          className={`w-full py-2.5 text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
            added ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-secondary'
          }`}
        >
          {added ? <><Check className="w-3.5 h-3.5" /> ADDED!</> : <><ShoppingCart className="w-3.5 h-3.5" /> ADD TO BAG</>}
        </button>
      </div>

      {/* ── Info ── */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] uppercase font-bold text-secondary tracking-widest block mb-1">
            {product.category}
          </span>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display font-semibold text-sm text-text-dark hover:text-primary transition-colors line-clamp-2 leading-snug mb-1.5">
              {product.name}
            </h3>
          </Link>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
                  style={{ fill: i < Math.floor(product.rating) ? '#C8A96E' : '#E5E7EB', color: i < Math.floor(product.rating) ? '#C8A96E' : '#E5E7EB' }}
                />
              ))}
            </div>
            <span className="text-[9px] text-text-dark/40 font-medium">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between mt-1 pt-2 border-t border-secondary/8">
          <div>
            {getProductOriginalPriceRange(product) && (
              <span className="price-original text-[10px] block line-through">{getProductOriginalPriceRange(product)}</span>
            )}
            <span className="price-sale text-sm">{getProductPriceRange(product)}</span>
            {(() => {
              const orig = getProductOriginalPriceRange(product);
              if (orig) {
                const origMin = product.weightPrices
                  ? Math.min(...Object.values(product.weightPrices).map(wp => wp.originalPrice ?? wp.price))
                  : (product.originalPrice ?? product.price);
                const priceMin = product.weightPrices
                  ? Math.min(...Object.values(product.weightPrices).map(wp => wp.price))
                  : product.price;
                const saved = origMin - priceMin;
                if (saved > 0) return <span className="price-save block mt-0.5">Save Rs. {saved.toLocaleString()}+</span>;
              }
              return null;
            })()}
          </div>
          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${
            product.availability === 'in-stock' ? 'bg-green-50 text-green-700' :
            product.availability === 'low-stock' ? 'bg-amber-50 text-amber-700' :
            'bg-red-50 text-red-700'
          }`}>
            {product.availability === 'in-stock' ? 'In Stock' : product.availability === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
