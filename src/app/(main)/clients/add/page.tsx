import type { Metadata } from 'next';

import AddClientPage from '@/views/AddNewCLient/AddNewClientPage';

export const metadata: Metadata = {
  title: 'Add client',
};

const Page = () => {
  return <AddClientPage />;
};

export default Page;
