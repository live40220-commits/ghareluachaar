'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { useShop } from '@/context/ShopContext';
import { products } from '@/data/products';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  // Resolve wishlist IDs to product objects
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h1 className="font-display text-3xl font-bold text-primary mb-1">My Wishlist</h1>
        <p className="text-xs text-text-muted mb-8">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}</p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 text-primary/15 mx-auto mb-4" />
            <p className="font-display text-2xl text-primary mb-2">Your wishlist is empty</p>
            <p className="text-sm text-text-muted mb-6">Save products you love for later.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs font-black tracking-widest hover:bg-secondary transition-colors uppercase">
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence>
              {wishlistProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-white border border-secondary/10 overflow-hidden card-lift"
                >
                  {/* Remove */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                    {product.discount && <span className="badge-sale text-[9px] font-black px-1.5 py-0.5 rounded-sm">-{product.discount}%</span>}
                    {product.isNew && <span className="badge-new text-[9px] font-black px-1.5 py-0.5 rounded-sm">NEW</span>}
                  </div>

                  {/* Image */}
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative bg-bg-warm overflow-hidden" style={{ aspectRatio: '1/1' }}>
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 50vw, 25vw" />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-[9px] text-secondary font-black uppercase tracking-widest capitalize mb-1">{product.category}</p>
                    <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-primary line-clamp-2 hover:text-secondary transition-colors mb-2 block leading-snug">
                      {product.name}
                    </Link>
                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span className="font-bold text-primary text-sm">Rs. {product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-[10px] text-text-muted line-through">Rs. {product.originalPrice.toLocaleString()}</span>}
                    </div>
                    <button
                      onClick={() => addToCart(product, 1, product.weight[0])}
                      disabled={product.availability === 'out-of-stock'}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-wider hover:bg-secondary transition-colors disabled:opacity-40"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {product.availability === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
