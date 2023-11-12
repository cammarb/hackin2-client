import * as ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Account from './pages/User/Account'
import RequireAuth from './features/auth/requireAuth'
import Settings from './pages/User/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
