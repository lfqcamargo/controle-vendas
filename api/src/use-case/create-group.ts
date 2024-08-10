import { GroupsRepository } from '@/repositories/groups-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface CreateGroupUseCaseRequest {
  userId: string
  description: string
}

export class CreateGroupUseCase {
  constructor(
    private groupsRepository: GroupsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId, description }: CreateGroupUseCaseRequest) {
    const group = await this.groupsRepository.create({
      user_id: userId,
      description,
    })

    return {
      group,
    }
  }
}
