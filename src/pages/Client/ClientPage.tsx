import 'react-calendar/dist/Calendar.css';
import './../../app/styles/calendar.css';

import { useState } from 'react';
import Calendar, { type CalendarProps } from 'react-calendar';
import type { Value } from 'react-calendar/dist/shared/types.js';
import { useNavigate, useParams } from 'react-router-dom';

import ProgressBar from '../../components/ProgressBar';
import { useClient } from '../../entities/client/api';
import {
  useCreateWorkoutForDay,
  useExercisesByDate,
  useWorkoutsByClient,
} from '../../entities/workouts/api';
import { MonthlyProgressChart } from '../../widgets/MonthlyProgressChart/MonthlyProgressChart';

const ClientPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  if (!clientId) return <div>Client not found</div>;

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { data: client, isLoading, isError, error } = useClient(clientId);
  const { data: workouts = [] } = useWorkoutsByClient(clientId);
  // const { data: exercises = [], refetch: refetchExercises } = useExercisesByDate(
  const { refetch: refetchExercises } = useExercisesByDate(clientId, formatDate(date));

  const createWorkoutMutation = useCreateWorkoutForDay({
    onSuccess: () => {
      refetchExercises();
    },
  });

  const handleDayClick = (value: Date) => {
    const dateStr = formatDate(value);
    createWorkoutMutation.mutate({ clientId, date: dateStr });
    setDate(value);
    navigate(`/client/${clientId}/training/${dateStr}`);
  };

  if (isLoading) return <div>Loading client...</div>;
  if (isError) return <div className="text-red-500">Error: {(error as Error).message}</div>;

  const workoutsByMonth: Record<string, typeof workouts> = {};
  workouts.forEach((w) => {
    const d = new Date(w.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!workoutsByMonth[key]) workoutsByMonth[key] = [];
    workoutsByMonth[key].push(w);
  });

  const handleDateChange: CalendarProps['onChange'] = (value: Value) => {
    if (value && !Array.isArray(value)) {
      setDate(value);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-eerieBlack">Client {client?.name}</h1>

      {client?.avatar && (
        <img src={client.avatar} alt={client.name} className="w-32 h-32 rounded-full mb-4" />
      )}

      <button
        className="px-2 py-1 bg-green-500 text-white rounded mb-4"
        onClick={() => navigate(`/clients/${clientId}/add-exercise`)}
      >
        Add Exercise
      </button>

      {/* <div className="mt-4">
        <h3 className="font-semibold mb-2">Exercises for {formatDate(date)}:</h3>
        {exercises.length === 0 && <div>No exercises</div>}
        {exercises.map((ex) => (
          <div key={ex.id}>
            {ex.exercise?.name} — {ex.sets}x{ex.reps}, {ex.load} kg
          </div>
        ))}
      </div> */}

      {Object.entries(workoutsByMonth).map(([monthKey, monthWorkouts]) => {
        const totalPlanned = monthWorkouts.length;
        const completedCount = monthWorkouts.filter((w) => w.completed).length;
        const [year, month] = monthKey.split('-');
        const monthName = new Date(Number(year), Number(month) - 1).toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        });

        return (
          <div key={monthKey} className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Progress for {monthName}</h2>
            <ProgressBar completed={completedCount} total={totalPlanned} />
          </div>
        );
      })}

      <MonthlyProgressChart workouts={workouts} />

      <div className="calendar-container bg-ghost-white p-6 rounded-2xl shadow-md mt-6">
        <Calendar
          onChange={handleDateChange}
          value={date}
          onClickDay={handleDayClick}
          prev2Label={null}
          next2Label={null}
          tileClassName={({ date }) => {
            const dateStr = formatDate(date);
            return workouts.some((w) => w.date === dateStr) ? 'has-training' : '';
          }}
        />
      </div>
    </div>
  );
};

export default ClientPage;
