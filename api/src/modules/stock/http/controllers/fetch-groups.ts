import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchGroupsService } from '@/modules/stock/factories/make-fetch-groups-service'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchGroupsQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
    take: z.coerce.number().optional().default(10),
  })

  const { page, take } = fetchGroupsQuerySchema.parse(request.query)
  const fetchGroupsService = makeFetchGroupsService()

  try {
    const data = await fetchGroupsService.execute({
      userId: request.user.sub,
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
