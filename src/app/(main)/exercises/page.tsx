import type { Metadata } from 'next';

import { ExercisesPage } from '@/views/ExercisesPage/ExercisesPage';

export const metadata: Metadata = {
  title: 'Exercises',
};

const Page = () => {
  return <ExercisesPage />;
};

export default Page;
