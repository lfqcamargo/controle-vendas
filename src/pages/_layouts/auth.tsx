import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen min-w-full select-none grid-cols-2">
      <Outlet />
    </div>
  )
}
