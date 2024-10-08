import { FastifyInstance } from 'fastify'

import { create } from '@/modules/stock/http/controllers/create-product'
import { fetch } from '@/modules/stock/http/controllers/fetch-products-by-group'

import { verifyJWT } from '../../../user/middlewares/verify-jwt'

export async function productsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/products', create)
  app.get('/products', fetch)
}
