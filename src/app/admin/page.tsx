'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { products, CATEGORIES, Product } from '@/data/products';
import { Plus, Trash2, Eye, Edit, CheckCircle, LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, LogOut, TrendingUp, DollarSign } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/layout/ProtectedLayout';

export default function AdminPage() {
  const { user, logout } = useShop();
  const router = useRouter();

  React.useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    }
  }, [user, router]);

  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'add_product' | 'orders' | 'customers' | 'settings'>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  if (!user || !user.isAdmin) {
    return (
      <ProtectedLayout requireAdmin>
        <ShopLayout>
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm font-bold text-primary">Verifying administrative access...</p>
          </div>
        </ShopLayout>
      </ProtectedLayout>
    );
  }
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'pickles',
    price: '',
    originalPrice: '',
    image: '/images/products/new_product_0.jpg',
    description: '',
    ingredients: '',
    benefits: '',
    weight: '500g, 1kg',
    availability: 'in-stock' as 'in-stock' | 'low-stock' | 'out-of-stock',
    badge: '',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStartEdit = (product: Product) => {
    setIsEditing(true);
    setEditProductId(product.id);
    
    let badge = '';
    if (product.isNew) badge = 'New';
    if (product.isBestSeller) badge = badge ? `${badge}, Bestseller` : 'Bestseller';

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      image: product.image,
      description: product.description,
      ingredients: product.ingredients ? product.ingredients.join(', ') : '',
      benefits: product.benefits ? product.benefits.join(', ') : '',
      weight: product.weight ? product.weight.join(', ') : '500g, 1kg',
      availability: product.availability,
      badge: badge,
    });
    setActiveTab('add_product');
  };

  const handleStartAdd = () => {
    setIsEditing(false);
    setEditProductId(null);
    setFormData({
      name: '',
      category: 'pickles',
      price: '',
      originalPrice: '',
      image: '/images/products/new_product_0.jpg',
      description: '',
      ingredients: '',
      benefits: '',
      weight: '500g, 1kg',
      availability: 'in-stock',
      badge: '',
    });
    setActiveTab('add_product');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editProductId) {
      const updatedProductData = {
        name: formData.name,
        slug: formData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        image: formData.image || '/images/products/new_product_0.jpg',
        description: formData.description,
        ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(Boolean),
        weight: formData.weight.split(',').map(w => w.trim()).filter(Boolean),
        availability: formData.availability,
        isNew: formData.badge.toLowerCase().includes('new'),
        isBestSeller: formData.badge.toLowerCase().includes('best'),
        discount: formData.originalPrice ? Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100) : undefined
      };

      setLocalProducts(prev => prev.map(p => p.id === editProductId ? { ...p, ...updatedProductData } : p));
      
      const index = products.findIndex(p => p.id === editProductId);
      if (index > -1) {
        products[index] = { ...products[index], ...updatedProductData };
      }

      setNotification(`Product "${formData.name}" updated successfully!`);
      setIsEditing(false);
      setEditProductId(null);
      setActiveTab('products');
      setFormData({
        name: '', category: 'pickles', price: '', originalPrice: '', image: '/images/products/new_product_0.jpg', description: '', ingredients: '', benefits: '', weight: '500g, 1kg', availability: 'in-stock', badge: '',
      });
      setTimeout(() => setNotification(null), 4000);
    } else {
      handleAddProduct(e);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      image: formData.image || '/images/products/new_product_0.jpg',
      rating: 5.0,
      reviewsCount: 0,
      description: formData.description,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
      benefits: formData.benefits.split(',').map(b => b.trim()).filter(Boolean),
      weight: formData.weight.split(',').map(w => w.trim()).filter(Boolean),
      availability: formData.availability,
      isNew: formData.badge.toLowerCase().includes('new'),
      isBestSeller: formData.badge.toLowerCase().includes('best'),
      isFeatured: true,
      discount: formData.originalPrice ? Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100) : undefined
    };

    setLocalProducts(prev => [newProduct, ...prev]);
    products.unshift(newProduct);

    setNotification(`Product "${newProduct.name}" published successfully!`);
    setActiveTab('products');
    setFormData({
      name: '', category: 'pickles', price: '', originalPrice: '', image: '/images/products/new_product_0.jpg', description: '', ingredients: '', benefits: '', weight: '500g, 1kg', availability: 'in-stock', badge: '',
    });

    setTimeout(() => setNotification(null), 4000);
  };

  const handleDelete = (id: string) => {
    setLocalProducts(prev => prev.filter(p => p.id !== id));
    const index = products.findIndex(p => p.id === id);
    if (index > -1) products.splice(index, 1);
  };

  // Mock Data for new tabs
  const mockOrders = [
    { id: 'ORD-001', customer: 'Ahmed Khan', date: 'Oct 24, 2026', total: 2450, status: 'Processing' },
    { id: 'ORD-002', customer: 'Sara Ali', date: 'Oct 24, 2026', total: 1100, status: 'Shipped' },
    { id: 'ORD-003', customer: 'Usman Tariq', date: 'Oct 23, 2026', total: 3500, status: 'Delivered' },
    { id: 'ORD-004', customer: 'Fatima Bilal', date: 'Oct 22, 2026', total: 950, status: 'Delivered' },
  ];

  const mockCustomers = [
    { id: 'CUST-1', name: 'Ahmed Khan', email: 'ahmed.k@example.com', orders: 3, totalSpent: 7500 },
    { id: 'CUST-2', name: 'Sara Ali', email: 'sara.ali@example.com', orders: 1, totalSpent: 1100 },
    { id: 'CUST-3', name: 'Usman Tariq', email: 'usman.t@example.com', orders: 5, totalSpent: 15400 },
  ];

  return (
    <ProtectedLayout requireAdmin><ShopLayout>
      <div className="flex min-h-screen bg-bg-warm">
        
        {/* Sidebar */}
        <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="font-display text-2xl font-bold tracking-wide">Studio Admin</h2>
            <p className="text-[10px] uppercase tracking-widest text-secondary mt-1">Gharelu Achaar</p>
          </div>
          
          <nav className="flex-1 py-6 space-y-2 px-4">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'dashboard' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'products' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <ShoppingBag className="w-5 h-5" /> All Products
            </button>
            <button onClick={handleStartAdd} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm transition-colors ${(activeTab === 'add_product' && !isEditing) ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <Plus className="w-5 h-5" /> Add New Product
            </button>
            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'orders' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <ShoppingCart className="w-5 h-5" /> Orders
            </button>
            <button onClick={() => setActiveTab('customers')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'customers' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <Users className="w-5 h-5" /> Customers
            </button>
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'settings' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <Settings className="w-5 h-5" /> Settings
            </button>
            <button 
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-300 hover:text-red-200 hover:bg-white/10 rounded-sm transition-colors mt-2"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          
          {notification && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-xs font-bold rounded-sm mb-6 flex items-center gap-2 shadow-sm">
              <CheckCircle className="w-4 h-4" /> {notification}
            </div>
          )}

          {/* Tab 1: Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">Dashboard Overview</h1>
                <p className="text-text-muted text-sm mt-1">Welcome back! Here's what's happening with your store today.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Sales', value: 'Rs. 124,500', icon: <DollarSign className="w-6 h-6 text-secondary" />, trend: '+12% from last month' },
                  { title: 'Total Orders', value: '84', icon: <ShoppingCart className="w-6 h-6 text-secondary" />, trend: '+5% from last month' },
                  { title: 'Active Products', value: localProducts.length.toString(), icon: <ShoppingBag className="w-6 h-6 text-secondary" />, trend: '2 added this week' },
                  { title: 'Total Customers', value: '1,240', icon: <Users className="w-6 h-6 text-secondary" />, trend: '+18 new customers' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 border border-secondary/20 shadow-sm rounded-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{stat.title}</p>
                        <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
                      </div>
                      <div className="bg-bg-warm p-2 rounded-full border border-secondary/10">{stat.icon}</div>
                    </div>
                    <p className="text-[10px] text-green-600 font-semibold mt-4 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {stat.trend}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-secondary/20 p-6 shadow-sm">
                <h3 className="font-display font-bold text-xl text-primary mb-4">Recent Orders</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10 bg-bg-warm text-[10px] font-black uppercase tracking-wider text-primary">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/5 text-xs">
                    {mockOrders.slice(0,3).map(order => (
                      <tr key={order.id} className="hover:bg-bg-warm/30 transition-colors">
                        <td className="p-4 font-bold text-primary">{order.id}</td>
                        <td className="p-4 text-text-dark">{order.customer}</td>
                        <td className="p-4 text-text-muted">{order.date}</td>
                        <td className="p-4 font-bold text-text-dark">Rs. {order.total.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[9px] font-black uppercase rounded-sm ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                          }`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Products List */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display text-3xl font-bold text-primary">Products Catalog</h1>
                  <p className="text-text-muted text-sm mt-1">Manage your {localProducts.length} specialty items.</p>
                </div>
                <button 
                  onClick={handleStartAdd}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-primary text-white hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              <div className="bg-white border border-secondary/20 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-secondary/10 bg-bg-warm text-[10px] font-black uppercase tracking-wider text-primary">
                        <th className="p-4">Product Info</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price (PKR)</th>
                        <th className="p-4">Stock Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary/5 text-xs text-text-dark">
                      {localProducts.map(p => (
                        <tr key={p.id} className="hover:bg-bg-warm/30 transition-colors">
                          <td className="p-4 flex items-center gap-4 font-semibold">
                            <div className="relative w-12 h-12 border border-secondary/20 bg-bg-warm shrink-0 overflow-hidden shadow-sm">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-primary font-bold text-sm">{p.name}</p>
                              <p className="text-[10px] text-text-muted mt-0.5">Slug: {p.slug}</p>
                            </div>
                          </td>
                          <td className="p-4 capitalize font-semibold text-secondary">{p.category}</td>
                          <td className="p-4 font-bold text-sm">
                            Rs. {p.price.toLocaleString()}
                            {p.originalPrice && <span className="text-text-muted line-through ml-2 text-[10px]">Rs. {p.originalPrice.toLocaleString()}</span>}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-[9px] font-black uppercase rounded-sm ${
                              p.availability === 'in-stock' ? 'bg-green-50 text-green-700' :
                              p.availability === 'low-stock' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {p.availability}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <Link href={`/shop/${p.category}/${p.slug}`} className="inline-flex p-2 border border-primary/20 text-primary hover:bg-secondary hover:text-white transition-colors" title="View product">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button onClick={() => handleStartEdit(p)} className="inline-flex p-2 border border-primary/20 text-primary hover:bg-secondary hover:text-white transition-colors" title="Edit product">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="inline-flex p-2 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="Delete product">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Add/Edit Product Form */}
          {activeTab === 'add_product' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">
                  {isEditing ? `Edit Product: ${formData.name}` : 'Create New Product'}
                </h1>
                <p className="text-text-muted text-sm mt-1">
                  {isEditing ? 'Modify the details of this specialty product.' : 'Add a new authentic recipe to the catalog.'}
                </p>
              </div>

              <div className="bg-white border border-secondary/20 shadow-sm p-8">
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Product Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Aloo Bukhara Chutney"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Category *</label>
                      <select name="category" required value={formData.category} onChange={handleInputChange}
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors">
                        {CATEGORIES.map(cat => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Price (PKR) *</label>
                      <input type="number" name="price" required value={formData.price} onChange={handleInputChange} placeholder="e.g. 750"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Compare At Price (PKR) - Optional</label>
                      <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="e.g. 950"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Stock Availability *</label>
                      <select name="availability" required value={formData.availability} onChange={handleInputChange}
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors">
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Product Ribbon Badge</label>
                      <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} placeholder="e.g. New, Bestseller"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Weights Available</label>
                      <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="500g, 1kg"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Image Path</label>
                      <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="/images/products/new_product_0.jpg"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Ingredients (comma-separated)</label>
                      <input type="text" name="ingredients" value={formData.ingredients} onChange={handleInputChange} placeholder="e.g. Raw Mangoes, Mustard Oil, Kalonji"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Benefits (comma-separated)</label>
                      <input type="text" name="benefits" value={formData.benefits} onChange={handleInputChange} placeholder="e.g. Supports digestion, Rich in antioxidants"
                        className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Product Description *</label>
                    <textarea name="description" required rows={4} value={formData.description} onChange={handleInputChange} placeholder="Describe the recipe and taste..."
                      className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors resize-none" />
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-secondary/20">
                    <button type="submit" className="px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors">
                      {isEditing ? 'Save Changes' : 'Publish Product'}
                    </button>
                    <button type="button" onClick={() => { setIsEditing(false); setEditProductId(null); setActiveTab('products'); }} className="px-8 py-4 bg-white border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary/5 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tab 4: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">Orders Management</h1>
                <p className="text-text-muted text-sm mt-1">Track and manage customer orders.</p>
              </div>

              <div className="bg-white border border-secondary/20 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10 bg-bg-warm text-[10px] font-black uppercase tracking-wider text-primary">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/5 text-xs text-text-dark">
                    {mockOrders.map(order => (
                      <tr key={order.id} className="hover:bg-bg-warm/30 transition-colors">
                        <td className="p-4 font-bold">{order.id}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4 text-text-muted">{order.date}</td>
                        <td className="p-4 font-bold">Rs. {order.total.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[9px] font-black uppercase rounded-sm ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                          }`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 5: Customers */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">Customers Directory</h1>
                <p className="text-text-muted text-sm mt-1">View and manage your loyal customers.</p>
              </div>

              <div className="bg-white border border-secondary/20 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10 bg-bg-warm text-[10px] font-black uppercase tracking-wider text-primary">
                      <th className="p-4">Customer ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Orders</th>
                      <th className="p-4">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/5 text-xs text-text-dark">
                    {mockCustomers.map(c => (
                      <tr key={c.id} className="hover:bg-bg-warm/30 transition-colors">
                        <td className="p-4 text-text-muted">{c.id}</td>
                        <td className="p-4 font-bold text-primary">{c.name}</td>
                        <td className="p-4">{c.email}</td>
                        <td className="p-4 font-bold">{c.orders}</td>
                        <td className="p-4 font-bold text-green-700">Rs. {c.totalSpent.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 6: Store Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">Store Settings</h1>
                <p className="text-text-muted text-sm mt-1">Manage admin credentials and public store contact details.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Admin Profile Details */}
                <div className="bg-white border border-secondary/20 shadow-sm p-6 sm:p-8">
                  <h2 className="font-display font-bold text-xl text-primary mb-6 border-b border-secondary/10 pb-4">Admin Profile & Security</h2>
                  
                  <form className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Admin Full Name</label>
                      <input type="text" defaultValue="Gharelu Achaar Admin" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Login Email</label>
                      <input type="email" defaultValue="admin@ghareluachaar.pk" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div className="pt-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Change Password</label>
                      <input type="password" placeholder="Enter new password" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors mb-3" />
                      <input type="password" placeholder="Confirm new password" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div className="pt-4">
                      <button type="button" className="px-6 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors">
                        Update Security
                      </button>
                    </div>
                  </form>
                </div>

                {/* Public Store Contact Info */}
                <div className="bg-white border border-secondary/20 shadow-sm p-6 sm:p-8">
                  <h2 className="font-display font-bold text-xl text-primary mb-6 border-b border-secondary/10 pb-4">Public Contact Details</h2>
                  
                  <form className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Support Email</label>
                      <input type="email" defaultValue="support@ghareluachaar.pk" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Support WhatsApp / Call Number</label>
                      <input type="tel" defaultValue="+92 300 1234567" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Physical Store Location / Address</label>
                      <textarea rows={3} defaultValue="Heritage Hub, Multan Road, Lahore, Pakistan" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors resize-none" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Business Hours</label>
                      <textarea rows={2} defaultValue="Mon - Sat: 9:00am - 8:00pm\nSunday: 11:00am - 5:00pm" className="w-full border border-secondary/30 px-4 py-2.5 text-sm bg-bg-cream focus:outline-none focus:border-secondary transition-colors resize-none" />
                    </div>

                    <div className="pt-4">
                      <button type="button" className="px-6 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors">
                        Save Contact Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </ShopLayout></ProtectedLayout>
  );
}
