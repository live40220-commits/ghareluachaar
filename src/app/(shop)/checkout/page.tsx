'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { useShop } from '@/context/ShopContext';
import { ChevronRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductPrice } from '@/data/products';

const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Peshawar','Quetta','Sialkot','Gujranwala','Hyderabad','Abbottabad'];

export default function CheckoutPage() {
  const { cart, cartTotal } = useShop();
  const shipping = cartTotal >= 2000 ? 0 : 199;
  const total = cartTotal + shipping;

  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'Lahore', notes:'' });
  const [payMethod, setPayMethod] = useState<'cod'|'easypaisa'|'jazzcash'|'bank'>('cod');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ShopLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-primary mb-3">Order Placed! 🎉</h1>
            <p className="text-primary/60 text-sm mb-2">Thank you, <strong>{form.name}</strong>!</p>
            <p className="text-primary/60 text-sm mb-6">Your order has been received. Our team will contact you at <strong>{form.phone}</strong> to confirm delivery.</p>
            <div className="bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6 text-left space-y-1">
              <p>📦 Order Total: <strong>PKR {total.toLocaleString()}</strong></p>
              <p>🏙️ Delivery To: <strong>{form.city}</strong></p>
              <p>💳 Payment: <strong className="capitalize">{payMethod === 'cod' ? 'Cash on Delivery' : payMethod === 'easypaisa' ? 'EasyPaisa' : payMethod === 'jazzcash' ? 'JazzCash' : 'Bank Transfer'}</strong></p>
            </div>
            <Link href="/shop" className="inline-block bg-primary text-white px-8 py-3 text-sm font-bold hover:bg-secondary transition-colors">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-primary/40 mb-8">
          <Link href="/cart" className="hover:text-secondary">Cart</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary font-semibold">Checkout</span>
        </nav>
        <h1 className="font-display text-3xl font-bold text-primary mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Info */}
              <div>
                <h2 className="font-semibold text-primary text-sm uppercase tracking-widest mb-4 pb-2 border-b border-primary/10">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Ahmed Khan', required: true },
                    { label: 'Phone / WhatsApp', name: 'phone', type: 'tel', placeholder: '0300-1234567', required: true },
                    { label: 'Email (Optional)', name: 'email', type: 'email', placeholder: 'ahmed@email.com', required: false },
                  ].map(field => (
                    <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wider">{field.label}</label>
                      <input
                        type={field.type} name={field.name} value={(form as any)[field.name]}
                        onChange={handleChange} placeholder={field.placeholder} required={field.required}
                        className="w-full border border-primary/15 px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h2 className="font-semibold text-primary text-sm uppercase tracking-widest mb-4 pb-2 border-b border-primary/10">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wider">Full Address</label>
                    <textarea
                      name="address" value={form.address} onChange={handleChange} required
                      placeholder="House #, Street, Area, City..." rows={3}
                      className="w-full border border-primary/15 px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:border-secondary transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wider">City</label>
                    <select name="city" value={form.city} onChange={handleChange} className="w-full border border-primary/15 px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:border-secondary transition-colors">
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wider">Order Notes (Optional)</label>
                    <textarea
                      name="notes" value={form.notes} onChange={handleChange}
                      placeholder="Special instructions for delivery..." rows={2}
                      className="w-full border border-primary/15 px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:border-secondary transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-semibold text-primary text-sm uppercase tracking-widest mb-4 pb-2 border-b border-primary/10">Payment Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
                    { id: 'easypaisa', label: 'EasyPaisa', icon: '📱', desc: '0300-1234567' },
                    { id: 'jazzcash', label: 'JazzCash', icon: '📲', desc: '0300-1234567' },
                    { id: 'bank', label: 'Bank Transfer', icon: '🏦', desc: 'Meezan / HBL' },
                  ].map(p => (
                    <button
                      key={p.id} type="button"
                      onClick={() => setPayMethod(p.id as any)}
                      className={`p-4 border text-left transition-all ${payMethod === p.id ? 'border-secondary bg-secondary/5' : 'border-primary/15 hover:border-secondary/50'}`}
                    >
                      <span className="text-xl">{p.icon}</span>
                      <p className="text-sm font-bold text-primary mt-1">{p.label}</p>
                      <p className="text-xs text-primary/50">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="h-fit sticky top-24">
              <div className="bg-primary/5 p-6 space-y-4">
                <h2 className="font-display text-lg font-bold text-primary">Your Order</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.selectedWeight}`} className="flex gap-3 items-center">
                      <div className="relative w-12 h-12 shrink-0 bg-white">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-primary font-semibold line-clamp-1">{item.product.name}</p>
                      </div>
                      <p className="text-xs font-bold text-primary shrink-0">PKR {(getProductPrice(item.product, item.selectedWeight) * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-primary/15 pt-4 text-sm">
                  <div className="flex justify-between text-primary/60"><span>Subtotal</span><span className="font-semibold text-primary">PKR {cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-primary/60"><span>Delivery</span><span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-primary'}`}>{shipping === 0 ? 'FREE' : `PKR ${shipping}`}</span></div>
                  <div className="flex justify-between font-bold text-primary border-t border-primary/15 pt-2 text-base"><span>Total</span><span>PKR {total.toLocaleString()}</span></div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Place Order — PKR {total.toLocaleString()}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-primary/40">
                  <Truck className="w-3 h-3" /> Free delivery on orders above PKR 2,000
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ShopLayout>
  );
}
