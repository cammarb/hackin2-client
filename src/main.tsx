import App from '@/App'
import { store } from '@/app/store'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import NotFound from '@/pages/Error/404'
import Home from '@/pages/Home'

import { ThemeProvider } from '@/components/theme-provider'
import { authLoader } from './features/auth/authLoader'
import RequireEnterpriseAuth from './features/auth/requireEnterpriseAuth'
import RequirePentesterAuth from './features/auth/RequirePentesterAuth'
import CompanyUsers from './features/company/CompanyUsers'
import Dashboard from './features/company/Dashboard'
import AddProgram from './features/program/AddProgram'
import Program from './features/program/Program'
import ProgramManagement from './features/program/ProgramManagement'
import Login from './pages/Login'
import { ProgramApply } from './features/program/ProgramApply'
import ProgramsList from './features/program/ProgramsList'
import ProgramView from './features/program/ProgramView'
import SubmissionsList from './features/submission/SubmissionsList'
import Register from './pages/Register'
import SubmissionDetails from './features/submission/SubmissionDetails'

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
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'programs',
            element: <ProgramManagement />,
            children: [
              { index: true, element: <>Click on a program</> },
              {
                path: ':id',
                element: <Program />
              },
              {
                path: ':id/submissions/:submissionId',
                element: <SubmissionDetails />
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
            path: 'bounty-programs/:id/submit/new',
            element: <ProgramApply />
          },
          {
            path: 'submissions',
            element: <SubmissionsList />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
