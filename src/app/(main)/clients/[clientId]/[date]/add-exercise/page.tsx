import type { Metadata } from 'next';

import AddExercisePage from '@/views/AddExercisePage/AddExercisePage';

type Props = { params: Promise<{ clientId: string; date: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { clientId, date } = await params;
  return { title: `Add exercise · ${date}` };
};

const Page = () => {
  return <AddExercisePage />;
};

export default Page;
