import React from 'react';

type ProgressBarProps = {
  completed: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
      <div
        className="h-6 bg-green-500 text-white text-center text-sm"
        style={{ width: `${percentage}%` }}
      >
        {completed}/{total}
      </div>
    </div>
  );
};

export default ProgressBar;
