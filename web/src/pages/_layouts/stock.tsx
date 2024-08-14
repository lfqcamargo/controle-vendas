import { Outlet } from 'react-router-dom'

import { NavLink } from '@/components/nav-link'

export function StockLayout() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <nav className="flex items-center justify-end px-6">
          <ul className="flex h-8 flex-row items-center bg-muted/50 font-medium [&>tr]:last:border-b-0">
            <li className="border p-1 px-4">
              <NavLink to="/stock/products">Produtos</NavLink>
            </li>
            <li className="border px-4 py-1">
              <NavLink to="/stock/groups">Grupos</NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  )
}
