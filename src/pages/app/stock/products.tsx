import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getProducts } from '@/api/get-products'
import { Filter } from '@/components/filter'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = z.coerce.number().parse(searchParams.get('_page') ?? '1')

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({ pageIndex }),
  })
  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('_page', pageIndex.toString())

      return state
    })
  }

  !isLoadingProducts && console.log(result)

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
                <TableHead className="w-[36px]">Preço Compra</TableHead>
                <TableHead className="w-[36px]">Preço Venda</TableHead>
                <TableHead className="w-[150px]">Data Criação</TableHead>
                <TableHead className="w-[36px]"></TableHead>
                <TableHead className="w-[36px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingProducts ? (
                <tr className="w-full">
                  <td className="w-full p-2">
                    <Skeleton className="h-4 w-full" />{' '}
                  </td>
                </tr>
              ) : (
                result &&
                result?.data.map((product) => {
                  return <ProductTableRow key={product.id} product={product} />
                })
              )}
              {/* : (
                <tr className="w-full p-2">
                  <td className="w-full p-2">Nenhum Produto Cadastrado</td>
                </tr>
              ) */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9}>navegação</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            totalCount={result?.items}
            perPage={result?.pages}
          />
        </div>
      </div>
    </>
  )
}
