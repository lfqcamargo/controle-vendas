import { GroupAlreadyExistsError } from '@/errors/group-already-exists-error'
import { GroupsRepository } from '@/repositories/groups-repository'

interface CreateGroupUseCaseRequest {
  userId: string
  description: string
}

export class CreateGroupUseCase {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute({ userId, description }: CreateGroupUseCaseRequest) {
    const groupAlreadyCreated = await this.groupsRepository.findByDescription(
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
