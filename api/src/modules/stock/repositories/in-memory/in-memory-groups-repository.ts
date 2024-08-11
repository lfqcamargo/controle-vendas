import { Group, Prisma } from '@prisma/client'

import { GroupsRepository } from '../interface/groups-repository'

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = []

  async delete(userId: string, id: number): Promise<boolean> {
    const groupIndex = this.items.findIndex(
      (group) => group.user_id === userId && group.id === id,
    )

    if (groupIndex !== -1) {
      this.items.splice(groupIndex, 1)
      return true
    }

    return false
  }

  async fetchAll(userId: string, page: number = 1, take: number = 10) {
    const startIndex = (page - 1) * take
    const endIndex = startIndex + take

    const filteredGroups = this.items.filter(
      (group) => group.user_id === userId,
    )
    const groups = filteredGroups.slice(startIndex, endIndex)

    return {
      groups,
      totalItems: filteredGroups.length,
      totalPages: Math.ceil(filteredGroups.length / take),
      currentPage: page,
    }
  }

  async searchByDescription(userId: string, description: string) {
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
