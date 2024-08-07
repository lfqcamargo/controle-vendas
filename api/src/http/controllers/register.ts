import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { registerUserCase } from '@/use-case/register'

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
    await registerUserCase({
      name,
      cpf_cnpj,
      email,
      password
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
