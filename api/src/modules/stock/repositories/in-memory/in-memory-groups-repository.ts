import { Group, Prisma } from '@prisma/client'

import { GroupsRepository } from '../interface/groups-repository'

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = []

  async findByDescription(userId: string, description: string) {
    const group =
      this.items.find(
        (group) =>
          group.user_id === userId && group.description === description,
      ) || null

    return group
  }

  async findById(userId: string, id: number) {
    const group =
      this.items.find((group) => group.user_id === userId && group.id === id) ||
      null

    return group
  }

  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = {
      id: this.items.length + 1,
      user_id: data.user_id,
      description: data.description,
    }

    this.items.push(group)

    return group
  }
}
