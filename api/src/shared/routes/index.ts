import { FastifyInstance } from 'fastify'

import { stockRoutes } from '@/modules/stock/http/routes'
import { userRoutes } from '@/modules/user/http/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes)
  app.register(stockRoutes)
}
