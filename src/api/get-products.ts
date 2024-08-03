import { api } from '@/lib/axios'

interface getProductsResponse {
  id: string
  description: string
  group: string
  price: string
  dateCreated: string
}

export async function getProducts(): Promise<getProductsResponse[]> {
  const response = await api.get('/products', {
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}
