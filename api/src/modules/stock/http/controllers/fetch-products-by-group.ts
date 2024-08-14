import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

import { makeFetchProductsByGroupService } from '../../factories/make-fetch-products-by-group-service copy'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchProductsByGroupQuerySchema = z.object({
    groupId: z.coerce.number().optional(),
    page: z.coerce.number().optional().default(1),
    take: z.coerce.number().optional().default(10),
  })

  const { groupId, page, take } = fetchProductsByGroupQuerySchema.parse(
    request.query,
  )
  const fetchProductsByGroupService = makeFetchProductsByGroupService()

  try {
    const data = await fetchProductsByGroupService.execute({
      userId: request.user.sub,
      groupId,
      page,
      take,
    })
    return reply.status(200).send(data)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
