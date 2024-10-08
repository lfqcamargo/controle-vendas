import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/modules/user/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from '@/modules/user/services/authenticate'
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should register a new user', async () => {
    await usersRepository.create({
      name: 'Lucas Camargo',
      cpf_cnpj: '12345678901',
      email: 'lfqcamargo@example.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'lfqcamargo@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'lfqcamargo@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Lucas Camargo',
      cpf_cnpj: '12345678901',
      email: 'lfqcamargo@example.com',
      password: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
