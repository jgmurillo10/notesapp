import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavBar } from '@/components/navbar'
import { Analytics } from '@vercel/analytics/react';
import { Locale, i18n } from '../../../i18n-config';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIssistant | Juan Murillo',
  description: 'Created by Juan Murillo',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale: Locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  return (
    <html lang={lang} className="dark">
      <body className="dark:bg-black text-black dark:text-white">
        <NavBar lang={lang}>
          {children}
        </NavBar>
        <Footer lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
