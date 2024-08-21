import { App } from './App'
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
import CompanyUsers from './features/company/CompanyUsers'
import Dashboard from './features/company/Dashboard'
import AddProgram from './features/program/AddProgram'
import Program from './features/program/Program'
import Login from './pages/Login'
import { ProgramApply } from './features/program/ProgramApply'
import ProgramsList from './features/program/ProgramsList'
import ProgramView from './features/program/ProgramView'
import SubmissionsList from './features/submission/SubmissionsList'
import Register from './pages/Register'
import SubmissionDetails from './features/submission/SubmissionDetails'
import { UserSettings } from './features/user/UserSettings'
import { GeneralSettings } from './features/user/GeneralSettings'
import { ChangePassword } from './features/user/ChangePassword'
import { RequireRole } from './features/auth/RequireRole'
import { authLoader } from './features/auth/authLoader'
import { RequireAuthentication } from './features/auth/RequireAuthentication'
import { Unauthenticated } from './features/auth/Unauthenticated'
import ProgramManagementPage from './features/program/ProgramManagementPage'
import { ApplicationsPage } from './features/application/ApplicationsPage'

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
        element: <Unauthenticated />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        element: <RequireAuthentication />,
        children: [
          {
            path: 'settings',
            element: <UserSettings />,
            children: [
              {
                element: <GeneralSettings />,
                index: true
              },
              {
                path: 'change-password',
                element: <ChangePassword />
              }
            ]
          },
          {
            element: <RequireRole allowedRole='ENTERPRISE' />,
            children: [
              {
                path: 'dashboard',
                element: <Dashboard />
              },
              {
                path: 'programs',
                element: <ProgramManagementPage />,
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
            element: <RequireRole allowedRole='PENTESTER' />,
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
              },
              {
                path: 'applications',
                element: <ApplicationsPage />
              }
            ]
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
