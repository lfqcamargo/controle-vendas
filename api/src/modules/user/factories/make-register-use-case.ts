import { PrismaUsersRepository } from '@/modules/user/repositories/prisma/prisma-users-repository'

import { RegisterService } from '../services/register'

export function makeRegisterService() {
  const userRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(userRepository)

  return registerService
}
