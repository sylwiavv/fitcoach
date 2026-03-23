import { Suspense, type ReactNode } from 'react';

import { MainLayout } from '@/shell/layout/MainLayout';

/** App uses client-side Supabase + React Query; avoid static prerender without env. */
export const dynamic = 'force-dynamic';

const MainAppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainLayout>
      <Suspense fallback={<div className="p-8 text-eerieBlack animate-pulse">Loading…</div>}>
        {children}
      </Suspense>
    </MainLayout>
  );
};

export default MainAppLayout;
