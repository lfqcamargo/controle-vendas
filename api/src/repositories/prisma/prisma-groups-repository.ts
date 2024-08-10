import { Group, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { GroupsRepository } from '../groups-repository'

export class PrismaGroupsRepository implements GroupsRepository {
  findById(id: string): Promise<Group | null> {
    throw new Error(`${id} Method not implemented.`)
  }

  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = await prisma.group.create({
      data,
    })

    return group
  }
}
