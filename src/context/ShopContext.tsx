'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  couponCode: string;
  discountPercentage: number;
  addToCart: (product: Product, quantity: number, weight: string) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  login: (email: string, name: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingThreshold: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const freeShippingThreshold = 2999;
  const standardShippingFee = 250;

  // Load cart, wishlist, and user from localStorage on client mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ga_cart');
    const savedWishlist = localStorage.getItem('ga_wishlist');
    const savedUser = localStorage.getItem('ga_user');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save changes to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('ga_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('ga_wishlist', JSON.stringify(newWishlist));
  };

  const addToCart = (product: Product, quantity: number, weight: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedWeight === weight
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { product, quantity, selectedWeight: weight }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, weight: string) => {
    const newCart = cart.filter(
      (item) => !(item.product.id === productId && item.selectedWeight === weight)
    );
    saveCart(newCart);
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    const newCart = cart.map((item) =>
      item.product.id === productId && item.selectedWeight === weight
        ? { ...item, quantity }
        : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    setCouponCode('');
    setDiscountPercentage(0);
  };

  const toggleWishlist = (productId: string) => {
    const index = wishlist.indexOf(productId);
    let newWishlist = [...wishlist];
    if (index > -1) {
      newWishlist.splice(index, 1);
    } else {
      newWishlist.push(productId);
    }
    saveWishlist(newWishlist);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.toUpperCase().trim();
    if (normalized === 'GHARELU10') {
      setCouponCode('GHARELU10');
      setDiscountPercentage(10);
      return true;
    } else if (normalized === 'AZADI25') {
      setCouponCode('AZADI25');
      setDiscountPercentage(25);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercentage(0);
  };

  const login = (email: string, name: string) => {
    const mockUser: User = {
      name,
      email,
      phone: '03001234567',
      address: 'House #42, Block C, Gulberg III',
      city: 'Lahore',
    };
    setUser(mockUser);
    localStorage.setItem('ga_user', JSON.stringify(mockUser));
  };

  const register = (name: string, email: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ga_user');
  };

  // Calculations
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(cartSubtotal * (discountPercentage / 100));
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : standardShippingFee;
  const cartTotal = cartSubtotal - discountAmount + shippingFee;

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        user,
        quickViewProduct,
        isCartOpen,
        couponCode,
        discountPercentage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setQuickViewProduct,
        setIsCartOpen,
        applyCoupon,
        removeCoupon,
        login,
        register,
        logout,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        freeShippingThreshold,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
