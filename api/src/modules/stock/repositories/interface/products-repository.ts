import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  delete(userId: string, Id: number): Promise<boolean>

  fetchAllByGroup(
    userId: string,
    groupId?: number | null,
    page?: number,
    take?: number,
  ): Promise<{
    products: Product[]
    totalItems: number
    totalPages: number
    currentPage: number
  } | null>

  searchByDescription(
    userId: string,
    description: string,
  ): Promise<Product | null>

  findById(userId: string, id: number): Promise<Product | null>

  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
}
