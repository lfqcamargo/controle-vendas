import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-row gap-4 p-2 pt-6">
        <div>
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
