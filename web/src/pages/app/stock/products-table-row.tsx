import { DialogTitle } from '@radix-ui/react-dialog'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TableCell, TableRow } from '@/components/ui/table'

interface ProductTableRowProps {
  product: {
    id: number
    description: string
    price_buy: number
    price_sell: number
    date_created: Date
    user_id: string
    group_id: number
  }
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.group_id}</TableCell>
      <TableCell>{product.price_buy}</TableCell>
      <TableCell>{product.price_sell}</TableCell>
      <TableCell>{product.date_created.toString()}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="success">Editar</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Grupo</DialogTitle>
              <form className="flex flex-col gap-2">
                <Label>Descrição</Label>
                <Input />
                <div className="flex w-full flex-row items-center justify-end gap-2">
                  <Button variant="success">Confirmar</Button>
                  <Button variant="destructive">Cancelar</Button>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <Button variant="destructive">Deletar</Button>
      </TableCell>
    </TableRow>
  )
}
