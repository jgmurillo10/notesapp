import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from '@/components/navbar';
import { Analytics } from '@vercel/analytics/react';
import { Locale, i18n } from '../../../i18n-config';
import { Footer } from '@/components/footer';
import { NextAuthProvider, ThemeProvider } from '../providers';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIssistant | Juan Murillo',
  description: 'Created by Juan Murillo',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale: Locale) => ({ lang: locale }));
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Assistants', href: '/assistants' },
];

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.className} dark:bg-black text-black bg-white dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <Header navigation={navigation} lang={lang} />
            <main className="relative isolate min-h-screen pt-14">
              {children}
            </main>
            <Footer lang={lang} />
            <Analytics />
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
