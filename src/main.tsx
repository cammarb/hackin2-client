import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';

import { ThemeProvider } from '@/components/theme-provider';
import ProgramManagement from './pages/Company/ProgramManagement';
import Program from './pages/Company/Program';
import Login from './pages/Login';
import Dashboard from './pages/Company/Dashboard';
import CompanyUsers from './pages/Company/CompanyUsers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'company',
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'programs',
            element: <ProgramManagement />,
            children: [
              {
                path: ':id',
                element: <Program />
              }
            ]
          },
          {
            path: 'users',
            element: <CompanyUsers />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
