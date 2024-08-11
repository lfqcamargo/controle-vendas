import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { UsersRepository } from '@/modules/user/repositories/interface/users-repository'
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
