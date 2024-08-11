import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/shared/lib/prisma'
import { createAndAuthenticateUser } from '@/shared/utils/create-and-authenticate-user'

describe('Create Product (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create product', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    await prisma.group.create({
      data: {
        user_id: user.id,
        description: 'Pão',
      },
    })

    const response = await request(app.server)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        groupId: 1,
        description: 'Pão de Forma',
        priceBuy: 0.5,
        priceSell: 0.75,
      })

    expect(response.statusCode).toEqual(201)
  })
})
