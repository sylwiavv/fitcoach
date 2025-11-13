import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { DashboardPage } from "../../pages/Dashboard/DashboardPage";
import { TrainingDayPage } from "../../pages/TrainingDay/TrainingDayPage";
import ClientPage from "../../pages/Client/ClientPage";
import ClientsPage from "../../pages/Clients/Clients";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/clients", element: <ClientsPage /> },
      { path: "/client/:clientId", element: <ClientPage /> },
      {
        path: "/client/:clientId/training/:date",
        element: <TrainingDayPage />,
      },
    ],
  },
]);
