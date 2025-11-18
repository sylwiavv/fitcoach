import 'react-calendar/dist/Calendar.css';
import './../../app/styles/calendar.css';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate, useParams } from 'react-router-dom';

import ProgressBar from '../../components/ProgressBar';
import { useClient } from '../../entities/client/api';
import { useWorkouts } from '../../entities/workouts/api';
import { MonthlyProgressChart } from '../../widgets/MonthlyProgressChart/MonthlyProgressChart';

const ClientPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  console.log(clientId);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const clientQuery = useClient(clientId);

  const workoutsQuery = useWorkouts(clientId);

  const { data: client, isLoading, isError, error } = clientQuery;
  const { data: workouts } = workoutsQuery;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onDayClick = (value: Date) => {
    navigate(`/client/${clientId}/training/${formatDate(value)}`);
  };

  if (isLoading) return <div>Ładowanie podopiecznego...</div>;
  if (isError) return <div className="text-red-500">Błąd: {(error as Error).message}</div>;

  const workoutsByMonth: Record<string, typeof workouts> = {};
  workouts?.forEach((w) => {
    const d = new Date(w.date);
    const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!workoutsByMonth[key]) workoutsByMonth[key] = [];
    workoutsByMonth[key].push(w);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-eerieBlack">Podopieczny {client?.name}</h1>
      {client?.avatar && (
        <img src={client.avatar} alt={client.name} className="w-32 h-32 rounded-full mb-4" />
      )}
      {Object.entries(workoutsByMonth).map(([monthKey, monthWorkouts]) => {
        const totalPlanned = monthWorkouts?.length;
        const completedCount = monthWorkouts?.filter((w) => w.completed).length;

        const [year, month] = monthKey.split('-');
        const monthName = new Date(Number(year), Number(month) - 1).toLocaleString('pl-PL', {
          month: 'long',
          year: 'numeric',
        });

        return (
          <div key={monthKey} className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Postęp za {monthName}</h2>
            <ProgressBar completed={completedCount || 0} total={totalPlanned || 0} />
          </div>
        );
      })}
      <MonthlyProgressChart workouts={workouts || []} />

      <div className="calendar-container bg-ghost-white p-6 rounded-2xl shadow-md mt-6">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={onDayClick}
          prev2Label={null}
          next2Label={null}
          tileClassName={({ date }) => {
            if (!workouts) return '';
            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            return workouts.some((w) => w.date === dateStr) ? 'has-training' : '';
          }}
        />
      </div>
    </div>
  );
};

export default ClientPage;
