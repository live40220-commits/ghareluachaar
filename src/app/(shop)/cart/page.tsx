'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { useShop } from '@/context/ShopContext';
import { products, getProductPrice } from '@/data/products';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, discountAmount, shippingFee, cartTotal, freeShippingThreshold, applyCoupon, couponCode } = useShop();
  const [couponInput, setCouponInput] = React.useState('');
  const [couponMsg, setCouponMsg] = React.useState<{ text: string; ok: boolean } | null>(null);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const handleCoupon = () => {
    const ok = applyCoupon(couponInput);
    setCouponMsg(ok ? { text: `Code applied! You save ${ok ? couponInput.toUpperCase() === 'GHARELU10' ? '10%' : '25%' : ''}`, ok: true } : { text: 'Invalid coupon code.', ok: false });
  };

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h1 className="font-display text-3xl font-bold text-primary mb-1">Shopping Cart</h1>
        <p className="text-xs text-text-muted mb-8">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-primary/15 mx-auto mb-4" />
            <p className="font-display text-2xl text-primary mb-2">Your cart is empty</p>
            <p className="text-sm text-text-muted mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs font-black tracking-widest hover:bg-secondary transition-colors uppercase">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Shipping progress */}
              {cartSubtotal < freeShippingThreshold ? (
                <div className="bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                  🚚 Add <strong>Rs. {(freeShippingThreshold - cartSubtotal).toLocaleString()}</strong> more for <strong>FREE delivery!</strong>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 px-4 py-3 text-xs text-green-700 font-semibold">
                  🎉 You've unlocked <strong>FREE delivery!</strong>
                </div>
              )}

              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="flex gap-4 bg-white border border-secondary/10 p-4 shadow-premium"
                  >
                    <Link href={`/product/${item.product.slug}`} className="relative w-24 h-24 shrink-0 bg-bg-warm overflow-hidden">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover hover:scale-105 transition-transform" sizes="96px" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-secondary font-black uppercase tracking-widest capitalize mb-0.5">{item.product.category}</p>
                      <Link href={`/product/${item.product.slug}`} className="font-semibold text-primary hover:text-secondary transition-colors text-sm line-clamp-2">{item.product.name}</Link>
                      <p className="text-[10px] text-text-muted mt-0.5">Weight: {item.selectedWeight}</p>
                      <p className="text-sm font-bold text-primary mt-1">Rs. {getProductPrice(item.product, item.selectedWeight).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <button onClick={() => removeFromCart(item.product.id, item.selectedWeight)} className="text-text-muted hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center border border-primary/15">
                        <button onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-primary">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-primary">Rs. {(getProductPrice(item.product, item.selectedWeight) * item.quantity).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-secondary/10 shadow-premium p-6 h-fit sticky top-24 space-y-4">
              <h2 className="font-display text-xl font-bold text-primary">Order Summary</h2>

              {/* Coupon */}
              {!couponCode && (
                <div>
                  <div className="flex border border-primary/15">
                    <div className="flex items-center px-3 text-primary/30"><Tag className="w-4 h-4" /></div>
                    <input value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder="Coupon code" className="flex-1 py-2.5 text-xs bg-transparent focus:outline-none text-primary" />
                    <button onClick={handleCoupon} className="px-4 text-[10px] font-black text-secondary uppercase tracking-wider hover:bg-secondary/10 transition-colors border-l border-primary/10">Apply</button>
                  </div>
                  {couponMsg && <p className={`text-[10px] mt-1 ${couponMsg.ok ? 'text-green-600' : 'text-red-500'}`}>{couponMsg.text}</p>}
                </div>
              )}
              {couponCode && <div className="bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-700 font-bold">✓ Code {couponCode} applied</div>}

              <div className="space-y-2.5 border-t border-secondary/10 pt-4 text-sm">
                <div className="flex justify-between text-text-muted"><span>Subtotal</span><span className="font-semibold text-primary">Rs. {cartSubtotal.toLocaleString()}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span className="font-bold">-Rs. {discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between text-text-muted"><span>Shipping</span><span className={`font-semibold ${shippingFee === 0 ? 'text-green-600' : 'text-primary'}`}>{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span></div>
                <div className="flex justify-between text-base font-bold text-primary border-t border-secondary/10 pt-3">
                  <span>Total</span><span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/shop" className="block text-center text-[10px] text-text-muted hover:text-secondary transition-colors">← Continue Shopping</Link>

              <div className="border-t border-secondary/10 pt-4 flex justify-around text-[9px] text-text-muted text-center">
                <span className="flex flex-col items-center gap-1"><ShieldCheck className="w-4 h-4 text-primary/40" />Secure Checkout</span>
                <span className="flex flex-col items-center gap-1"><Truck className="w-4 h-4 text-primary/40" />Cash on Delivery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
