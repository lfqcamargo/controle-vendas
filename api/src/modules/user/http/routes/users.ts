import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from '../controllers/authenticate'
import { profile } from '../controllers/profile'
import { refresh } from '../controllers/refresh'
import { register } from '../controllers/register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
