import type { Metadata } from 'next';

import AddExercisePage from '@/views/AddExercisePage/AddExercisePage';

export const metadata: Metadata = {
  title: 'Add exercise',
};

const Page = () => {
  return <AddExercisePage />;
};

export default Page;
