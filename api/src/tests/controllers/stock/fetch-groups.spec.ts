import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/shared/lib/prisma'
import { createAndAuthenticateUser } from '@/shared/utils/create-and-authenticate-user'

describe('Fetch Groups (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch groups', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    for (let i = 1; i <= 22; i++) {
      await prisma.group.create({
        data: {
          user_id: user.id,
          description: `Grupo - ${i}`,
        },
      })
    }

    const response = await request(app.server)
      .get('/groups')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, take: 10 })

    expect(response.statusCode).toEqual(200)

    expect(response.body).toHaveProperty('groups')
    expect(response.body).toHaveProperty('totalItems', 22)
    expect(response.body).toHaveProperty('totalPages', 3)
    expect(response.body).toHaveProperty('currentPage', 1)

    expect(response.body.groups).toHaveLength(10)
    expect(response.body.groups[0]).toHaveProperty('id')
    expect(response.body.groups[0]).toHaveProperty('description')
    expect(response.body.groups[0]).toHaveProperty('user_id', user.id)
  })
})
