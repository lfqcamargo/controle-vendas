import { Product } from '@prisma/client'

import { ProductsRepository } from '@/modules/stock/repositories/interface/products-repository'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

interface FetchProductsByGroupServiceRequest {
  userId: string
  groupId?: number
  page?: number
  take?: number
}

interface FetchProductsByGroupServiceResponse {
  products: Product[]
  totalItems: number
  totalPages: number
  currentPage: number
}

export class FetchProductsByGroupService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    userId,
    groupId,
    page,
    take,
  }: FetchProductsByGroupServiceRequest): Promise<FetchProductsByGroupServiceResponse> {
    const productsFetched = await this.productsRepository.fetchAllByGroup(
      userId,
      groupId,
      page,
      take,
    )

    if (!productsFetched || productsFetched.products.length === 0) {
      throw new ResourceNotFoundError()
    }

    const { products, totalItems, totalPages, currentPage } = productsFetched

    return {
      products,
      totalItems,
      totalPages,
      currentPage,
    }
  }
}
