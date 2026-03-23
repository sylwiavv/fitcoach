import type { Metadata } from 'next';

import AddExerciseToClientPage from '@/views/AddExerciseToClient/AddExerciseToClient';

type Props = { params: Promise<{ clientId: string; date: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { clientId, date } = await params;
  return { title: `Training ${date} · ${clientId}` };
};

const Page = () => {
  return <AddExerciseToClientPage />;
};

export default Page;
