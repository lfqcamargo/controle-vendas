import { Archive, Handshake, Home, Wallet } from 'lucide-react'

import { NavLink } from '@/components/nav-link'
import { Separator } from '@/components/ui/separator'

export function Sidebar() {
  return (
    <nav className="flex flex-col gap-1">
      <NavLink to="/">
        <Home className="h-4 w-4" />
        Dashboard
      </NavLink>
      <Separator className="m-auto h-1 w-2/3" />

      <NavLink to="/stock/products">
        <Archive className="h-4 w-4" />
        Estoque
      </NavLink>
      <Separator className="m-auto h-1 w-1/2" />

      <NavLink to="/sells">
        <Wallet className="h-4 w-4" />
        Vendas
      </NavLink>
      <Separator className="m-auto h-1 w-1/2" />

      <NavLink to="/clients">
        <Handshake className="h-4 w-4" />
        Clients
      </NavLink>
      <Separator className="m-auto h-1 w-1/2" />
    </nav>
  )
}
