import { Cylinder } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Cylinder className="h-5 w-5" />
          <span className="font-semibold">Controle de Vendas</span>
        </div>

        <footer className="text-sm">
          Lucas Fernando Quinato de Camargo &copy; Controle de Vendas -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
