export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'recipes' | 'tips' | 'health';
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
}

export const blogs: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of Traditional Pickle Curing: Golden Rules from Dadi Jaan',
    slug: 'art-of-traditional-pickle-curing',
    excerpt: 'Discover the secrets behind preserving homemade achaar without any chemicals, focusing on raw sun curing and pure mustard oil saturation.',
    category: 'tips',
    publishedAt: 'July 15, 2026',
    readTime: '5 min read',
    author: 'Ayesha Bibi, Master Pickler',
    image: '/images/products/pickle_1.webp',
    tags: ['Achaar Curing', 'Desi Cooking', 'Homemade Tips', 'Preservation'],
    content: `
Homemade achaar is more than just a condiment; it is a labor of love, history, and wisdom. Over decades, the traditional recipes of Pakistani household pickles have relied on natural preservation methods. Here are the four golden rules to ensure your pickles stay fresh for years without artificial preservatives:

### 1. Absolute Dryness is Key
The number one enemy of pickle preservation is moisture. Every utensil, jar, knife, and cutting board must be bone-dry. Before pickling, raw fruits like mangoes or lasooray should be tossed in salt and turmeric, left to release water, and then sun-dried on clean cotton sheets for 6 to 8 hours until completely dry to the touch.

### 2. The Saturation of Mustard Oil
Mustard oil (Sarson ka Tel) acts as a natural barrier between air and the pickling ingredients. Jars must be filled so that the oil layer sits at least one inch above the pickles. This prevents oxidation and the growth of mold. Always use raw, cold-pressed mustard oil for the best flavor and shelf life.

### 3. Sun Curing (Dhoop Lagana)
Nothing can replace the slow heat of the sun. Keep the pickle jar wrapped in a clean muslin cloth under direct sunlight for 7 to 10 days, shaking it gently twice a day. The natural sun heat helps mature the spices, softens the skin of the pickles, and releases flavor compounds.

### 4. Glass or Clay Jars Only
Traditional pickles should always be stored in sterilized glass jars or traditional clay pots (Martaaban). Avoid plastic containers as the acid in lemons and mangoes react with plastic, altering the flavor and safety of the food.
    `
  },
  {
    id: 'b2',
    title: '5 Health Benefits of Apple and Amla Murabba in Your Daily Diet',
    slug: 'health-benefits-apple-amla-murabba',
    excerpt: 'According to Eastern Unani medicine, starting your day with a silver-leaf coated piece of Murabba delivers unmatched benefits for heart, mind, and energy.',
    category: 'health',
    publishedAt: 'July 10, 2026',
    readTime: '4 min read',
    author: 'Dr. Tariq Chishti, Herbal Medicine Specialist',
    image: '/images/products/pickle_9.webp',
    tags: ['Amla', 'Apple Murabba', 'Eastern Medicine', 'Vitality', 'Gut Health'],
    content: `
Preserving fruits in honey or syrup is an ancient wellness tradition. In Pakistani households, Apple (Seb) and Gooseberry (Amla) Murabbas are revered as organic nutritional supplements. Here are 5 science-backed and traditional health benefits of introducing these sweet preserves into your morning routine:

### 1. Natural Heart and Brain Booster
Apple Murabba is highly recommended for cardiovascular strength. It helps prevent cardiac congestion, lowers blood pressure, and reduces mental fatigue. Consuming a slice of apple murabba on an empty stomach improves focus and treats general anxiety.

### 2. Powerhouse of Vitamin C (Amla)
Amla is the richest natural source of Vitamin C. A single piece of Amla Murabba contains the Vitamin C equivalent of 20 oranges. It boosts the immune system, helping your body fight off colds, influenza, and throat infections.

### 3. Solves Digestive and Acidic Issues
Both Amla and Harar Murabbas are cooling agents for the stomach. They stimulate gastric juices, relieve bloating, and are excellent natural remedies for chronic constipation and acidity.

### 4. Revitalizes Skin and Promotes Hair Growth
The high antioxidant content in organic amla cleanses toxins from the liver and bloodstream. This results in glowing, spot-free skin and strengthens hair follicles, preventing premature graying and hair fall.

### 5. Fights Physical Weakness & Anaemia
Rich in iron and essential minerals, Seb Murabba increases hemoglobin levels, making it a perfect natural daily tonic for children, pregnant mothers, and elderly individuals recovering from illness.
    `
  },
  {
    id: 'b3',
    title: 'Dadi Jaan\'s Royal Mango Chutney Recipe: Perfect Paratha Sidekick',
    slug: 'dadi-jaans-royal-mango-chutney-recipe',
    excerpt: 'Learn how to make our best-selling Khattay Meethay Aam ki Chutney at home, complete with melon seeds and aromatic kalonji.',
    category: 'recipes',
    publishedAt: 'June 28, 2026',
    readTime: '6 min read',
    author: 'Ayesha Bibi, Master Pickler',
    image: '/images/products/pickle_13.webp',
    tags: ['Chutney Recipe', 'Mango Chutney', 'Traditional Recipes', 'Pakistani Food'],
    content: `
A dollop of sweet and tangy mango chutney is all it takes to transform a basic dal-chawal or a plain paratha into a royal feast. Today, we are sharing the authentic recipe for our **Khattay Meethay Aam ki Chutney**, exactly as we make it in our kitchens.

### Ingredients:
* Raw Mangoes (grated) - 1 kg
* Sugar or Jaggery (Gur) - 750g
* Fennel Seeds (Saunf) - 1 tbsp
* Nigella Seeds (Kalonji) - 1 tsp
* Melon Seeds (Char Maghaz) - 2 tbsp
* Red Chili Powder - 1 tsp
* Black Salt - 1 tsp
* Vinegar - 4 tbsp (acts as natural preservative)
* Ginger (finely chopped) - 1 tbsp

### Instructions:
1. **Prep the Mangoes:** Peel and grate the raw mangoes. Place them in a heavy-bottomed pan.
2. **Slow Cook with Sugar:** Add the sugar (or crushed jaggery) to the grated mangoes and let it sit for 20 minutes until the sugar starts dissolving in the mango juices.
3. **Simmer:** Turn on the flame to low-medium. Bring the mixture to a simmer. Cook for about 20-25 minutes, stirring occasionally, until the mangoes become translucent and the syrup reaches a one-string consistency.
4. **Spice It Up:** Add the fennel seeds, kalonji, red chili powder, black salt, and chopped ginger. Mix well and cook for another 5 minutes.
5. **Add the Finishes:** Stir in the vinegar (which adds a wonderful tang and preserves the chutney) and throw in the melon seeds (Char Maghaz) for that beautiful royal crunch.
6. **Cool and Store:** Let the chutney cool completely. Transfer it to a dry, sterilized glass jar. It will stay fresh at room temperature for up to 6 months!
    `
  }
];
export const faqs = [
  {
    question: 'Are your products 100% homemade and organic?',
    answer: 'Yes. All Gharelu Achaar products are prepared in small batches by local homemakers using hand-picked organic fruits, cold-pressed mustard oil, and premium stone-ground spices. We never use artificial preservatives, colors, or chemicals.'
  },
  {
    question: 'How do you ship glass jars safely across Pakistan?',
    answer: 'We use premium multi-layer bubble wrap, custom corrugated boxes, and shock-absorbent cushioning to ensure glass jars arrive in perfect condition. In the rare event of damage, we offer a hassle-free instant replacement or refund.'
  },
  {
    question: 'What is the shelf life of your pickles and murabbas?',
    answer: 'Our pickles last for 1 to 2 years if handled correctly (always use a dry spoon and keep the pickle submerged in oil). Murabbas last for 1 year in a cool, dry place.'
  },
  {
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes! We offer cash on delivery all over Pakistan. We also accept direct bank transfers for advance payments.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via SMS/Email. You can also visit our "Track Order" page and enter your Order ID to see real-time delivery status.'
  }
];
export const careers = [
  {
    id: 'c1',
    title: 'Regional Logistics Coordinator',
    department: 'Operations',
    location: 'Lahore, Pakistan',
    type: 'Full-time',
    description: 'Manage shipping networks, coordinate with courier services (TCS, Leopard, Leopards, CallCouriers), and optimize delivery timelines for premium orders across Pakistan.'
  },
  {
    id: 'c2',
    title: 'Senior Content Creator & Storyteller',
    department: 'Marketing',
    location: 'Karachi, Pakistan (Hybrid)',
    type: 'Full-time',
    description: 'Craft beautiful heritage-driven content, capture rustic photography/reels of food production, and tell the brand story of Gharelu Achaar on social media.'
  },
  {
    id: 'c3',
    title: 'Quality Assurance Inspector (Food Sciences)',
    department: 'Production',
    location: 'Multan, Pakistan',
    type: 'Full-time',
    description: 'Ensure food preparation standards, direct batch testing for acidity, moisture, and shelf-life, and maintain the authentic homemade quality across our hubs.'
  }
];
