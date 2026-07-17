'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Percent } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    shippingFee,
    couponCode,
    discountAmount,
    cartTotal,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const neededForFreeShipping = freeShippingThreshold - cartSubtotal;
  const progressPercent = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try GHARELU10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-bg-cream flex flex-col shadow-2xl border-l border-secondary/20"
        >
          {/* Header */}
          <div className="p-6 border-b border-secondary/15 flex items-center justify-between bg-primary text-white">
            <h2 className="text-xl font-display font-medium tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-secondary" />
              SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-secondary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="p-4 bg-white border-b border-secondary/10">
            {neededForFreeShipping > 0 ? (
              <p className="text-xs text-text-dark/80 mb-2">
                Add <span className="font-semibold text-primary">Rs. {neededForFreeShipping}</span> more to get <span className="font-semibold text-secondary">FREE SHIPPING</span>!
              </p>
            ) : (
              <p className="text-xs font-semibold text-secondary mb-2 flex items-center gap-1.5">
                🎉 Congratulations! Your order qualifies for Free Shipping.
              </p>
            )}
            <div className="w-full bg-bg-cream h-2 rounded-full overflow-hidden border border-secondary/10">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/40 border border-primary/10">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-primary">Your bag is empty</h3>
                  <p className="text-sm text-text-dark/60 mt-1 max-w-[250px] mx-auto">
                    Fill it with pure homemade traditional delights.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-primary text-white hover:bg-secondary transition-all font-semibold rounded-none tracking-wide text-xs"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="flex items-start gap-4 pb-6 border-b border-secondary/10"
                >
                  <div className="relative w-20 h-20 bg-white border border-secondary/10 overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-medium text-sm text-primary line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-text-dark/60 mt-0.5">
                      Weight: {item.selectedWeight}
                    </p>
                    <p className="text-xs font-semibold text-secondary mt-1">
                      Rs. {item.product.price}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center border border-secondary/20 bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                          className="px-2 py-1 text-text-dark hover:bg-bg-cream transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-0.5 text-xs text-text-dark font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                          className="px-2 py-1 text-text-dark hover:bg-bg-cream transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                        className="p-1.5 text-text-dark/40 hover:text-primary transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-primary">
                      Rs. {item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-secondary/15 space-y-4">
              {/* Coupon Section */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-secondary/10 px-3 py-2 border border-secondary/20">
                  <span className="text-xs font-semibold text-secondary flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5" />
                    COUPON APPLIED: {couponCode}
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-primary underline hover:text-secondary font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dark/40" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. GHARELU10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-secondary/20 focus:outline-none focus:border-primary bg-bg-cream"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white text-xs font-semibold hover:bg-secondary transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-primary">{couponError}</p>}

              <div className="space-y-2 text-xs text-text-dark/80 pt-2 border-t border-bg-cream">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-dark">Rs. {cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-display font-semibold text-primary pt-2 border-t border-secondary/10">
                  <span>Total Amount</span>
                  <span>Rs. {cartTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 bg-primary text-white text-center text-xs font-semibold tracking-widest hover:bg-secondary transition-colors block shadow-md hover:shadow-lg"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 bg-transparent border border-secondary text-secondary text-center text-[10px] font-semibold tracking-wider hover:bg-bg-cream transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
