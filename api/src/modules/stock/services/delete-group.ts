import { GroupsRepository } from '@/modules/stock/repositories/interface/groups-repository'
import { GroupNotExistsError } from '@/shared/errors/group-not-exists-error'

interface DeleteGroupServiceRequest {
  userId: string
  id: number
}

export class DeleteGroupService {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute({ userId, id }: DeleteGroupServiceRequest): Promise<boolean> {
    const groupExists = await this.groupsRepository.findById(userId, id)

    if (!groupExists) {
      throw new GroupNotExistsError()
    }

    const groupDeleted = await this.groupsRepository.delete(userId, id)

    return groupDeleted
  }
}
