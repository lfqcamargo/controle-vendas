import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { UsersRepository } from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByCPFCNPJ(cpfCnpj: string) {
    const user = this.items.find((item) => item.cpf_cnpj === cpfCnpj) || null

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id) || null

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email) || null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      cpf_cnpj: data.cpf_cnpj,
      email: data.email,
      password: data.password,
      date_created: new Date(),
      last_login: new Date(),
    }

    this.items.push(user)

    return user
  }
}
