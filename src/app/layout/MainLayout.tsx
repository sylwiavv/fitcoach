import { Outlet } from 'react-router-dom';

import { Navbar } from '../../widgets/Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-ghostWhite text-eerieBlack">
      <Navbar />
      <main className="py-8">
        <Outlet />
      </main>
    </div>
  );
};
