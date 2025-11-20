import { createBrowserRouter } from 'react-router-dom';

import AddExercisePage from '../../pages/AddExercisePage/AddExercisePage';
import AddExerciseToClientPage from '../../pages/AddExerciseToClient/AddExerciseToClient';
import AddClientPage from '../../pages/AddNewCLient/AddNewClientPage';
import ClientPage from '../../pages/Client/ClientPage';
import ClientsPage from '../../pages/Clients/Clients';
import { DashboardPage } from '../../pages/Dashboard/DashboardPage';
import { ExercisesPage } from '../../pages/ExercisesPage/ExercisesPage';
import AddWorkoutPage from '../../pages/PlanWorkout/PlanWorkoutPage';
import { MainLayout } from '../layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/clients', element: <ClientsPage /> },
      { path: '/client/:clientId', element: <ClientPage /> },
      { path: '/clients/add', element: <AddClientPage /> },
      { path: '/add-exercise', element: <AddExercisePage /> },
      { path: '/add-workout', element: <AddWorkoutPage /> },
      {
        path: '/clients/:clientId/:date/add-exercise',
        element: <AddExercisePage />,
      },
      {
        path: '/client/:clientId/training/:date',
        element: <AddExerciseToClientPage />,
      },
      {
        path: '/exercises',
        element: <ExercisesPage />,
      },
    ],
  },
]);
