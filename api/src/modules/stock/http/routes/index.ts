import { FastifyInstance } from 'fastify'

import { groupsRoutes } from './groups'
import { productsRoutes } from './products'

export async function stockRoutes(app: FastifyInstance) {
  app.register(groupsRoutes)
  app.register(productsRoutes)
}
