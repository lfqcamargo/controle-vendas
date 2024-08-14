import { PrismaGroupsRepository } from '@/modules/stock/repositories/prisma/prisma-groups-repository'

import { FetchGroupsService } from '../services/fetch-groups'

export function makeFetchGroupsService() {
  const groupRepository = new PrismaGroupsRepository()
  const service = new FetchGroupsService(groupRepository)

  return service
}
