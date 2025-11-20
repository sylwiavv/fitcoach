import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FitnesIcon from '../../../app/assets/FitnesIcon';
import DateTimeNow from '../../DateTimeNow';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/clients', label: 'Clients' },
    { to: '/add-workout', label: 'Workouts' },
    { to: '/user', label: 'My Profile' },
    { to: '/add-exercise', label: 'Add Exercise' },
  ];

  const activeIndex = links.findIndex((link) => link.to === location.pathname);
  const [gliderPosition, setGliderPosition] = useState(activeIndex);

  useEffect(() => {
    setGliderPosition(activeIndex);
  }, [activeIndex]);

  return (
    <div className="bg-ghost-white p-4">
      <div className="flex gap-2 items-center mb-12">
        <FitnesIcon />
        <h4 className="font-bold text-xl text-eerieBlack">FitCoach</h4>
      </div>

      <div className="mb-10 py-2 px-4">
        <DateTimeNow />
      </div>

      <div className="relative transition-all flex gap-2 flex-col">
        {gliderPosition >= 0 && (
          <span
            className="absolute top-1 left-1 w-[calc(33.33%-0.5rem)] bg-honey-dew rounded-full transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${gliderPosition * 100}%)`,
            }}
          />
        )}

        {links.map((link, index) => (
          <button
            key={link.to}
            onClick={() => navigate(link.to)}
            className={`relative  z-10 rounded-sm transition-all duration-300 w-full text-left py-2 px-4 ${
              activeIndex === index
                ? 'text-ghost-white bg-eerie-black'
                : 'hover:bg-vanilla hover:cursor-pointer'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};
