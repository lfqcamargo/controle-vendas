import { beforeEach, describe, expect, it } from 'vitest'

import { GroupAlreadyExistsError } from '@/shared/errors/group-already-exists-error'
import { InMemoryGroupsRepository } from '@/repositories/in-memory/in-memory-groups-repository'
import { CreateGroupUseCase } from '@/modules/stock/services/create-group'

let groupsRepository: InMemoryGroupsRepository
let sut: CreateGroupUseCase

describe('Create Group Use Case', () => {
  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    sut = new CreateGroupUseCase(groupsRepository)
  })

  it('should register a new group', async () => {
    const result = await sut.execute({
      userId: 'user-id',
      description: 'Pão',
    })

    expect(result.group.description).toEqual('Pão')
  })

  it('should not be able to register with the same group description twice', async () => {
    await sut.execute({
      userId: 'user-id',
      description: 'Pão',
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        description: 'Pão',
      }),
    ).rejects.toBeInstanceOf(GroupAlreadyExistsError)
  })
})
