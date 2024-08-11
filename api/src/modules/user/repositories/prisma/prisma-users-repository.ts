import { Prisma } from '@prisma/client'

import { prisma } from '@/shared/lib/prisma'

import { UsersRepository } from '../interface/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByCPFCNPJ(cpfCnpj: string) {
    const user = await prisma.user.findUnique({
      where: {
        cpf_cnpj: cpfCnpj,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
