'use client';

import { useEffect, useState } from 'react';

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

export const formatCustomDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const DateTimeNow = () => {
  /** Avoid hydration mismatch: SSR and first client paint must not render a live clock. */
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date();

  return (
    <div className="flex flex-col">
      <div className="text-xs text-gray-500">
        {mounted ? formatCustomDate(today) : '\u00a0'}
      </div>
      <span className="text-2xl font-semibold">
        {mounted ? now.toLocaleTimeString('en-GB', timeFormat) : '--:--:--'}
      </span>
    </div>
  );
};

export default DateTimeNow;
