import { PrismaUsersRepository } from '@/modules/user/repositories/prisma/prisma-users-repository'

import { GetUserProfileService } from '../services/get-user-profile'

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new GetUserProfileService(usersRepository)

  return service
}
