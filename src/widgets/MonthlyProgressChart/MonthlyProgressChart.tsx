import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { Workout } from '../../entities/workouts/types';

type MonthlyProgressChartProps = {
  workouts?: Workout[];
  year?: number;
};

export const MonthlyProgressChart: React.FC<MonthlyProgressChartProps> = ({
  workouts = [],
  year = new Date().getFullYear(),
}) => {
  const workoutsByMonth: Record<number, Workout[]> = {};
  for (let i = 0; i < 12; i++) workoutsByMonth[i] = [];

  workouts.forEach((w) => {
    const d = new Date(w.date);
    if (d.getFullYear() === year) {
      workoutsByMonth[d.getMonth()].push(w);
    }
  });

  const data = Object.entries(workoutsByMonth).map(([monthIndex, monthWorkouts]) => {
    const completed = monthWorkouts.filter((w) => w.completed).length;
    const total = monthWorkouts.length;
    const monthName = new Date(year, Number(monthIndex)).toLocaleString('en-EN', {
      month: 'short',
    });
    return { month: monthName, ukończone: completed, planowane: total };
  });

  return (
    <div className="h-64 bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Progres roczny ({year})</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ukończone" fill="#4ade80" />
          <Bar dataKey="planowane" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
