import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { IconOnion } from '@/icons/IconOnion';

const inter = Inter({ subsets: ['latin'] });

export function generateMetadata(): Metadata {
  const metadataBase = process.env.HOME_URL || process.env.VERCEL_URL;
  if (!metadataBase) throw new Error('Missing process.env.HOME_URL');

  return {
    title: 'My startup progress | Cibulka.codes',
    description: `Test assingment for OAK'S LAB`,
    openGraph: {
      images: [{ url: `/og_cibulka-codes.png`, width: 1200, height: 630 }],
    },
    metadataBase: new URL(metadataBase),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="app" className="flex flex-col min-h-screen">
          <main id="main" className="flex flex-1 items-center justify-center">
            {children}
          </main>
          <footer className="flex items-center justify-center gap-2 py-1 text-sm bg-slate-800 text-white">
            <span className="w-6 h-6 text-emerald-500">
              <IconOnion />
            </span>
            <span>
              Made with love by{` `}
              <a className="underline" href="https://www.cibulka.codes">
                www.cibulka.codes
              </a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
