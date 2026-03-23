import type { Metadata, Viewport } from 'next';
import { Urbanist } from 'next/font/google';
import type { ReactNode } from 'react';

import { Providers } from './providers';

import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'FitCoach',
    template: '%s | FitCoach',
  },
  description: 'Coach dashboard and client training plans',
};

export const viewport: Viewport = {
  themeColor: '#d9dfe9',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
