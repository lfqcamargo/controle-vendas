import { FastifyInstance } from 'fastify'

import { usersRoutes } from './users'

export async function userRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
}
