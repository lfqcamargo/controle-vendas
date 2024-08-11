import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGroupsRepository } from '@//modules/stock/repositories/in-memory/in-memory-groups-repository'
import { DeleteGroupService } from '@/modules/stock/services/delete-group'
import { GroupNotExistsError } from '@/shared/errors/group-not-exists-error'

let groupsRepository: InMemoryGroupsRepository
let sut: DeleteGroupService

describe('Delete Group', () => {
  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    sut = new DeleteGroupService(groupsRepository)
  })

  it('should return a list of groups', async () => {
    const group = await groupsRepository.create({
      user_id: 'user-id',
      description: 'Pão',
    })

    const result = await sut.execute({ userId: 'user-id', id: group.id })
    expect(result).toEqual(true)
  })

  it('should throw an error if group does not exist', async () => {
    await expect(() =>
      sut.execute({ userId: 'user-id', id: 999 }),
    ).rejects.toBeInstanceOf(GroupNotExistsError)
  })
})
