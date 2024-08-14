import { DialogTitle } from '@radix-ui/react-dialog'

import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const groups = [
  {
    id: '001',
    description: 'Vinho',
    dateCreated: '22/11/1995',
  },
  {
    id: '002',
    description: 'Queijo',
    dateCreated: '22/11/1995',
  },
  {
    id: '003',
    description: 'Pão',
    dateCreated: '22/11/1995',
  },
  {
    id: '004',
    description: 'Salgado',
    dateCreated: '22/11/1995',
  },
]

export function Groups() {
  return (
    <>
      <div className="m-auto w-full">
        <Filter />
        <div className="m-auto w-full">
          <Table className="">
            <TableHeader>
              <TableRow></TableRow>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead className="w-[150px]">Data Criação</TableHead>
                <TableHead className="w-[36px]"></TableHead>
                <TableHead className="w-[36px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((groups) => (
                <TableRow key={groups.id}>
                  <TableCell className="font-medium">{groups.id}</TableCell>
                  <TableCell>{groups.description}</TableCell>
                  <TableCell>{groups.dateCreated}</TableCell>
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
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>navegação</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
