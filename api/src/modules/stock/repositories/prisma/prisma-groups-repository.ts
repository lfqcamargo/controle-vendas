import { Prisma } from '@prisma/client'

import { prisma } from '@/shared/lib/prisma'

import { GroupsRepository } from '../interface/groups-repository'

export class PrismaGroupsRepository implements GroupsRepository {
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
