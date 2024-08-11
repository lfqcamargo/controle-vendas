import { Group, Prisma } from '@prisma/client'

export interface GroupsRepository {
  searchByDescription(
    userId: string,
    description: string,
  ): Promise<Group | null>
  findById(userId: string, id: number): Promise<Group | null>
  create(data: Prisma.GroupUncheckedCreateInput): Promise<Group>
}
