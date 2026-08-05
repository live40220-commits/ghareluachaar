export interface WeightPrice {
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  benefits: string[];
  weight: string[];
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  discount?: number;
  weightPrices?: Record<string, WeightPrice>;
}

export function getProductPrice(product: Product, weight: string): number {
  if (product.weightPrices && product.weightPrices[weight]) {
    return product.weightPrices[weight].price;
  }
  return product.price;
}

export function getProductOriginalPrice(product: Product, weight: string): number | undefined {
  if (product.weightPrices && product.weightPrices[weight]) {
    return product.weightPrices[weight].originalPrice;
  }
  return product.originalPrice;
}

export function getProductPriceRange(product: Product): string {
  if (product.weightPrices) {
    const prices = Object.values(product.weightPrices).map(wp => wp.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice !== maxPrice) {
      return `Rs. ${minPrice.toLocaleString()} – Rs. ${maxPrice.toLocaleString()}`;
    }
  }
  return `Rs. ${product.price.toLocaleString()}`;
}

export function getProductOriginalPriceRange(product: Product): string | null {
  if (product.weightPrices) {
    const origPrices = Object.values(product.weightPrices)
      .map(wp => wp.originalPrice)
      .filter((p): p is number => typeof p === 'number');
    if (origPrices.length > 0) {
      const minPrice = Math.min(...origPrices);
      const maxPrice = Math.max(...origPrices);
      if (minPrice !== maxPrice) {
        return `Rs. ${minPrice.toLocaleString()} – Rs. ${maxPrice.toLocaleString()}`;
      }
      return `Rs. ${minPrice.toLocaleString()}`;
    }
  }
  return product.originalPrice ? `Rs. ${product.originalPrice.toLocaleString()}` : null;
}

export const CATEGORIES = [
  { name: 'Pickles', slug: 'pickles', description: 'Traditional homemade pickles cured in pure mustard oil and authentic spices.' },
  { name: 'Bundles', slug: 'bundles', description: 'Specially curated assortments of pickles for family and gifting occasions.' }
];

export const products: Product[] = [
  // Pickles Category (using mango_pickle.png to mix_pickle.png)
  {
    id: 'p1',
    name: 'Home Mango Achaar (Aam ka Achaar)',
    slug: 'home-mango-achaar',
    category: 'pickles',
    price: 650,
    originalPrice: 850,
    image: '/images/products/new_product_0.jpg',
    rating: 4.9,
    reviewsCount: 142,
    description: 'Our signature homemade mango pickle is crafted using raw green mangoes, cured in premium cold-pressed mustard oil, and infused with secret hand-ground spices passed down through generations.',
    ingredients: ['Raw Mangoes', 'Mustard Oil (Sarson ka Tel)', 'Fennel Seeds (Saunf)', 'Fenugreek Seeds (Methi Dana)', 'Mustard Seeds', 'Nigella Seeds (Kalonji)', 'Turmeric', 'Salt', 'Spices'],
    benefits: ['Supports digestion', 'Rich in antioxidants', 'Natural probiotic properties', 'No artificial preservatives'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    discount: 23,
    weightPrices: {
      '500g': { price: 650, originalPrice: 850 },
      '1kg':  { price: 1150, originalPrice: 1500 }
    }
  },
  {
    id: 'p2',
    name: 'Desi Lasoora Pickle (Gunda Achaar)',
    slug: 'desi-lasoora-pickle',
    category: 'pickles',
    price: 790,
    originalPrice: 950,
    image: '/images/products/new_product_1.webp',
    rating: 4.8,
    reviewsCount: 88,
    description: 'Lasoora (Glueberry) pickle is a timeless heritage recipe of Punjab. Soft, flavorful, and perfectly cured in pure mustard oil, this pickle delivers an authentic rustic taste.',
    ingredients: ['Lasoora (Glueberries)', 'Pure Mustard Oil', 'Kalonji', 'Saunf', 'Fenugreek Seeds', 'Turmeric', 'Red Chili Powder', 'Salt'],
    benefits: ['Traditional remedy for throat', 'Improves gut health', 'Pure homemade recipe'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    discount: 16,
    weightPrices: {
      '500g': { price: 790, originalPrice: 950 },
      '1kg':  { price: 1400, originalPrice: 1700 }
    }
  },
  {
    id: 'p3',
    name: 'Solar Punjabi Mix Achaar',
    slug: 'solar-punjabi-mix-achaar',
    category: 'pickles',
    price: 580,
    originalPrice: 700,
    image: '/images/products/new_product_2.png',
    rating: 4.7,
    reviewsCount: 95,
    description: 'A vibrant combination of seasonal green mangoes, carrots, lemons, green chilies, and lasooray, sun-ripened and preserved in premium mustard oil.',
    ingredients: ['Mangoes', 'Carrots', 'Lemons', 'Green Chilies', 'Lasoora', 'Mustard Oil', 'Turmeric', 'Kalonji', 'Saunf', 'Mustard Seeds', 'Salt'],
    benefits: ['Variety of flavors', 'Cured naturally under sunlight', 'High dietary fiber'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    discount: 17,
    weightPrices: {
      '500g': { price: 580, originalPrice: 700 },
      '1kg':  { price: 1050, originalPrice: 1250 }
    }
  },
  {
    id: 'p4',
    name: 'Khatta Meetha Mango Pickle',
    slug: 'khatta-meetha-mango-pickle',
    category: 'pickles',
    price: 680,
    originalPrice: 800,
    image: '/images/products/new_product_3.png',
    rating: 4.9,
    reviewsCount: 64,
    description: 'A delightful sweet and sour mango pickle sweetened naturally with organic jaggery (gur) and spiced with roasted cumin and black salt.',
    ingredients: ['Green Mangoes', 'Organic Jaggery (Gur)', 'Pure Mustard Oil', 'Black Salt', 'Cumin Seeds', 'Red Chili Flakes', 'Kalonji', 'Ginger Powder'],
    benefits: ['Perfect sweet-sour balance', 'No white sugar used', 'Great appetizer'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    discount: 15,
    weightPrices: {
      '500g': { price: 680, originalPrice: 800 },
      '1kg':  { price: 1200, originalPrice: 1400 }
    }
  },
  {
    id: 'p5',
    name: 'Premium Lahsun (Garlic) Achaar',
    slug: 'premium-garlic-achaar',
    category: 'pickles',
    price: 850,
    originalPrice: 1100,
    image: '/images/products/new_product_4.png',
    rating: 4.8,
    reviewsCount: 110,
    description: 'Whole organic garlic cloves marinated in a tangy mustard oil paste. Over time, the garlic cloves soften into rich, flavorful bites that are great for immunity.',
    ingredients: ['Peeled Garlic Cloves', 'Mustard Oil', 'Fenugreek Seeds', 'Mustard Seeds', 'Nigella Seeds', 'Asafoetida (Hing)', 'Red Chili', 'Lemon Juice'],
    benefits: ['Lowers cholesterol', 'Boosts cardiovascular health', 'Powerful immunity builder', 'Aromatic flavor profile'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    discount: 22,
    weightPrices: {
      '500g': { price: 850, originalPrice: 1100 },
      '1kg':  { price: 1500, originalPrice: 1950 }
    }
  },
  {
    id: 'p6',
    name: 'Green Chili & Lemon Pickle',
    slug: 'green-chili-lemon-pickle',
    category: 'pickles',
    price: 490,
    originalPrice: 600,
    image: '/images/products/new_product_5.webp',
    rating: 4.6,
    reviewsCount: 45,
    description: 'Spicy, hot green chilies sliced and cured with tangy lemons. Perfect for those who love a spicy, tongue-tingling accompaniment with their desi meals.',
    ingredients: ['Fresh Green Chilies', 'Tangy Lemons', 'Mustard Oil', 'Fennel Seeds', 'Salt', 'Turmeric Powder', 'Lemon Juice Preservative'],
    benefits: ['Rich in Vitamin C', 'Boosts metabolism', 'Highly appetizing'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    discount: 18,
    weightPrices: {
      '500g': { price: 490, originalPrice: 600 },
      '1kg':  { price: 880, originalPrice: 1050 }
    }
  },
  {
    id: 'p7',
    name: 'Delectable Amla (Gooseberry) Pickle',
    slug: 'amla-gooseberry-pickle',
    category: 'pickles',
    price: 750,
    originalPrice: 900,
    image: '/images/products/new_product_6.png',
    rating: 4.9,
    reviewsCount: 76,
    description: 'Healthy and tangy, our Amla Pickle brings the superfood benefits of gooseberries direct to your table, spiced with roasted mustard and kalonji seeds.',
    ingredients: ['Steamed Indian Gooseberries (Amla)', 'Sarson Oil', 'Turmeric', 'Yellow Mustard Seeds', 'Fennel Seeds', 'Salt', 'Chili Powder'],
    benefits: ['Immense source of Vitamin C', 'Good for hair and skin health', 'Aids liver function'],
    weight: ['500g', '1kg'],
    availability: 'in-stock',
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    discount: 16,
    weightPrices: {
      '500g': { price: 750, originalPrice: 900 },
      '1kg':  { price: 1350, originalPrice: 1600 }
    }
  },
  {
    id: 'p8',
    name: 'Adrak (Ginger) Tangy Achaar',
    slug: 'adrak-ginger-tangy-achaar',
    category: 'pickles',
    price: 600,
    originalPrice: 750,
    image: '/images/products/new_product_7.jpg',
    rating: 4.5,
    reviewsCount: 39,
    description: 'Julienned fresh ginger marinated with lemon juice, black salt, and a dash of mustard oil. A digestion booster that is crisp, sour, and mildly hot.',
    ingredients: ['Fresh Ginger Root', 'Lemon Juice', 'Mustard Oil', 'Black Salt', 'Carom Seeds (Ajwain)', 'Spices'],
    benefits: ['Relieves bloating and gas', 'Cures morning sickness', 'Improves digestion speed'],
    weight: ['500g'],
    availability: 'in-stock',
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    discount: 20,
    weightPrices: {
      '500g': { price: 600, originalPrice: 750 }
    }
  },
  // Bundles (using mango_pickle.png)
  {
    id: 'p22',
    name: 'Gharelu Shahi Pickle Bundle',
    slug: 'gharelu-shahi-pickle-bundle',
    category: 'bundles',
    price: 2499,
    originalPrice: 3200,
    image: '/images/products/new_product_21.jpg',
    rating: 5.0,
    reviewsCount: 33,
    description: 'A majestic gift box featuring our absolute best-selling homemade pickles: Mango Achaar (500g), Desi Lasoora Pickle (500g), Premium Garlic Achaar (500g), and Green Chili & Lemon Pickle (500g). Saves Rs. 700 + Free Shipping!',
    ingredients: ['Home Mango Achaar', 'Desi Lasoora Pickle', 'Premium Lahsun (Garlic) Achaar', 'Green Chili & Lemon Pickle'],
    benefits: ['Perfect family gift box', 'Includes free shipping', 'Amazing price value'],
    weight: ['Combined Pack'],
    availability: 'in-stock',
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    discount: 22,
    weightPrices: {
      'Combined Pack': { price: 2499, originalPrice: 3200 }
    }
  }
];
