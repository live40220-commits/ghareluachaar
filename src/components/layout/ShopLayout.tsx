'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { QuickView } from '../product/QuickView';
import { AnimatePresence } from 'framer-motion';

interface ShopLayoutProps {
  children: React.ReactNode;
}

export const ShopLayout: React.FC<ShopLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-cream">
      <Header />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />

      {/* Global Shopping Overlays */}
      <AnimatePresence>
        <CartDrawer />
      </AnimatePresence>
      <AnimatePresence>
        <QuickView />
      </AnimatePresence>
    </div>
  );
};
