import { PrismaGroupsRepository } from '@/repositories/prisma/prisma-groups-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

import { CreateProductUseCase } from '../create-product'

export function makeCreateProductUseCase() {
  const productRepository = new PrismaProductsRepository()
  const groupRepository = new PrismaGroupsRepository()
  const useCase = new CreateProductUseCase(productRepository, groupRepository)

  return useCase
}
