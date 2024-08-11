import { PrismaGroupsRepository } from '@/repositories/prisma/prisma-groups-repository'

import { CreateGroupUseCase } from '../create-group'

export function makeCreateGroupUseCase() {
  const groupRepository = new PrismaGroupsRepository()
  const useCase = new CreateGroupUseCase(groupRepository)

  return useCase
}
