import type { Metadata } from 'next';

import ClientsPage from '@/views/Clients/Clients';

export const metadata: Metadata = {
  title: 'Clients',
};

const Page = () => {
  return <ClientsPage />;
};

export default Page;
