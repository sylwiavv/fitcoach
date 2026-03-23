'use client';

import type { ReactNode } from 'react';

import { Navbar } from '../../widgets/Navbar';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen text-eerieBlack grid grid-cols-[200px_minmax(900px,1fr)_100px]">
      <Navbar />
      <main className="p-8 max-w-4xl">{children}</main>
    </div>
  );
};
