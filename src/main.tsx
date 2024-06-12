import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import NotFound from '@/pages/Error/404';
import Home from '@/pages/Home';

import { ThemeProvider } from '@/components/theme-provider';
import ProgramManagement from './pages/Company/Program/ProgramManagement';
import Program from './pages/Company/Program/Program';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Company/Dashboard';
import CompanyUsers from './pages/Company/CompanyUsers';
import AddProgram from './pages/Company/Program/AddProgram';
import RequireEnterpriseAuth from './features/auth/requireEnterpriseAuth';
import RequirePentesterAuth from './features/auth/RequirePentesterAuth';
import { authLoader } from './features/auth/authLoader';
import ProgramsList from './pages/Pentester/ProgramsList';
import ProgramView from './pages/Pentester/ProgramView';
import { ProgramApply } from './pages/Pentester/ProgramApply';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    loader: authLoader,
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
        path: 'register',
        element: <Register />
      },
      {
        element: <RequireEnterpriseAuth />,
        children: [
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
                  },
                  {
                    path: 'new',
                    element: <AddProgram />
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
      },
      {
        element: <RequirePentesterAuth />,
        children: [
          {
            path: 'bounty-programs',
            element: <ProgramsList />
          },
          {
            path: 'bounty-programs/:id',
            element: <ProgramView />
          },
          {
            path: 'bounty-programs/:id/apply',
            element: <ProgramApply />
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
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
