import 'react-calendar/dist/Calendar.css';

import React, { useState } from 'react';
import Calendar from 'react-calendar';

import { useClients } from '../../entities/client/api';
import { useCreateWorkoutForDay } from '../../entities/workouts/api';

const AddWorkoutForm: React.FC = () => {
  const { data: clients = [] } = useClients();
  const createWorkoutMutation = useCreateWorkoutForDay();

  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    if (!selectedClientId) {
      alert('Please select a client');
      return;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];

    createWorkoutMutation.mutate(
      { clientId: selectedClientId, date: formattedDate },
      {
        onSuccess: () => {
          alert(`Workout assigned for ${formattedDate}`);
        },
      },
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Assign Workout</h1>

      <label className="flex flex-col">
        Client:
        <select
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
          className="border p-2 rounded mt-1"
        >
          <option value="">Select a client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Date:
        <Calendar
          value={selectedDate}
          onChange={(date) => {
            if (!Array.isArray(date)) setSelectedDate(date);
          }}
          className="mt-2"
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={createWorkoutMutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {createWorkoutMutation.isPending ? 'Assigning...' : 'Assign Workout'}
      </button>
    </div>
  );
};

export default AddWorkoutForm;
