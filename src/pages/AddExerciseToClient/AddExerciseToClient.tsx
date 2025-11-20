import React from 'react';
import { useParams } from 'react-router-dom';

import AddExerciseToClientForm from '../../components/AddExerciseToClientForm';

const AddExerciseToClientPage: React.FC = () => {
  const { clientId, date } = useParams<{ clientId: string; date: string }>();

  if (!clientId || !date) return <div>Client or date not found</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Exercise</h1>
      <AddExerciseToClientForm clientId={clientId} date={date} />
    </div>
  );
};

export default AddExerciseToClientPage;
