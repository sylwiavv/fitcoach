import { useEffect, useState } from 'react';

const DateTimeNow = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date();

  const formatCustomDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  return (
    <div className="flex flex-col">
      <div className="text-xs text-gray-500">{formatCustomDate(today)}</div>
      <span className="text-2xl font-semibold">{now.toLocaleTimeString()}</span>
    </div>
  );
};

export default DateTimeNow;
