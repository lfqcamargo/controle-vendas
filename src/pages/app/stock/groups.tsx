import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
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
                    <Button variant="success">Editar</Button>
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
