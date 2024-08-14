import { Prisma } from '@prisma/client'

import { prisma } from '@/shared/lib/prisma'

import { GroupsRepository } from '../interface/groups-repository'

export class PrismaGroupsRepository implements GroupsRepository {
  async delete(userId: string, id: number) {
    const groupDeleted = await prisma.group.delete({
      where: {
        user_id: userId,
        id,
      },
    })

    if (groupDeleted) {
      return true
    } else {
      return false
    }
  }

  async fetchAll(userId: string, page: number = 1, take: number = 10) {
    const totalItems = await prisma.group.count({
      where: {
        user_id: userId,
      },
    })

    const groups = await prisma.group.findMany({
      where: {
        user_id: userId,
      },
      take,
      skip: (page - 1) * take,
    })

    const totalPages = Math.ceil(totalItems / take)

    return {
      groups,
      totalItems,
      totalPages,
      currentPage: page,
    }
  }

  async searchByDescription(userId: string, description: string) {
    const group = await prisma.group.findFirst({
      where: {
        user_id: userId,
        description,
      },
    })

    return group
  }

  async findById(userId: string, id: number) {
    const group = await prisma.group.findUnique({
      where: {
        user_id: userId,
        id,
      },
    })

    return group
  }

  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = await prisma.group.create({
      data,
    })

    return group
  }
}
