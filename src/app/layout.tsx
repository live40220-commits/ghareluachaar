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
  description: 'Gharelu Achaar brings you 100% pure homemade pickles (achaar), murabba, chutneys, traditional spices (masalay), pure Sidr honey, sauces, and natural syrups. Prepared with love and mustard oil in Pakistan.',
  keywords: ['pickle', 'achaar', 'murabba', 'homemade pickles', 'mango pickle', 'amla murabba', 'pure honey', 'sidr honey', 'pakistani food', 'gharelu achaar', 'soghat-e-khas'],
  openGraph: {
    title: 'Gharelu Achaar | Pure Homemade Taste, Delivered Fresh',
    description: '100% pure homemade pickles, murabba, and traditional food products delivered fresh across Pakistan.',
    url: 'https://ghareluachaar.vercel.app',
    siteName: 'Gharelu Achaar',
    images: [
      {
        url: '/images/hero/2.webp',
        width: 1080,
        height: 1080,
        alt: 'Gharelu Achaar Premium Homemade Products',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gharelu Achaar | Pure Homemade Taste, Delivered Fresh',
    description: '100% pure homemade pickles, murabbas, and traditional Pakistani food products.',
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
