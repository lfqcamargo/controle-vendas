import { PrismaProductsRepository } from '@/modules/stock/repositories/prisma/prisma-products-repository'

import { FetchProductsByGroupService } from '../services/fetch-products-by-group'

export function makeFetchProductsByGroupService() {
  const productRepository = new PrismaProductsRepository()
  const service = new FetchProductsByGroupService(productRepository)

  return service
}
