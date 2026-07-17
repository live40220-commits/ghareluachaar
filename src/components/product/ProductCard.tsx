'use client';

import React from 'react';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useShop();

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.weight[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white border border-secondary/10 flex flex-col h-full shadow-premium hover:shadow-xl transition-all duration-400 overflow-hidden"
    >
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discount && (
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 tracking-wider">
            {product.discount}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-secondary text-white text-[10px] font-semibold px-2 py-0.5 tracking-wider">
            BEST SELLER
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#4A5D4E] text-white text-[10px] font-semibold px-2 py-0.5 tracking-wider">
            NEW
          </span>
        )}
      </div>

      {/* Action Buttons on Hover */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-9 h-9 rounded-full bg-white flex items-center justify-center border border-secondary/15 shadow-md transition-colors ${
            isLiked ? 'text-primary' : 'text-text-dark/60 hover:text-primary'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={() => setQuickViewProduct(product)}
          className="w-9 h-9 rounded-full bg-white text-text-dark/60 hover:text-secondary flex items-center justify-center border border-secondary/15 shadow-md transition-colors"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image Area */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-bg-cream border-b border-secondary/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={false}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Description / Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category */}
          <span className="text-[10px] uppercase font-semibold text-secondary tracking-widest">
            {product.category}
          </span>
          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display font-medium text-sm text-text-dark hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-text-dark/50 font-medium mt-0.5">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-secondary/5">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-text-dark/40 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
            <span className="text-sm font-semibold text-primary">
              Rs. {product.price}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1 bg-primary text-white text-[10px] font-semibold tracking-wider px-3 py-2 hover:bg-secondary transition-all shadow-sm hover:shadow-md"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            ADD TO BAG
          </button>
        </div>
      </div>
    </motion.div>
  );
};
