import { FastifyInstance } from 'fastify'

import { create } from '@/http/controllers/stock/create-product'

import { verifyJWT } from '../middlewares/verify-jwt'

export async function productsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/products', create)
}
