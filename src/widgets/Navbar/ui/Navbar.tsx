import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AddExercise,
  ClientsIcon,
  DashboardIcon,
  FitnesIcon,
  WorkoutIcon,
} from '../../../app/assets';
import Exercises from '../../../app/assets/Exercises';
import DateTimeNow from '../../DateTimeNow';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/clients', label: 'Clients', icon: <ClientsIcon /> },
    { to: '/add-workout', label: 'Workouts', icon: <WorkoutIcon /> },
    // { to: '/user', label: 'My Profile' },
    { to: '/add-exercise', label: 'Add Exercise', icon: <AddExercise /> },
    { to: '/exercises', label: 'Exercises', icon: <Exercises /> },
  ];

  const activeIndex = links.findIndex((link) => link.to === location.pathname);
  const [gliderPosition, setGliderPosition] = useState(activeIndex);

  useEffect(() => {
    setGliderPosition(activeIndex);
  }, [activeIndex]);

  return (
    <div className="bg-alice-blue p-4">
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

        {links.map(({ to, label, icon }, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={`
                flex gap-3 items-center relative z-10 rounded-sm w-full
                py-2 px-4 transition-all duration-300 text-left
                ${isActive ? 'bg-eerie-black' : 'hover:bg-vanilla hover:cursor-pointer'}
              `}
            >
              <span
                className={`w-6 h-6 flex items-center ${isActive ? 'text-vanilla' : 'text-eerie-black'}`}
              >
                {icon}
              </span>
              <span
                className={`text-base font-medium ${isActive ? 'text-ghost-white' : 'text-eerie-black'}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
