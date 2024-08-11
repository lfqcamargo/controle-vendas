import { GroupsRepository } from '@/modules/stock/repositories/interface/groups-repository'
import { GroupAlreadyExistsError } from '@/shared/errors/group-already-exists-error'

interface CreateGroupServiceRequest {
  userId: string
  description: string
}

export class CreateGroupService {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute({ userId, description }: CreateGroupServiceRequest) {
    const groupAlreadyCreated = await this.groupsRepository.searchByDescription(
      userId,
      description,
    )

    if (groupAlreadyCreated) {
      throw new GroupAlreadyExistsError()
    }

    const group = await this.groupsRepository.create({
      user_id: userId,
      description,
    })

    return {
      group,
    }
  }
}
