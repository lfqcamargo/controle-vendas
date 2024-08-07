import { api } from '@/lib/axios'

export interface GetProductsParams {
  pageIndex?: number | null
}

interface GetProductsResponse {
  data: {
    id: string
    description: string
    group: string
    priceBuy: string
    priceSell: string
    dateCreated: string
  }[]
}

export async function getProducts({
  pageIndex,
}: GetProductsParams): Promise<GetProductsResponse> {
  const response = await api.get(`/products?_page=${pageIndex}`)

  return response.data
}
