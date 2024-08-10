import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGroupsRepository } from '@/repositories/in-memory/in-memory-groups-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateGroupUseCase } from '@/use-case/create-group'

let usersRepository: InMemoryUsersRepository
let groupsRepository: InMemoryGroupsRepository
let sut: CreateGroupUseCase

describe('Create Group', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    groupsRepository = new InMemoryGroupsRepository()
    sut = new CreateGroupUseCase(usersRepository, groupsRepository)
  })

  it('', async () => {
    const createdGroup = await groupsRepository.create({
      description: 'Pão',
    })

    const { group } = await sut.execute({
      groupId: createdGroup.id,
    })

    expect(group.description).toEqual('Lucas Camargo')
  })
})
