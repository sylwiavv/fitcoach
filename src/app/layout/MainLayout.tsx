import { Outlet } from 'react-router-dom';

import { Navbar } from '../../widgets/Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen text-eerieBlack grid grid-cols-[200px_minmax(900px,_1fr)_100px]">
      <Navbar />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};
