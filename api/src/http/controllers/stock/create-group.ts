import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { GroupAlreadyExistsError } from '@/errors/group-already-exists-error'
import { makeCreateGroupUseCase } from '@/use-case/factories/make-create-group-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGroupBodySchema = z.object({
    description: z.string().min(3).max(30),
  })

  const { description } = createGroupBodySchema.parse(request.body)
  const createGroupUseCase = makeCreateGroupUseCase()

  try {
    await createGroupUseCase.execute({
      userId: request.user.sub,
      description,
    })
  } catch (err) {
    if (err instanceof GroupAlreadyExistsError) {
      return reply.status(409).send({ message: 'Group already exists.' })
    }
  }

  return reply.status(201).send()
}
