import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Filter() {
  return (
    <form className="flex items-center justify-start gap-2">
      <div className="flex items-center">
        <Input placeholder="ID do grupo" className="h-8 w-[100px]" />
        <Input placeholder="Nome do grupo" className="h-8 w-[1170px]" />
        <Input placeholder="Data Criação" className="h-8 w-[125px]" />
      </div>
      <div className="flex w-full gap-2">
        <Button variant="secondary" type="submit">
          <Search className="mr-2 h-3 w-3" />
          Filtrar
        </Button>
        <Button variant="outline" type="button">
          <X className="mr-2 h-3 w-3" />
          Remover
        </Button>
      </div>
    </form>
  )
}
