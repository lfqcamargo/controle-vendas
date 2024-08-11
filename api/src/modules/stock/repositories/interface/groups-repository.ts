import { Group, Prisma } from '@prisma/client'

export interface GroupsRepository {
  delete(userId: string, groupId: number): Promise<boolean>
  fetchAll(
    userId: string,
    page?: number,
    take?: number,
  ): Promise<{
    groups: Group[]
    totalItems: number
    totalPages: number
    currentPage: number
  } | null>
  searchByDescription(
    userId: string,
    description: string,
  ): Promise<Group | null>
  findById(userId: string, id: number): Promise<Group | null>
  create(data: Prisma.GroupUncheckedCreateInput): Promise<Group>
}
