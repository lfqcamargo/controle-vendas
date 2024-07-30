import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './router'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="controlsell001">
        <Helmet titleTemplate="%s | Gerenciador" />
        <Toaster richColors position="top-right" closeButton />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
