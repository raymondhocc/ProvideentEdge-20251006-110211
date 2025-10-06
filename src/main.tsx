import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { AppLayout } from '@/components/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { ContributionsPage } from '@/pages/ContributionsPage';
import { InvestmentsPage } from '@/pages/InvestmentsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { EmployerDashboardPage } from '@/pages/EmployerDashboardPage';
import { EmployerEmployeesPage } from '@/pages/EmployerEmployeesPage';
import { EmployerContributionsPage } from '@/pages/EmployerContributionsPage';
import { EmployerReportsPage } from '@/pages/EmployerReportsPage';
import { EmployerSettingsPage } from '@/pages/EmployerSettingsPage';
import { Toaster } from "@/components/ui/sonner";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    element: (
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    ),
    children: [
      // Employee Routes
      {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/contributions",
        element: <ContributionsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/investments",
        element: <InvestmentsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        errorElement: <RouteErrorBoundary />,
      },
      // Employer Routes
      {
        path: "/employer/dashboard",
        element: <EmployerDashboardPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/employer/employees",
        element: <EmployerEmployeesPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/employer/contributions",
        element: <EmployerContributionsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/employer/reports",
        element: <EmployerReportsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/employer/settings",
        element: <EmployerSettingsPage />,
        errorElement: <RouteErrorBoundary />,
      },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors closeButton />
  </StrictMode>,
)