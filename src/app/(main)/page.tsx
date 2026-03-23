import type { Metadata } from 'next';

import { DashboardPage } from '@/views/Dashboard/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const HomePage = () => {
  return <DashboardPage />;
};

export default HomePage;
