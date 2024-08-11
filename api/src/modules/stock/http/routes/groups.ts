import { FastifyInstance } from 'fastify'

import { create } from '@/modules/stock/http/controllers/create-group'

import { verifyJWT } from '../../../user/middlewares/verify-jwt'

export async function groupsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/groups', create)
}
