import { FastifyReply, FastifyRequest } from 'fastify'
import { number, z } from 'zod'

import { GroupNotExistsError } from '@/errors/group-not-exists-error'
import { ProductAlreadyExistsError } from '@/errors/product-already-exists-error'
import { makeCreateProductUseCase } from '@/use-case/factories/make-create-product-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    groupId: number().nonnegative(),
    description: z.string().min(3).max(50),
    priceBuy: number().multipleOf(0.01).nonnegative(),
    priceSell: number().multipleOf(0.01).nonnegative(),
  })

  const { groupId, description, priceBuy, priceSell } =
    createProductBodySchema.parse(request.body)
  const createProductUseCase = makeCreateProductUseCase()

  try {
    await createProductUseCase.execute({
      userId: request.user.sub,
      groupId,
      description,
      priceBuy,
      priceSell,
    })
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: 'Product already exists.' })
    }

    if (err instanceof GroupNotExistsError) {
      return reply.status(409).send({ message: 'Group not exists.' })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
