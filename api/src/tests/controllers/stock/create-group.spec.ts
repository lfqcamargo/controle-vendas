import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/shared/utils/create-and-authenticate-user'

describe('Create Group (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create group', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Pão',
      })

    expect(response.statusCode).toEqual(201)
  })
})
