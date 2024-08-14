import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { StockLayout } from './pages/_layouts/stock'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard'
import { Groups } from './pages/app/stock/groups'
import { Products } from './pages/app/stock/products'
import { RecoveryPassword } from './pages/auth/recovery-password'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      {
        path: 'stock',
        element: <StockLayout />,
        errorElement: <NotFound />,
        children: [
          { path: 'products', element: <Products /> },
          { path: 'groups', element: <Groups /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'recovery-password', element: <RecoveryPassword /> },
    ],
  },
])
