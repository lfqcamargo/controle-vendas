import { PrismaGroupsRepository } from '@/modules/stock/repositories/prisma/prisma-groups-repository'

import { CreateGroupService } from '../services/create-group'

export function makeCreateGroupService() {
  const groupRepository = new PrismaGroupsRepository()
  const service = new CreateGroupService(groupRepository)

  return service
}
