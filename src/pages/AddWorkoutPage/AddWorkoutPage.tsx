import 'react-calendar/dist/Calendar.css';

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AddWorkoutForm from '../../components/forms/AddWorkout/AddWorkoutForm';
import { BackButton } from '../../shared/ui';
import SectionHeader from '../../shared/ui/SectionHeader';

const AddWorkoutPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const open = query.get('open') === 'true';

  return (
    <>
      <BackButton />

      <div className="flex flex-col gap-4">
        <SectionHeader
          title="Assign Workout"
          description="Select a client from the list, choose a day, and assign a new workout."
        />

        <div
          className={`
            shadow mt-2 bg-ghost-grey p-6 rounded-main flex flex-col gap-4 relative
            after:absolute after:inset-0 after:bg-blue-950/10 after:rounded-main after:pointer-events-none 
            after:content-[""] after:transition-all after:duration-300 after:ease-in-out
            ${open ? 'after:opacity-100 after:scale-100' : 'after:opacity-0 after:scale-95'}
          `}
        >
          <AddWorkoutForm initialClientId={clientId} />
        </div>
      </div>
    </>
  );
};

export default AddWorkoutPage;
