import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './../../app/styles/calendar.css';
import { useClient } from '../../entities/client/api';
import ProgressBar from '../../components/ProgressBar';
import { useWorkouts } from '../../entities/workouts/api';

const ClientPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const clientIdNumber = Number(clientId);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const clientQuery = useClient(clientIdNumber);

  const workoutsQuery = useWorkouts(clientIdNumber);

  const { data: client, isLoading, isError, error } = clientQuery;
  const { data: workouts } = workoutsQuery;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onDayClick = (value: Date) => {
    navigate(`/client/${clientIdNumber}/training/${formatDate(value)}`);
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
