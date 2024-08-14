import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateProductService } from '@/modules/stock/factories/make-create-product-use-case'
import { GroupNotExistsError } from '@/shared/errors/group-not-exists-error'
import { ProductAlreadyExistsError } from '@/shared/errors/product-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    groupId: z.number().nonnegative(),
    description: z.string().min(3).max(50),
    priceBuy: z.number().multipleOf(0.01).nonnegative(),
    priceSell: z.number().multipleOf(0.01).nonnegative(),
  })

  const { groupId, description, priceBuy, priceSell } =
    createProductBodySchema.parse(request.body)
  const createProductService = makeCreateProductService()

  try {
    await createProductService.execute({
      userId: request.user.sub,
      groupId,
      description,
      priceBuy,
      priceSell,
    })
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof GroupNotExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
