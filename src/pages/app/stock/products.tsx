import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/api/get-products'
import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ProductTableRow } from './products-table-row'

export function Products() {
  const { data: result } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  console.log(result)
  return (
    <>
      <div className="m-auto w-full">
        <Filter />
        <div className="m-auto w-full">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="w-[250px]">Grupo</TableHead>
                <TableHead className="w-[36px]">Preço</TableHead>
                <TableHead className="w-[150px]">Data Criação</TableHead>
                <TableHead className="w-[36px]"></TableHead>
                <TableHead className="w-[36px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result &&
                result.map((product) => {
                  return <ProductTableRow key={product.id} product={product} />
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>navegação</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
