import { createBrowserRouter } from 'react-router-dom';

import AddClientPage from '../../pages/AddNewCLient/AddNewClientPage';
import ClientPage from '../../pages/Client/ClientPage';
import ClientsPage from '../../pages/Clients/Clients';
import { DashboardPage } from '../../pages/Dashboard/DashboardPage';
import AddWorkoutPage from '../../pages/PlanWorkout/PlanWorkoutPage';
import { TrainingDayPage } from '../../pages/TrainingDay/TrainingDayPage';
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
      { path: '/add-workout', element: <AddWorkoutPage /> },

      {
        path: '/client/:clientId/training/:date',
        element: <TrainingDayPage />,
      },
    ],
  },
]);
