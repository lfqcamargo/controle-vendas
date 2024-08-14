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

    const result = await sut.execute({
      userId: 'user-id',
      page: 3,
      take: 10,
    })

    expect(result).toHaveProperty('groups')
    expect(result).toHaveProperty('totalItems', 22)
    expect(result).toHaveProperty('totalPages', 3)
    expect(result).toHaveProperty('currentPage', 3)

    const { groups } = result
    expect(groups).toHaveLength(2)
    expect(groups[0]).toHaveProperty('id', 21)
    expect(groups[0]).toHaveProperty('description', 'Grupo - 21')
    expect(groups[0]).toHaveProperty('user_id', 'user-id')

    expect(groups[1]).toHaveProperty('id', 22)
    expect(groups[1]).toHaveProperty('description', 'Grupo - 22')
    expect(groups[1]).toHaveProperty('user_id', 'user-id')
  })

  it('should throw an error if no groups are found', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id',
        page: 3,
        take: 10,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
