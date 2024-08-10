import { compare, hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/use-case/register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should register a new user', async () => {
    const result = await sut.execute({
      name: 'Lucas Camargo',
      cpf_cnpj: '12345678901',
      email: 'lfqcamargo@example.com',
      password: '123456',
    })

    expect(result.user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const password = '123456'
    const hashedPassword = await hash(password, 8)

    const result = await sut.execute({
      name: 'Lucas Camargo',
      cpf_cnpj: '12345678901',
      email: 'lfqcamargo@example.com',
      password: hashedPassword,
    })

    const isPasswordCorrectlyHashed = await compare(
      hashedPassword,
      result.user.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'lfqcamargo@example.com'
    const userData = {
      name: 'Lucas Camargo',
      cpf_cnpj: '12345678901',
      email,
      password: '123456',
    }

    await sut.execute(userData)

    await expect(sut.execute(userData)).rejects.toThrow(UserAlreadyExistsError)
  })
})
