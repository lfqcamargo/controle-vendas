import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateGroupService } from '@/modules/stock/factories/make-create-group-use-case'
import { GroupAlreadyExistsError } from '@/shared/errors/group-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGroupBodySchema = z.object({
    description: z.string().min(3).max(30),
  })

  const { description } = createGroupBodySchema.parse(request.body)
  const createGroupService = makeCreateGroupService()

  try {
    await createGroupService.execute({
      userId: request.user.sub,
      description,
    })
  } catch (err) {
    if (err instanceof GroupAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
