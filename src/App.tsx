import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './router'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Gerenciador" />
      <Toaster richColors position="top-right" closeButton />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
