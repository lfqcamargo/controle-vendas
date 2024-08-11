import { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/users/authenticate'
import { profile } from '../controllers/users/profile'
import { refresh } from '../controllers/users/refresh'
import { register } from '../controllers/users/register'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
