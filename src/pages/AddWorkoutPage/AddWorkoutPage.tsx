import 'react-calendar/dist/Calendar.css';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PrimaryButton from '../../components/PrimaryButton';
import { useClients } from '../../entities/clients/model/queries';
import { useCreateWorkoutForDay } from '../../entities/workout';
import { BackButton } from '../../shared/ui';
import { InputField } from '../../shared/ui/InputFIeld';
import SectionHeader from '../../shared/ui/SectionHeader';

const AddWorkoutPage: React.FC = () => {
  const { clientId: paramClientId } = useParams<{ clientId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const open = query.get('open') === 'true';

  const { data: clients = [] } = useClients();
  const createWorkoutMutation = useCreateWorkoutForDay();

  const [selectedClientId, setSelectedClientId] = useState<string | number>(paramClientId || '');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');

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
      <BackButton />

      <div className="flex flex-col gap-4">
        <SectionHeader
          title="Assign Workout"
          description="Select a client from the list, choose a day, and assign a new workout."
        />

        <div
          className={`
    shadow mt-2 bg-ghost-grey p-6 rounded-main flex flex-col gap-4 relative
    after:absolute after:inset-0 after:bg-blue-950/10 after:rounded-main after:pointer-events-none after:content-[""]
    after:transition-all after:duration-300 after:ease-in-out
    ${open ? 'after:opacity-100 after:scale-100' : 'after:opacity-0 after:scale-95'}
  `}
        >
          {!paramClientId && (
            <div className="bg-white p-2 rounded-xl">
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
              <span className="font-extrabold text-gray-700 uppercase text-xs">Date</span>
              <Calendar
                value={selectedDate}
                onChange={(date) => {
                  if (!Array.isArray(date)) setSelectedDate(date as Date);
                }}
                className="mt-2"
              />
            </label>

            <PrimaryButton onClick={handleSubmit} disabled={createWorkoutMutation.isPending}>
              {createWorkoutMutation.isPending ? (
                'Assigning...'
              ) : (
                <>
                  <b>+</b>Assign Workout
                </>
              )}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkoutPage;
