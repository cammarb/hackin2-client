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
import ProgramManagement from './pages/Company/ProgramManagement';
import Program from './pages/Company/Program';
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
        path: 'program-management',
        element: <ProgramManagement />,
        loader: programLoader,
        children: [
          {
            path: ':id',
            element: <Program />
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
