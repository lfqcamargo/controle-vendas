import { Prisma } from '@prisma/client'

import { prisma } from '@/shared/lib/prisma'

import { ProductsRepository } from '../interface/products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async searchByDescription(userId: string, description: string) {
    const product = await prisma.product.findFirst({
      where: {
        user_id: userId,
        description,
      },
    })

    return product
  }

  async findById(userId: string, id: number) {
    const product = await prisma.product.findUnique({
      where: {
        user_id: userId,
        id,
      },
    })

    return product
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }
}
