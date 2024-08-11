import { FastifyInstance } from 'fastify'

import { groupsRoutes } from './groups'
import { productsRoutes } from './products'
import { usersRoutes } from './users'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(groupsRoutes)
  app.register(productsRoutes)
}
