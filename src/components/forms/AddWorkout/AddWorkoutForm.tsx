// AddWorkoutForm.tsx
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useLocation, useNavigate } from 'react-router-dom';

import { useClients } from '../../../entities/clients/model/queries';
import { useCreateWorkoutForDay } from '../../../entities/workout';
import { InputField } from '../../../shared/ui/InputFIeld';
import PrimaryButton from '../../PrimaryButton';

interface Props {
  initialClientId?: string;
}

const AddWorkoutForm: React.FC<Props> = ({ initialClientId }) => {
  const { data: clients = [] } = useClients();
  const createWorkoutMutation = useCreateWorkoutForDay();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedClientId, setSelectedClientId] = useState<string | number>(initialClientId || '');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    const queryDate = new URLSearchParams(location.search).get('date');
    if (queryDate) setSelectedDate(new Date(queryDate));
  }, [location.search]);

  const handleSubmit = () => {
    if (!selectedClientId) {
      setError('Please select a client');
      return;
    }

    setError('');

    const formattedDate = selectedDate.toISOString().split('T')[0];

    createWorkoutMutation.mutate(
      { clientId: selectedClientId as string, date: formattedDate },
      {
        onSuccess: () => {
          navigate(`/client/${selectedClientId}/training/${formattedDate}`);
        },
      },
    );
  };

  return (
    <>
      {!initialClientId && (
        <div className="bg-white rounded-xl p-4">
          <InputField
            label="Client"
            type="select"
            value={selectedClientId}
            onChange={(value) => {
              setSelectedClientId(value);
              setError('');
            }}
            placeholder="Select a client"
            options={clients.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />

          {error && <p className="text-red text-sm mt-1">{error}</p>}
        </div>
      )}

      <div className="bg-white p-4 rounded-xl">
        <label className="flex flex-col">
          <span className="font-extrabold text-gray-700 uppercase text-xs pl-1">Date</span>

          <Calendar
            value={selectedDate}
            onChange={(date) => {
              if (!Array.isArray(date)) setSelectedDate(date as Date);
            }}
            className="mt-2"
          />
        </label>
      </div>

      <div>
        <PrimaryButton onClick={handleSubmit} disabled={createWorkoutMutation.isPending}>
          {createWorkoutMutation.isPending ? (
            'Assigning...'
          ) : (
            <>
              <b>+</b> Assign Workout
            </>
          )}
        </PrimaryButton>
      </div>
    </>
  );
};

export default AddWorkoutForm;
