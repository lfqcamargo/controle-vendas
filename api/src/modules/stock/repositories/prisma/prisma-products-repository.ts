import { Prisma } from '@prisma/client'

import { prisma } from '@/shared/lib/prisma'

import { ProductsRepository } from '../interface/products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async delete(userId: string, id: number) {
    const productDeleted = await prisma.product.delete({
      where: {
        user_id: userId,
        id,
      },
    })

    if (productDeleted) {
      return true
    } else {
      return false
    }
  }

  async fetchAllByGroup(
    userId: string,
    groupId: number | null,
    page: number = 1,
    take: number = 10,
  ) {
    const totalItems = await prisma.product.count({
      where: {
        user_id: userId,
        ...(groupId !== null && { group_id: groupId }),
      },
    })

    const products = await prisma.product.findMany({
      where: {
        user_id: userId,
        ...(groupId !== null && { group_id: groupId }),
      },
      take,
      skip: (page - 1) * take,
    })

    const totalPages = Math.ceil(totalItems / take)

    return {
      products,
      totalItems,
      totalPages,
      currentPage: page,
    }
  }

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
