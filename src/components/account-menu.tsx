import { ChevronDown } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center justify-end gap-2"
        >
          Menu
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Lucas Fernando</span>
          <span className="text-xs font-normal text-muted-foreground">
            lfqcamargo@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex w-full flex-col items-start justify-center gap-1 p-2">
          <span>Perfil</span>
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="destructive" className="w-full">
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
