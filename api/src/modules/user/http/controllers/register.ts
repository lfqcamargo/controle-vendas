import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterService } from '@/modules/user/factories/make-register-use-case'
import { CPFCNPJAlreadyExistsError } from '@/shared/errors/cpfcnpj-already-exists-error'
import { EmailAlreadyExistsError } from '@/shared/errors/email-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(6).max(50),
    cpf_cnpj: z.string().min(11).max(14),
    email: z.string().email(),
    password: z.string().min(6).max(20),
  })

  const { name, cpf_cnpj, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      cpf_cnpj,
      email,
      password,
    })
  } catch (err) {
    if (
      err instanceof EmailAlreadyExistsError ||
      err instanceof CPFCNPJAlreadyExistsError
    ) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
