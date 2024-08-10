import { Group, Prisma } from '@prisma/client'
import { randomInt } from 'crypto'

import { GroupsRepository } from '../groups-repository'

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = []

  findById(id: string): Promise<Group | null> {
    throw new Error(`${id} Method not implemented.`)
  }

  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = {
      id: randomInt(100),
      user_id: data.user_id,
      description: data.description,
    }

    this.items.push(group)

    return group
  }
}
