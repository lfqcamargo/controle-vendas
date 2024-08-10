import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateGroupUseCase() {
  const userRepository = new PrismaUsersRepository()
  const CreateGroupUseCase = new CreateGroupUseCase(userRepository)

  return CreateGroupUseCase
}
