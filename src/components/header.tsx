import { AccountMenu } from './account-menu'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between border-b p-2">
      <div>
        <p>esquerdo</p>
      </div>
      <div>
        <p>centro</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <ThemeToggle />
        <AccountMenu />
      </div>
    </header>
  )
}
