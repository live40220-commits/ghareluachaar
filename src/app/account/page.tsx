'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { useShop } from '@/context/ShopContext';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Package, Edit2, Plus, Bell, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
  { id: 'GA-2024-001', date: '19 Jul 2026', total: 2450, status: 'Out for Delivery', items: 3, tracking: 'TCS-89234789' },
  { id: 'GA-2024-002', date: '12 Jul 2026', total: 790, status: 'Delivered', items: 1, tracking: 'LCS-11234900' },
  { id: 'GA-2024-003', date: '1 Jul 2026', total: 1580, status: 'Delivered', items: 2, tracking: 'TCS-88992211' },
  { id: 'GA-2023-104', date: '15 Dec 2025', total: 4200, status: 'Delivered', items: 5, tracking: 'MNP-44332211' },
];

const MOCK_ADDRESSES = [
  { id: 1, type: 'Home', name: 'Guest User', phone: '+92 300 1234567', street: 'House 45, Street 12, Phase 4, DHA', city: 'Lahore', isDefault: true },
  { id: 2, type: 'Office', name: 'Guest User', phone: '+92 300 1234567', street: 'Suite 201, Liberty Square, Gulberg III', city: 'Lahore', isDefault: false },
];

export default function AccountPage() {
  const { wishlist, cart } = useShop();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'settings'>('dashboard');

  const SIDEBAR_LINKS = [
    { label: 'Dashboard', id: 'dashboard', icon: User, type: 'tab' },
    { label: 'My Orders', id: 'orders', icon: ShoppingBag, type: 'tab' },
    { label: 'My Wishlist', id: '/wishlist', icon: Heart, type: 'link' },
    { label: 'Track Order', id: '/track-order', icon: Package, type: 'link' },
    { label: 'Addresses', id: 'addresses', icon: MapPin, type: 'tab' },
    { label: 'Settings', id: 'settings', icon: Settings, type: 'tab' },
  ];

  const handleNavClick = (id: string, type: string) => {
    if (type === 'link') {
      router.push(id);
    } else {
      setActiveTab(id as any);
    }
  };

  return (
    <ProtectedLayout>
      <ShopLayout>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-primary mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="space-y-1">
              {/* Avatar */}
              <div className="bg-primary p-5 text-center mb-4 rounded-sm shadow-premium">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-secondary" />
                </div>
                <p className="font-bold text-white text-sm">Guest User</p>
                <p className="text-[10px] text-white/50 mt-0.5">Lahore, Pakistan</p>
              </div>

              {SIDEBAR_LINKS.map(l => {
                const Icon = l.icon;
                const isActive = l.type === 'tab' && activeTab === l.id;
                return (
                  <button
                    key={l.label}
                    onClick={() => handleNavClick(l.id, l.type)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold transition-colors rounded-sm ${isActive ? 'bg-bg-warm text-secondary border-l-2 border-secondary' : 'text-text-muted hover:text-primary hover:bg-bg-warm'}`}
                  >
                    <Icon className="w-4 h-4" /> {l.label}
                  </button>
                );
              })}
              <button className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-sm transition-colors w-full mt-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </aside>

            {/* Main Content Area */}
            <div className="md:col-span-3">

              {/* Tab: Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: <ShoppingBag className="w-5 h-5 text-secondary" />, label: 'Total Orders', value: MOCK_ORDERS.length },
                      { icon: <Heart className="w-5 h-5 text-red-400" />, label: 'Wishlist Items', value: wishlist.length },
                      { icon: <Package className="w-5 h-5 text-blue-400" />, label: 'In Cart', value: cart.reduce((s, i) => s + i.quantity, 0) },
                    ].map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white border border-secondary/10 p-5 text-center shadow-premium rounded-sm">
                        <div className="flex justify-center mb-2">{s.icon}</div>
                        <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-white border border-secondary/10 shadow-premium rounded-sm">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-secondary/10">
                      <h2 className="font-display font-bold text-lg text-primary">Recent Orders</h2>
                      <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-secondary hover:text-primary transition-colors">View All →</button>
                    </div>
                    <div className="divide-y divide-secondary/10">
                      {MOCK_ORDERS.slice(0, 2).map(order => (
                        <div key={order.id} className="flex items-center justify-between px-6 py-4">
                          <div>
                            <p className="text-sm font-bold text-primary">{order.id}</p>
                            <p className="text-[10px] text-text-muted">{order.date} · {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-primary">Rs. {order.total.toLocaleString()}</p>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm inline-block mt-1 ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary p-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-sm shadow-premium">
                    <div>
                      <p className="font-display font-bold text-xl text-secondary">Continue Shopping</p>
                      <p className="text-white/60 text-xs mt-1">Explore 50+ premium homemade products</p>
                    </div>
                    <Link href="/shop" className="flex items-center gap-2 bg-secondary text-white px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all shrink-0">
                      SHOP NOW <ShoppingBag className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Tab: Orders */}
              {activeTab === 'orders' && (
                <div className="bg-white border border-secondary/10 shadow-premium rounded-sm animate-in fade-in duration-300">
                  <div className="px-6 py-5 border-b border-secondary/10 bg-bg-warm">
                    <h2 className="font-display font-bold text-xl text-primary">My Orders History</h2>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Review your past purchases and track current shipments</p>
                  </div>
                  <div className="divide-y divide-secondary/10">
                    {MOCK_ORDERS.map(order => (
                      <div key={order.id} className="p-6 flex flex-col sm:flex-row gap-4 justify-between hover:bg-bg-warm/30 transition-colors">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-primary text-sm">{order.id}</h3>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-text-muted mb-3">Placed on {order.date} · {order.items} items</p>
                          <p className="text-[10px] text-text-muted"><strong className="text-text-dark">Tracking ID:</strong> {order.tracking}</p>
                        </div>
                        <div className="flex flex-col sm:items-end justify-between">
                          <p className="font-bold text-primary text-sm">Rs. {order.total.toLocaleString()}</p>
                          <div className="flex gap-2 mt-3 sm:mt-0">
                            <button className="px-4 py-1.5 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">View Details</button>
                            <button className="px-4 py-1.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider hover:bg-primary transition-colors">Reorder</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Addresses */}
              {activeTab === 'addresses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display font-bold text-2xl text-primary">Saved Addresses</h2>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Manage your shipping and billing addresses</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors rounded-sm">
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_ADDRESSES.map(addr => (
                      <div key={addr.id} className="bg-white border border-secondary/20 p-5 rounded-sm relative shadow-sm">
                        {addr.isDefault && <span className="absolute top-4 right-4 text-[9px] bg-secondary/10 text-secondary font-black uppercase px-2 py-0.5 rounded-sm">Default</span>}

                        <div className="flex items-center gap-2 mb-3 text-primary">
                          <MapPin className="w-4 h-4" />
                          <h3 className="font-bold text-sm">{addr.type} Address</h3>
                        </div>

                        <div className="text-xs text-text-muted space-y-1 mb-4">
                          <p className="font-semibold text-text-dark">{addr.name}</p>
                          <p>{addr.street}</p>
                          <p>{addr.city}</p>
                          <p className="pt-1 font-semibold">{addr.phone}</p>
                        </div>

                        <div className="flex gap-3 border-t border-secondary/10 pt-3">
                          <button className="text-[10px] font-bold text-secondary hover:text-primary uppercase tracking-wider flex items-center gap-1">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          {!addr.isDefault && (
                            <button className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider flex items-center gap-1">
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Settings */}
              {activeTab === 'settings' && (
                <div className="bg-white border border-secondary/10 shadow-premium rounded-sm p-6 sm:p-8 animate-in fade-in duration-300">
                  <div className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-primary">Account Settings</h2>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Update your personal information and preferences</p>
                  </div>

                  <form className="space-y-6 max-w-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">First Name</label>
                        <input type="text" defaultValue="Guest" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Last Name</label>
                        <input type="text" defaultValue="User" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Email Address</label>
                      <input type="email" defaultValue="guest@example.com" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+92 300 1234567" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div className="pt-4 border-t border-secondary/10">
                      <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Bell className="w-4 h-4" /> Notification Preferences
                      </h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-secondary" />
                        <span className="text-xs text-text-dark">Send me SMS updates about my orders</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer mt-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-secondary" />
                        <span className="text-xs text-text-dark">Subscribe to promotional emails and offers</span>
                      </label>
                    </div>

                    <div className="pt-4">
                      <button type="button" className="px-8 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </ShopLayout>
    </ProtectedLayout>
  );
}
