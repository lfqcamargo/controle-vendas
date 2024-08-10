import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  findByDescription(
    userId: string,
    description: string,
  ): Promise<Product | null>
  findById(userId: string, id: number): Promise<Product | null>
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
}
