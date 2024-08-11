import { hash } from 'bcryptjs'

import { UsersRepository } from '@/modules/user/repositories/interface/users-repository'
import { CPFCNPJAlreadyExistsError } from '@/shared/errors/cpfcnpj-already-exists-error'
import { EmailAlreadyExistsError } from '@/shared/errors/email-already-exists-error'

interface RegisterServiceRequest {
  name: string
  cpf_cnpj: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, cpf_cnpj, email, password }: RegisterServiceRequest) {
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
