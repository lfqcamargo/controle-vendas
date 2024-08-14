import { api } from '@/lib/axios'

export interface GetProductsParams {
  groupId?: number | null
  pageIndex?: number | null
}

interface Product {
  id: number
  description: string
  price_buy: number
  price_sell: number
  date_created: Date
  user_id: string
  group_id: number
}

interface GetProductsResponse {
  products: Product[]
  currentPage: number
  totalItems: number
  totalPages: number
}

export async function getProducts({
  groupId = null,
  pageIndex = 1,
}: GetProductsParams): Promise<GetProductsResponse> {
  const response = await api.get('/products', {
    params: {
      groupId: groupId ?? undefined,
      page: pageIndex,
    },
  })

  return response.data
}
