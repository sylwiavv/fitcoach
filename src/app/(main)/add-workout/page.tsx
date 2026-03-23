import type { Metadata } from 'next';

import AddWorkoutPage from '@/views/AddWorkoutPage/AddWorkoutPage';

export const metadata: Metadata = {
  title: 'Assign workout',
};

const Page = () => {
  return <AddWorkoutPage />;
};

export default Page;
