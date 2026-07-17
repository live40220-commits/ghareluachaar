'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Plus, Minus, ShieldCheck, Heart, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const QuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  // Initialize selected weight
  const weights = quickViewProduct.weight;
  const currentWeight = selectedWeight || weights[0];
  const isLiked = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentWeight);
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedWeight('');
  };

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedWeight('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative bg-bg-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-secondary/20 flex flex-col md:flex-row z-55 rounded-none"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 text-text-dark hover:bg-primary hover:text-white transition-all z-10 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Gallery */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center bg-white border-b md:border-b-0 md:border-r border-secondary/10">
          <div className="relative aspect-square w-full max-w-[320px] overflow-hidden bg-bg-cream border border-secondary/5">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                {quickViewProduct.category}
              </span>
              <h2 className="font-display font-medium text-2xl text-primary mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-dark/50 font-medium">
                  {quickViewProduct.rating} / 5.0 ({quickViewProduct.reviewsCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-xl font-bold text-primary">
                Rs. {quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-text-dark/40 line-through">
                  Rs. {quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-text-dark/70 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Weights selection */}
            {weights.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-dark">Select Weight:</span>
                <div className="flex gap-2">
                  {weights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-4 py-1.5 text-xs font-medium border transition-all ${
                        currentWeight === w
                          ? 'border-primary bg-primary text-white'
                          : 'border-secondary/35 bg-white text-text-dark hover:border-secondary'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Short Preview */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-text-dark/80">
              <div className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-secondary" />
                <span>100% Homemade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>No Preservatives</span>
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="space-y-4 pt-6 mt-6 border-t border-secondary/10">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-secondary/25 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-text-dark hover:bg-bg-cream transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-sm font-semibold text-text-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-text-dark hover:bg-bg-cream transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-primary text-white text-xs font-semibold tracking-widest hover:bg-secondary transition-colors"
              >
                ADD TO BAG
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 border border-secondary/20 bg-white transition-colors ${
                  isLiked ? 'text-primary' : 'text-text-dark hover:text-primary'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${quickViewProduct.slug}`}
              onClick={handleClose}
              className="text-center block text-xs text-secondary hover:text-primary font-semibold underline tracking-wide"
            >
              VIEW FULL PRODUCT DETAILS
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
