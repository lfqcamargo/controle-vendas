import { Group } from '@prisma/client'

import { GroupsRepository } from '@/modules/stock/repositories/interface/groups-repository'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

interface FetchGroupsServiceRequest {
  userId: string
  page?: number
  take?: number
}

interface FetchGroupsServiceResponse {
  groups: Group[]
  totalItems: number
  totalPages: number
  currentPage: number
}

export class FetchGroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute({
    userId,
    page,
    take,
  }: FetchGroupsServiceRequest): Promise<FetchGroupsServiceResponse> {
    const groupsFetched = await this.groupsRepository.fetchAll(
      userId,
      page,
      take,
    )

    if (!groupsFetched || groupsFetched.groups.length === 0) {
      throw new ResourceNotFoundError()
    }

    const { groups, totalItems, totalPages, currentPage } = groupsFetched

    return {
      groups,
      totalItems,
      totalPages,
      currentPage,
    }
  }
}
