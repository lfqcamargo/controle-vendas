import { hash } from 'bcryptjs'

import { CPFCNPJAlreadyExistsError } from '@/errors/cpfcnpj-already-exists-error'
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  cpf_cnpj: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, cpf_cnpj, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const userWithSameCPFCNPJ =
      await this.usersRepository.findByCPFCNPJ(cpf_cnpj)

    if (userWithSameCPFCNPJ) {
      throw new CPFCNPJAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      cpf_cnpj,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
