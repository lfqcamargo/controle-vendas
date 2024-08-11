import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGroupsRepository } from '@//modules/stock/repositories/in-memory/in-memory-groups-repository'
import { FetchGroupsService } from '@/modules/stock/services/fetch-groups'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

let groupsRepository: InMemoryGroupsRepository
let sut: FetchGroupsService

describe('Fetch Group', () => {
  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    sut = new FetchGroupsService(groupsRepository)
  })

  it('should return a list of groups', async () => {
    for (let i = 1; i <= 22; i++) {
      await groupsRepository.create({
        user_id: 'user-id',
        description: `Grupo - ${i}`,
      })
    }

    const { groups } = await sut.execute({
      userId: 'user-id',
      page: 3,
      take: 10,
    })

    expect(groups).toHaveLength(2)
    expect(groups).toEqual([
      expect.objectContaining({
        id: 21,
        user_id: 'user-id',
        description: 'Grupo - 21',
      }),
      expect.objectContaining({
        id: 22,
        user_id: 'user-id',
        description: 'Grupo - 22',
      }),
    ])
  })

  it('shoueld fit should not be possible to find groups if none have been createdetch groups', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id',
        page: 3,
        take: 10,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
