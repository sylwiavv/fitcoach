import 'react-calendar/dist/Calendar.css';
import './../../app/styles/calendar.css';

import { useState } from 'react';
import Calendar, { type CalendarProps } from 'react-calendar';
import type { Value } from 'react-calendar/dist/shared/types.js';
import { useNavigate, useParams } from 'react-router-dom';

import ProgressBar from '../../components/ProgressBar';
import TwoColorAvatar from '../../components/TwoColorAvatar';
import { useClient } from '../../entities/clients/model/queries';
import { useWorkoutsByClient } from '../../entities/workout';
import { BackButton } from '../../shared/ui';
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
  const { avatar, name, created_at } = client || {};
  const { data: workouts = [] } = useWorkoutsByClient(clientId);

  const handleDayClick = (value: Date) => {
    const dateStr = formatDate(value);
    setDate(value);

    const existingWorkout = workouts.find((w) => w.date === dateStr);

    if (existingWorkout) {
      navigate(`/client/${clientId}/training/${dateStr}`);
    } else {
      navigate(`/client/${clientId}/add-workout?date=${dateStr}`);
    }
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
    <>
      <BackButton />

      <div className="flex items-center gap-4 mb-6 bg-[#f7f6f9] p-4 rounded-4xl">
        {avatar && <TwoColorAvatar avatar={avatar} size={120} />}
        <div>
          <h1 className="text-2xl font-bold  text-eerieBlack">{name}</h1>
          <span>
            From {''}
            {new Date(created_at as Date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

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
    </>
  );
};

export default ClientPage;
