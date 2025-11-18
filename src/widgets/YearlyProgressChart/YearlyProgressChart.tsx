import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Workout = { date: string; completed: boolean };

type YearlyProgressChartProps = {
  workouts: Workout[] | undefined;
};

export const YearlyProgressChart: React.FC<YearlyProgressChartProps> = ({ workouts }) => {
  if (!workouts) return null;

  const months = Array.from({ length: 12 }, (_, i) => i); // 0-11
  const data = months.map((month) => {
    const monthWorkouts = workouts.filter((w) => new Date(w.date).getMonth() === month);
    const completed = monthWorkouts.filter((w) => w.completed).length;
    return {
      month: new Date(0, month).toLocaleString('pl-PL', { month: 'short' }),
      completed,
      planned: monthWorkouts.length,
    };
  });

  return (
    <div className="h-64 bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Roczny postęp</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#4ade80" />
          <Bar dataKey="planned" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
