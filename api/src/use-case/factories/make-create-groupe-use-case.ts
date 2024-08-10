import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateGroupUseCase() {
  const userRepository = new PrismaUsersRepository()
  const createGroupUseCase = new CreateGroupUseCase(userRepository)

  return createGroupUseCase
}
