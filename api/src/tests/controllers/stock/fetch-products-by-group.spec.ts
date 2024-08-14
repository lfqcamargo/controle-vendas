import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/shared/lib/prisma'
import { createAndAuthenticateUser } from '@/shared/utils/create-and-authenticate-user'

describe('Fetch Products By Group (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch products', async () => {
    const group = [1, 2, 3]
    let groupAux = 0
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    for (let i = 1; i <= 3; i++) {
      await prisma.group.create({
        data: {
          user_id: user.id,
          description: `Grupo - ${i}`,
        },
      })
    }

    for (let i = 1; i <= 18; i++) {
      await prisma.product.create({
        data: {
          user_id: user.id,
          group_id: group[0],
          description: `Product - ${i}`,
          price_buy: i,
          price_sell: i * 2,
        },
      })
      groupAux = group.shift()
      group.push(groupAux)
    }

    const response = await request(app.server)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .query({ groupId: 1, page: 1, take: 10 })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('products')
    expect(response.body).toHaveProperty('totalItems', 6)
    expect(response.body).toHaveProperty('totalPages', 1)
    expect(response.body).toHaveProperty('currentPage', 1)
  })
})
