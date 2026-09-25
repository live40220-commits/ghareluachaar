'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { products as staticProducts, CATEGORIES, Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import { ShopLayout } from '@/components/layout/ShopLayout';
import { Plus, Trash2, Eye, Edit, CheckCircle, LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, LogOut, Upload, Image as ImageIcon } from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'add_product' | 'slider' | 'orders' | 'customers' | 'settings';

const DEFAULT_SLIDES = [
  { image: '/images/hero/hero_banner_1.png', alt: 'Gharelu Achaar', title: 'Bring Home The', title_highlight: 'Taste of Tradition', subtitle: 'Authentic homemade achaar made with love & traditional recipes.', primary_button_label: 'Shop Now', primary_button_link: '/shop', secondary_button_label: 'View All Products', secondary_button_link: '/shop', display_order: 0, is_active: true },
  { image: '/images/products/new_product_1.webp', alt: 'Fresh Achaar', title: 'Pure Ingredients.', title_highlight: 'Authentic Flavour.', subtitle: 'Traditional recipes prepared in small batches.', primary_button_label: 'Shop Now', primary_button_link: '/shop', secondary_button_label: 'Explore', secondary_button_link: '/shop', display_order: 1, is_active: true },
  { image: '/images/products/new_product_0.jpg', alt: 'Homemade Achaar', title: 'Made With Love.', title_highlight: 'Just Like Home.', subtitle: 'Taste the warmth of homemade goodness.', primary_button_label: 'Shop Now', primary_button_link: '/shop', secondary_button_label: 'View Products', secondary_button_link: '/shop', display_order: 2, is_active: true },
];

const emptyForm = {
  name: '', category: 'pickles', price: '', originalPrice: '', image: '/images/products/new_product_0.jpg',
  description: '', ingredients: '', benefits: '', weight: '500g, 1kg', availability: 'in-stock' as Product['availability'],
  badge: '', isFeatured: true,
};

function dbToProduct(p: any): Product {
  return {
    id: p.id, name: p.name, slug: p.slug, category: p.category, price: Number(p.price),
    originalPrice: p.original_price == null ? undefined : Number(p.original_price), image: p.image || '',
    rating: Number(p.rating || 0), reviewsCount: Number(p.reviews_count || 0), description: p.description || '',
    ingredients: p.ingredients || [], benefits: p.benefits || [], weight: p.weight || ['500g'],
    availability: p.availability, isNew: !!p.is_new, isBestSeller: !!p.is_best_seller, isFeatured: !!p.is_featured,
    discount: p.discount == null ? undefined : Number(p.discount), weightPrices: p.weight_prices || undefined,
  };
}

export default function AdminPage() {
  const { user, logout } = useShop();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [items, setItems] = useState<Product[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 4500);
  };

  useEffect(() => {
    if (!user || !user.isAdmin) { router.push('/login'); return; }
    loadAll();
  }, [user, router]);

  const loadAll = async () => {
    setLoading(true);
    const [p, s, st] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('slider_slides').select('*').order('display_order', { ascending: true }),
      supabase.from('store_settings').select('*').limit(1).maybeSingle(),
    ]);
    if (p.error) notify(p.error.message);
    if (s.error) notify(s.error.message);
    setItems((p.data || []).map(dbToProduct));
    setSlides(s.data || []);
    setSettings(st.data || {});
    setLoading(false);
  };

  const uploadImage = async (file: File, bucket: 'products' | 'sliders') => {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const startAdd = () => { setEditId(null); setForm(emptyForm); setImageFile(null); setTab('add_product'); };
  const startEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ name: p.name, category: p.category, price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      image: p.image, description: p.description, ingredients: p.ingredients.join(', '), benefits: p.benefits.join(', '),
      weight: p.weight.join(', '), availability: p.availability, badge: [p.isNew ? 'New' : '', p.isBestSeller ? 'Bestseller' : ''].filter(Boolean).join(', '), isFeatured: !!p.isFeatured });
    setImageFile(null); setTab('add_product');
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let image = form.image;
      if (imageFile) image = await uploadImage(imageFile, 'products');
      const original = form.originalPrice ? Number(form.originalPrice) : null;
      const price = Number(form.price);
      const payload = {
        name: form.name.trim(), slug: form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        category: form.category, price, original_price: original, image, description: form.description,
        ingredients: form.ingredients.split(',').map(x => x.trim()).filter(Boolean),
        benefits: form.benefits.split(',').map(x => x.trim()).filter(Boolean),
        weight: form.weight.split(',').map(x => x.trim()).filter(Boolean), availability: form.availability,
        is_new: form.badge.toLowerCase().includes('new'), is_best_seller: form.badge.toLowerCase().includes('best'),
        is_featured: form.isFeatured, discount: original ? Math.round(((original - price) / original) * 100) : null,
      };
      if (editId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editId);
        if (error) throw error;
        notify('Product updated successfully.');
      } else {
        const { error } = await supabase.from('products').insert({ ...payload, rating: 5, reviews_count: 0, weight_prices: {} });
        if (error) throw error;
        notify('Product published successfully.');
      }
      await loadAll(); setForm(emptyForm); setImageFile(null); setEditId(null); setTab('products');
    } catch (e: any) { notify(e.message || 'Could not save product.'); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) notify(error.message); else { setItems(x => x.filter(p => p.id !== id)); notify('Product deleted.'); }
  };

  const importExisting = async () => {
    try {
      if (!confirm('Import the current products and homepage sliders into Supabase? This is intended as a one-time setup.')) return;
      const productRows = staticProducts.map(p => ({
        id: p.id, name: p.name, slug: p.slug, category: p.category, price: p.price, original_price: p.originalPrice ?? null,
        image: p.image, rating: p.rating, reviews_count: p.reviewsCount, description: p.description, ingredients: p.ingredients,
        benefits: p.benefits, weight: p.weight, availability: p.availability, is_new: !!p.isNew, is_best_seller: !!p.isBestSeller,
        is_featured: !!p.isFeatured, discount: p.discount ?? null, weight_prices: p.weightPrices || {},
      }));
      const { error: pe } = await supabase.from('products').upsert(productRows, { onConflict: 'id' });
      if (pe) throw pe;
      const { error: se } = await supabase.from('slider_slides').upsert(DEFAULT_SLIDES, { onConflict: 'id' });
      if (se) {
        // Slides have generated IDs, so insert if the table is empty.
        const { count } = await supabase.from('slider_slides').select('id', { count: 'exact', head: true });
        if (!count) { const { error } = await supabase.from('slider_slides').insert(DEFAULT_SLIDES); if (error) throw error; }
      }
      notify('Existing catalog imported.'); await loadAll();
    } catch (e: any) { notify(e.message || 'Import failed.'); }
  };

  const addSlide = async () => {
    const { data, error } = await supabase.from('slider_slides').insert({ ...DEFAULT_SLIDES[0], display_order: slides.length }).select().single();
    if (error) notify(error.message); else setSlides(x => [...x, data]);
  };

  const updateSlide = async (slide: any, file?: File) => {
    try {
      let image = slide.image;
      if (file) image = await uploadImage(file, 'sliders');
      const { data, error } = await supabase.from('slider_slides').update({ ...slide, image }).eq('id', slide.id).select().single();
      if (error) throw error;
      setSlides(x => x.map(s => s.id === data.id ? data : s)); notify('Slider saved.');
    } catch (e: any) { notify(e.message); }
  };

  const deleteSlide = async (id: string) => {
    if (!confirm('Delete this slider?')) return;
    const { error } = await supabase.from('slider_slides').delete().eq('id', id);
    if (error) notify(error.message); else setSlides(x => x.filter(s => s.id !== id));
  };

  const saveSettings = async () => {
    try {
      const payload = {
        store_name: settings.store_name || 'Gharelu Achaar', support_email: settings.support_email || '',
        whatsapp: settings.whatsapp || '', phone: settings.phone || '', address: settings.address || '',
        business_hours: settings.business_hours || '', free_shipping_threshold: Number(settings.free_shipping_threshold || 2999),
        shipping_fee: Number(settings.shipping_fee || 250), facebook_url: settings.facebook_url || '',
        instagram_url: settings.instagram_url || '', tiktok_url: settings.tiktok_url || '',
      };
      if (settings.id) {
        const { data, error } = await supabase.from('store_settings').update(payload).eq('id', settings.id).select().single();
        if (error) throw error; setSettings(data);
      } else {
        const { data, error } = await supabase.from('store_settings').insert(payload).select().single();
        if (error) throw error; setSettings(data);
      }
      notify('Store settings saved.');
    } catch (e: any) { notify(e.message); }
  };

  if (!user || !user.isAdmin) return <ProtectedLayout requireAdmin><ShopLayout><div className="min-h-[70vh] flex items-center justify-center">Checking admin access...</div></ShopLayout></ProtectedLayout>;

  const nav = [
    ['dashboard','Dashboard',LayoutDashboard], ['products','Products',ShoppingBag], ['add_product','Add Product',Plus],
    ['slider','Homepage Slider',ImageIcon], ['orders','Orders',ShoppingCart], ['customers','Customers',Users], ['settings','Settings',Settings],
  ] as const;

  return <ProtectedLayout requireAdmin><ShopLayout>
    <div className="flex min-h-screen bg-bg-warm">
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10"><h2 className="font-display text-2xl font-bold">Studio Admin</h2><p className="text-[10px] uppercase tracking-widest text-secondary mt-1">Gharelu Achaar</p></div>
        <nav className="flex-1 p-4 space-y-1">{nav.map(([id,label,Icon]) =>
          <button key={id} onClick={() => id === 'add_product' ? startAdd() : setTab(id as Tab)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-sm ${tab === id ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10'}`}><Icon className="w-5 h-5"/>{label}</button>
        )}</nav>
        <div className="p-4 border-t border-white/10"><button onClick={async()=>{await logout();router.push('/login')}} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-200"><LogOut className="w-5 h-5"/>Logout</button></div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {notice && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-xs font-bold rounded-sm mb-6 flex items-center gap-2"><CheckCircle className="w-4 h-4"/>{notice}</div>}

        {tab === 'dashboard' && <section className="space-y-8">
          <div className="flex flex-wrap justify-between gap-4"><div><h1 className="font-display text-3xl font-bold text-primary">Dashboard</h1><p className="text-text-muted text-sm mt-1">Manage your live store content.</p></div>
          <button onClick={importExisting} className="px-5 py-3 bg-secondary text-white text-xs font-bold uppercase tracking-wider">Import Existing Site Data</button></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[
            ['Products', items.length], ['Homepage Slides', slides.length], ['Customers', 'Live DB']
          ].map(([a,b])=><div key={String(a)} className="bg-white border border-secondary/20 p-6"><p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{a}</p><p className="text-3xl font-bold text-primary mt-2">{b}</p></div>)}</div>
          <div className="bg-white border border-secondary/20 p-6"><h2 className="font-display text-xl font-bold text-primary mb-3">Setup status</h2><p className="text-sm text-text-muted">Use the import button once to copy your existing hard-coded products and homepage slides into Supabase. After that, all edits are stored in the database.</p></div>
        </section>}

        {tab === 'products' && <section className="space-y-6">
          <div className="flex justify-between items-center"><div><h1 className="font-display text-3xl font-bold text-primary">Products</h1><p className="text-sm text-text-muted">{items.length} products in database.</p></div><button onClick={startAdd} className="px-5 py-3 bg-primary text-white text-xs font-bold uppercase"><Plus className="w-4 h-4 inline mr-2"/>Add Product</button></div>
          <div className="bg-white border border-secondary/20 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-bg-warm text-[10px] uppercase font-black"><tr><th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4 text-right">Actions</th></tr></thead><tbody>{items.map(p=><tr key={p.id} className="border-t border-secondary/10"><td className="p-4 flex gap-3 items-center"><img src={p.image} className="w-12 h-12 object-cover" alt=""/><div><b>{p.name}</b><div className="text-[10px] text-text-muted">{p.slug}</div></div></td><td className="p-4 capitalize">{p.category}</td><td className="p-4 font-bold">Rs. {p.price.toLocaleString()}</td><td className="p-4">{p.availability}</td><td className="p-4 text-right space-x-1"><Link href={`/product/${p.slug}`} className="inline-flex p-2 border"><Eye className="w-4 h-4"/></Link><button onClick={()=>startEdit(p)} className="p-2 border"><Edit className="w-4 h-4"/></button><button onClick={()=>deleteProduct(p.id)} className="p-2 border border-red-200 text-red-600"><Trash2 className="w-4 h-4"/></button></td></tr>)}</tbody></table></div></div>
        </section>}

        {tab === 'add_product' && <section className="max-w-4xl space-y-6"><div><h1 className="font-display text-3xl font-bold text-primary">{editId ? 'Edit Product' : 'Add Product'}</h1><p className="text-sm text-text-muted">Changes are saved directly to Supabase.</p></div><form onSubmit={saveProduct} className="bg-white border border-secondary/20 p-6 grid md:grid-cols-2 gap-5">
          {[
            ['name','Product Name'],['price','Price (PKR)'],['originalPrice','Original Price (PKR)'],['weight','Weights (comma separated)'],['ingredients','Ingredients (comma separated)'],['benefits','Benefits (comma separated)']
          ].map(([key,label])=><div key={key}><label className="block text-[10px] uppercase font-black tracking-widest mb-2">{label}</label><input required={key==='name'||key==='price'} value={(form as any)[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream"/></div>)}
          <div><label className="block text-[10px] uppercase font-black tracking-widest mb-2">Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream">{CATEGORIES.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
          <div><label className="block text-[10px] uppercase font-black tracking-widest mb-2">Availability</label><select value={form.availability} onChange={e=>setForm({...form,availability:e.target.value as Product['availability']})} className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream"><option value="in-stock">In Stock</option><option value="low-stock">Low Stock</option><option value="out-of-stock">Out of Stock</option></select></div>
          <div><label className="block text-[10px] uppercase font-black tracking-widest mb-2">Badge</label><input value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})} placeholder="New, Bestseller" className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream"/></div>
          <div><label className="block text-[10px] uppercase font-black tracking-widest mb-2">Image from computer</label><input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files?.[0] || null)} className="w-full text-sm"/>{form.image && <img src={form.image} alt="" className="w-20 h-20 object-cover mt-3"/>}</div>
          <div className="md:col-span-2"><label className="block text-[10px] uppercase font-black tracking-widest mb-2">Description</label><textarea required rows={5} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border border-secondary/30 px-4 py-3 text-sm bg-bg-cream"/></div>
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})}/> Featured product</label>
          <div className="md:col-span-2 flex gap-3"><button type="submit" className="px-7 py-3 bg-primary text-white text-xs font-bold uppercase">{editId ? 'Save Changes' : 'Publish Product'}</button><button type="button" onClick={()=>setTab('products')} className="px-7 py-3 border text-xs font-bold uppercase">Cancel</button></div>
        </form></section>}

        {tab === 'slider' && <section className="space-y-6"><div className="flex justify-between items-center"><div><h1 className="font-display text-3xl font-bold text-primary">Homepage Slider</h1><p className="text-sm text-text-muted">Upload images and change slider text/buttons.</p></div><button onClick={addSlide} className="px-5 py-3 bg-primary text-white text-xs font-bold uppercase"><Plus className="w-4 h-4 inline mr-2"/>Add Slide</button></div>
          {slides.map((s,idx)=><SliderEditor key={s.id} slide={s} index={idx} onSave={updateSlide} onDelete={deleteSlide}/>)}
          {!slides.length && <div className="bg-white p-8 border text-sm text-text-muted">No slides yet. Use Import Existing Site Data or Add Slide.</div>}
        </section>}

        {tab === 'settings' && <section className="space-y-6 max-w-3xl"><div><h1 className="font-display text-3xl font-bold text-primary">Store Settings</h1><p className="text-sm text-text-muted">These values are stored in Supabase.</p></div><div className="bg-white border p-6 grid md:grid-cols-2 gap-5">
          {[
            ['store_name','Store Name'],['support_email','Support Email'],['whatsapp','WhatsApp'],['phone','Phone'],['address','Address'],['business_hours','Business Hours'],['free_shipping_threshold','Free Shipping Threshold'],['shipping_fee','Shipping Fee'],['facebook_url','Facebook URL'],['instagram_url','Instagram URL'],['tiktok_url','TikTok URL']
          ].map(([key,label])=><div key={key} className={key==='address'||key==='business_hours'?'md:col-span-2':''}><label className="block text-[10px] uppercase font-black tracking-widest mb-2">{label}</label>{key==='address'||key==='business_hours'?<textarea rows={3} value={settings[key]||''} onChange={e=>setSettings({...settings,[key]:e.target.value})} className="w-full border px-4 py-3 text-sm bg-bg-cream"/>:<input value={settings[key]??''} onChange={e=>setSettings({...settings,[key]:e.target.value})} className="w-full border px-4 py-3 text-sm bg-bg-cream"/>}</div>)}
          <div className="md:col-span-2"><button onClick={saveSettings} className="px-7 py-3 bg-primary text-white text-xs font-bold uppercase">Save Settings</button></div>
        </div></section>}

        {tab === 'orders' && <section className="bg-white border p-8"><h1 className="font-display text-3xl font-bold text-primary">Orders</h1><p className="text-sm text-text-muted mt-2">Orders are stored in the Supabase orders table. The next step can connect the checkout to this table.</p></section>}
        {tab === 'customers' && <section className="bg-white border p-8"><h1 className="font-display text-3xl font-bold text-primary">Customers</h1><p className="text-sm text-text-muted mt-2">Customers are stored in the Supabase customers table. The next step can connect registration and checkout records.</p></section>}
      </main>
    </div>
  </ShopLayout></ProtectedLayout>;
}

function SliderEditor({ slide, index, onSave, onDelete }: { slide: any; index: number; onSave: (s:any,f?:File)=>Promise<void>; onDelete:(id:string)=>Promise<void> }) {
  const [form, setForm] = useState(slide);
  const [file, setFile] = useState<File | null>(null);
  return <div className="bg-white border border-secondary/20 p-6">
    <div className="grid md:grid-cols-[260px_1fr] gap-6">
      <div><img src={form.image} alt="" className="w-full aspect-video object-cover"/><input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="mt-3 w-full text-xs"/></div>
      <div className="grid md:grid-cols-2 gap-3">
        {['title','title_highlight','subtitle','primary_button_label','primary_button_link','secondary_button_label','secondary_button_link'].map(k=><input key={k} value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k.replaceAll('_',' ')} className="border px-3 py-2 text-sm bg-bg-cream"/>)}
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={!!form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})}/> Active</label>
        <div className="flex gap-2"><button onClick={()=>onSave({...form,display_order:index},file||undefined)} className="px-5 py-2 bg-primary text-white text-xs font-bold uppercase"><Upload className="w-3 h-3 inline mr-1"/>Save</button><button onClick={()=>onDelete(form.id)} className="px-5 py-2 bg-red-50 text-red-600 text-xs font-bold uppercase">Delete</button></div>
      </div>
    </div>
  </div>;
}
