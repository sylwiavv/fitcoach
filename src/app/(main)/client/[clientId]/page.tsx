import type { Metadata } from 'next';

import ClientPage from '@/views/Client/ClientPage';

type Props = { params: Promise<{ clientId: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { clientId } = await params;
  return { title: `Client ${clientId}` };
};

const Page = () => {
  return <ClientPage />;
};

export default Page;
