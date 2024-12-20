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
import CompanyUsers from '@/features/company/CompanyUsers'
import Dashboard from '@/features/company/Dashboard'
import AddProgram from '@/features/program/AddProgram'
import Login from './pages/Login'
import ProgramsList from '@/features/program/ProgramsList'
import ProgramView from '@/features/program/ProgramView'
import SubmissionsList from '@/features/submission/SubmissionsList'
import Register from './pages/Register'
import { UserSettings } from '@/features/user/UserSettings'
import { GeneralSettings } from '@/features/user/GeneralSettings'
import { ChangePassword } from '@/features/user/ChangePassword'
import { RequireRole } from '@/features/auth/RequireRole'
import { authLoader } from '@/features/auth/authLoader'
import { RequireAuthentication } from '@/features/auth/RequireAuthentication'
import { Unauthenticated } from '@/features/auth/Unauthenticated'
import ProgramManagementPage from '@/features/program/ProgramManagementPage'
import ProgramDetails from '@/features/program/ProgramDetails'
import { AllProgramsTable } from '@/features/program/AllProgramsTable'
import { AllProgramsPage } from '@/features/program/AllProgramsPage'
import { BountiesPage } from '@/features/bounty/enterprise/BountiesPage'
import { BountiesTablePage } from '@/features/bounty/enterprise/BountiesTablePage'
import { BountyDetailsPage } from '@/features/bounty/enterprise/BountyDetailsPage'
import { ApplicationsPage } from '@/features/application/ApplicationsPage'
import { ApplicationsTablePage } from '@/features/application/ApplicationsTablePage'
import { BountyPage } from './features/bounty/BountyPage'
import { AssignedBountiesPage } from './features/assignedBounty/AssignedBountiesPage'
import { AssignedBountyDetails } from './features/assignedBounty/AssignedBountyDetails'
import { SubmitBountyReportPage } from './features/submission/SubmitBountyReportPage'
import { PaymentsPage } from './features/payments/PaymentsPage'
import { NewPaymentPage } from './features/payments/NewPaymentPage'
import { SuccessPaymentPage } from './features/payments/SuccessPaymentPage'
import { PaymentsTablePage } from './features/payments/PaymentsTablePage'
import { PaymentDetailsPage } from './features/payments/PaymentDetailsPage'

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
                element: <AllProgramsPage />,
                children: [
                  {
                    index: true,
                    element: <AllProgramsTable />
                  },
                  {
                    path: 'new',
                    element: <AddProgram />
                  }
                ]
              },
              {
                path: 'programs/:id',
                element: <ProgramManagementPage />,
                children: [
                  {
                    index: true,
                    element: <ProgramDetails />
                  },
                  {
                    path: 'bounties',
                    element: <BountiesPage />,
                    children: [
                      {
                        index: true,
                        element: <BountiesTablePage />
                      },
                      {
                        path: ':bountyId',
                        element: <BountyDetailsPage />
                      }
                    ]
                  },
                  {
                    path: 'applications',
                    element: <ApplicationsPage />,
                    children: [
                      {
                        index: true,
                        element: <ApplicationsTablePage />
                      }
                    ]
                  },
                  {
                    path: 'payments',
                    element: <PaymentsPage />,
                    children: [
                      {
                        index: true,
                        element: <PaymentsTablePage />
                      },
                      {
                        path: 'new',
                        element: <NewPaymentPage />
                      },
                      {
                        path: 'success/:checkoutSessionId',
                        element: <SuccessPaymentPage />
                      },
                      {
                        path: ':checkoutSessionId',
                        element: <PaymentDetailsPage />
                      }
                    ]
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
                path: 'submissions',
                element: <SubmissionsList />
              },
              {
                path: 'applications',
                element: <ApplicationsPage />,
                children: [
                  {
                    index: true,
                    element: <ApplicationsTablePage />
                  }
                ]
              },
              {
                path: 'assigned-bounties',
                element: <AssignedBountiesPage />,
                children: [
                  {
                    index: true,
                    element: <BountyPage />
                  },
                  {
                    path: ':id',
                    element: <AssignedBountyDetails />
                  },
                  {
                    path: ':id/submit',
                    element: <SubmitBountyReportPage />
                  }
                ]
              },
              {
                path: 'payments',
                element: <PaymentsPage />,
                children: [
                  {
                    index: true,
                    element: <PaymentsTablePage />
                  },
                  {
                    path: ':checkoutSessionId',
                    element: <PaymentDetailsPage />
                  }
                ]
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
