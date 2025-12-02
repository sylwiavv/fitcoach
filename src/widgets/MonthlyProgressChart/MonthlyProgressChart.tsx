import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { Workout } from '../../entities/workout/model/types';
import { colors } from '../../shared/lib/colors';

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
    return { month: monthName, completed, planned: total };
  });

  return (
    <div className="bg-ghost-grey p-6 rounded-main">
      <h2 className="text-lg font-semibold mb-4">Annual progress ({year})</h2>
      <div className="h-64 bg-white p-4 rounded shadow mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                padding: '0.5rem',
                border: `1px solid ${colors.borderColor}`,
                boxShadow: `0px 1px 2px ${colors.borderColor}`,
              }}
              labelStyle={{
                color: colors.eerieBlack,
                fontWeight: '700',
              }}
            />
            <Bar dataKey="completed" fill={colors.darkViolet} />
            <Bar dataKey="planned" fill={colors.lightViolet2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
