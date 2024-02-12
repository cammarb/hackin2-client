import React from 'react'
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css'
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import Account from '@/pages/User/Account';
import RequireAuth from '@/features/auth/requireAuth';
import Settings from '@/pages/User/Settings';
import { ThemeProvider } from '@/components/theme-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }
      // {
      //   path: 'login',
      //   element: <Login />,
      // },
      // {
      //   path: 'signup',
      //   element: <SignUp />,
      // },
      // {
      //   element: <RequireAuth />,
      //   children: [
      //     {
      //       path: 'account',
      //       element: <Account />,
      //     },
      //     {
      //       path: 'settings',
      //       element: <Settings />,
      //     },
      //   ],
      // },
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
