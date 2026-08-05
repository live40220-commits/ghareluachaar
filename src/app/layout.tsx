import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { ShopProvider } from '@/context/ShopContext';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Gharelu Achaar | Pure Homemade Taste, Delivered Fresh',
    template: '%s | Gharelu Achaar',
  },
  description: 'Gharelu Achaar brings you 100% pure homemade pickles (achaar) and curated pickle bundles. Prepared with love and mustard oil in Pakistan.',
  keywords: ['pickle', 'achaar', 'homemade pickles', 'mango pickle', 'garlic pickle', 'mixed pickle', 'pakistani food', 'gharelu achaar', 'soghat-e-khas'],
  openGraph: {
    title: 'Gharelu Achaar | Pure Homemade Taste, Delivered Fresh',
    description: '100% pure homemade pickles (achaar) and curated pickle bundles delivered fresh across Pakistan.',
    url: 'https://ghareluachaar.vercel.app',
    siteName: 'Gharelu Achaar',
    images: [
      {
        url: '/images/hero/2.webp',
        width: 1080,
        height: 1080,
        alt: 'Gharelu Achaar Premium Homemade Pickles',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gharelu Achaar | Pure Homemade Taste, Delivered Fresh',
    description: '100% pure homemade pickles (achaar) and curated pickle bundles delivered fresh across Pakistan.',
    images: ['/images/hero/2.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-cream text-text-dark font-sans">
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
