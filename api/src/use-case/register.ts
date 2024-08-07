import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  cpf_cnpj: string
  email: string
  password: string
}

export async function registerUserCase({ name, cpf_cnpj, email, password }:
  RegisterUseCaseRequest) {

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const password_hash = await hash(password, 6)

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    cpf_cnpj,
    email,
    password: password_hash,
  })
}