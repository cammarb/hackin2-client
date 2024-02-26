import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';

import { ThemeProvider } from '@/components/theme-provider';
import ProgramManagement from '@/pages/Company/ProgramManagement';
import Submissions from '@/pages/Company/Submissions';
import Details from '@/pages/Company/Details';
import UserRolesPermissions from '@/pages/Company/UserRolesPermissions';
import Program from '@/pages/Company/Program';
import Dashboard from '@/pages/Company/Dashboard'; 
import UserManagement from '@/pages/Company/UserManagement'; 
import Settings from '@/pages/Company/Settings'; 
import { programLoader } from './loaders/programsLoader';


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
        path: 'dashboard', 
        element: <Dashboard />
      },
      {
        path: 'user-management', 
        element: <UserManagement />
      },
      {
        path: 'settings', 
        element: <Settings />
      },
      {
        path: 'settings', 
        element: <Settings />
      },
      {
        path: 'program-management',
        element: <ProgramManagement />,
        loader: programLoader,
        children: [
          {
            index: true, // default subpage for program-management
            element: <Program />
          },
          {
            path: 'submissions',
            element: <Submissions />
          },
          {
            path: 'details', 
            element: <Details />
          },
          {
            path: 'userrolespermissions',
            element: <UserRolesPermissions />
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
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
