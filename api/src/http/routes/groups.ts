import { FastifyInstance } from 'fastify'

import { create } from '@/http/controllers/stock/create-group'

import { verifyJWT } from '../middlewares/verify-jwt'

export async function groupsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/groups', create)
}
