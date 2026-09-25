'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products as staticProducts, getProductPrice, getProductOriginalPrice, Product } from '@/data/products';
import { supabase } from '@/lib/supabase';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Star, Plus, Minus, ShieldCheck, Leaf, Truck, Heart, ChevronRight, CheckCircle2, Package, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props { params: Promise<{ slug: string }> }

export default function ProductPage({ params }: Props) {
  const resolvedParams = React.use(params);
  const initialProduct = staticProducts.find(p => p.slug === resolvedParams.slug);
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [qty, setQty] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(initialProduct?.weight[0] ?? '');

  React.useEffect(() => {
    supabase.from('products').select('*').eq('slug', resolvedParams.slug).maybeSingle().then(({ data }) => {
      if (!data) return;
      const mapped: Product = {
        id: data.id, name: data.name, slug: data.slug, category: data.category, price: Number(data.price),
        originalPrice: data.original_price == null ? undefined : Number(data.original_price), image: data.image || '',
        rating: Number(data.rating || 0), reviewsCount: Number(data.reviews_count || 0), description: data.description || '',
        ingredients: data.ingredients || [], benefits: data.benefits || [], weight: data.weight || ['500g'],
        availability: data.availability, isNew: !!data.is_new, isBestSeller: !!data.is_best_seller, isFeatured: !!data.is_featured,
        discount: data.discount == null ? undefined : Number(data.discount), weightPrices: data.weight_prices || undefined,
      };
      setProduct(mapped);
      setSelectedWeight(mapped.weight[0] || '');
    });
  }, [resolvedParams.slug]);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'benefits'>('desc');
  const [added, setAdded] = useState(false);

  if (!product) return notFound();

  const isWishlisted = wishlist.includes(product.id);
  const related = staticProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedWeight);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-primary/50 mb-8">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-secondary transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-secondary transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square bg-amber-50 overflow-hidden group">
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5">
                  -{product.discount}% OFF
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1.5">NEW</div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-5">
            <div>
              <p className="text-xs text-secondary font-semibold tracking-widest uppercase mb-2 capitalize">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary leading-tight mb-3">{product.name}</h1>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-secondary text-secondary' : 'text-primary/20'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary">{product.rating}</span>
                <span className="text-xs text-primary/50">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">PKR {getProductPrice(product, selectedWeight).toLocaleString()}</span>
              {getProductOriginalPrice(product, selectedWeight) && (
                <span className="text-lg text-primary/40 line-through">PKR {getProductOriginalPrice(product, selectedWeight)!.toLocaleString()}</span>
              )}
              {getProductOriginalPrice(product, selectedWeight) && getProductOriginalPrice(product, selectedWeight)! > getProductPrice(product, selectedWeight) && (
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5">
                  Save {Math.round((1 - getProductPrice(product, selectedWeight) / getProductOriginalPrice(product, selectedWeight)!) * 100)}%
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.availability === 'in-stock' ? 'bg-green-500' : product.availability === 'low-stock' ? 'bg-amber-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-semibold ${product.availability === 'in-stock' ? 'text-green-600' : product.availability === 'low-stock' ? 'text-amber-600' : 'text-red-600'}`}>
                {product.availability === 'in-stock' ? 'In Stock' : product.availability === 'low-stock' ? 'Low Stock — Order Soon' : 'Out of Stock'}
              </span>
            </div>

            {/* Weight Selection */}
            <div>
              <p className="text-xs font-semibold text-primary/60 tracking-widest uppercase mb-2">Select Weight</p>
              <div className="flex gap-2">
                {product.weight.map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 text-sm font-semibold border transition-all ${selectedWeight === w ? 'bg-primary text-white border-primary' : 'border-primary/20 text-primary hover:border-secondary'}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-primary/20">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-primary">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.availability === 'out-of-stock'}
                className={`flex-1 py-3 font-bold text-sm tracking-wider uppercase transition-all ${added ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-secondary'} disabled:opacity-40`}
              >
                {added ? '✓ Added to Cart!' : product.availability === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 flex items-center justify-center border transition-colors ${isWishlisted ? 'border-red-400 bg-red-50 text-red-500' : 'border-primary/20 text-primary hover:border-red-400 hover:text-red-500'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-primary/10 pt-5">
              {[
                { icon: <ShieldCheck className="w-4 h-4" />, label: '100% Authentic' },
                { icon: <Leaf className="w-4 h-4" />, label: 'No Preservatives' },
                { icon: <Truck className="w-4 h-4" />, label: 'Home Delivery' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center p-3 bg-amber-50">
                  <span className="text-secondary">{b.icon}</span>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-primary/15 mb-6">
            {(['desc', 'ingredients', 'benefits'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors ${activeTab === tab ? 'border-secondary text-secondary' : 'border-transparent text-primary/50 hover:text-primary'}`}
              >
                {tab === 'desc' ? 'Description' : tab === 'ingredients' ? 'Ingredients' : 'Benefits'}
              </button>
            ))}
          </div>
          <div className="max-w-2xl">
            {activeTab === 'desc' && <p className="text-sm text-primary/70 leading-relaxed">{product.description}</p>}
            {activeTab === 'ingredients' && (
              <ul className="grid grid-cols-2 gap-2">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-primary/70">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> {ing}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'benefits' && (
              <ul className="space-y-2">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-primary/70">
                    <Leaf className="w-4 h-4 text-green-600 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-primary/5 p-6 mb-20">
          {[
            { icon: <Truck className="w-5 h-5 text-secondary" />, title: 'Nationwide Delivery', desc: '3-5 business days across Pakistan' },
            { icon: <Package className="w-5 h-5 text-secondary" />, title: 'Secure Packaging', desc: 'Air-tight jars to preserve freshness' },
            { icon: <RefreshCcw className="w-5 h-5 text-secondary" />, title: 'Easy Returns', desc: '7-day return policy on all orders' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-white flex items-center justify-center">{item.icon}</div>
              <div>
                <p className="text-sm font-bold text-primary">{item.title}</p>
                <p className="text-xs text-primary/60 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-primary mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
