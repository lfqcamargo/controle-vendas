import { PrismaGroupsRepository } from '@/modules/stock/repositories/prisma/prisma-groups-repository'
import { PrismaProductsRepository } from '@/modules/stock/repositories/prisma/prisma-products-repository'

import { CreateProductService } from '../services/create-product'

export function makeCreateProductService() {
  const productRepository = new PrismaProductsRepository()
  const groupRepository = new PrismaGroupsRepository()
  const service = new CreateProductService(productRepository, groupRepository)

  return service
}
