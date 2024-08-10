import { Group, Prisma } from '@prisma/client'

export interface GroupsRepository {
  findById(id: string): Promise<Group | null>
  create(data: Prisma.GroupUncheckedCreateInput): Promise<Group>
}
