import 'react-calendar/dist/Calendar.css';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useClients } from '../../entities/client/api';
import { useCreateWorkoutForDay } from '../../entities/workouts/api';
import { BackButton } from '../../shared/ui';
import { InputField } from '../../shared/ui/InputFIeld';

const AddWorkoutPage: React.FC = () => {
  const { clientId: paramClientId } = useParams<{ clientId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: clients = [], isLoading } = useClients();
  const createWorkoutMutation = useCreateWorkoutForDay();

  const [selectedClientId, setSelectedClientId] = useState<string>(paramClientId || '');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const queryDate = new URLSearchParams(location.search).get('date');
    if (queryDate) setSelectedDate(new Date(queryDate));
  }, [location.search]);

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
          navigate(`/client/${selectedClientId}/training/${formattedDate}`);
        },
      },
    );
  };

  return (
    <>
      <BackButton />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Assign Workout</h1>

        {!paramClientId && (
          <InputField
            label="Client"
            type="select"
            value={selectedClientId}
            onChange={(value) => setSelectedClientId(value)}
            placeholder="Select a client"
            options={clients.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />
        )}

        <label className="flex flex-col">
          Date:
          <Calendar
            value={selectedDate}
            onChange={(date) => {
              if (!Array.isArray(date)) setSelectedDate(date as Date);
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
    </>
  );
};

export default AddWorkoutPage;
