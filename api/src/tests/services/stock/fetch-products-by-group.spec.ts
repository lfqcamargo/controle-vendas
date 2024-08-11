import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryProductsRepository } from '@//modules/stock/repositories/in-memory/in-memory-products-repository'
import { InMemoryGroupsRepository } from '@/modules/stock/repositories/in-memory/in-memory-groups-repository'
import { FetchProductsByGroupService } from '@/modules/stock/services/fetch-products-by-group'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

let groupsRepository: InMemoryGroupsRepository
let productsRepository: InMemoryProductsRepository
let sut: FetchProductsByGroupService

describe('Fetch Product', () => {
  beforeEach(async () => {
    groupsRepository = new InMemoryGroupsRepository()
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsByGroupService(productsRepository)

    await groupsRepository.create({
      user_id: 'user-id',
      description: 'Pão',
    })

    await groupsRepository.create({
      user_id: 'user-id',
      description: 'Vinho',
    })
  })

  it('should return a list of products', async () => {
    for (let i = 1; i <= 22; i++) {
      const groupId = i % 2 === 1 ? 1 : 2

      await productsRepository.create({
        user_id: 'user-id',
        group_id: groupId,
        description: `Producto - ${i}`,
        price_buy: 0.5,
        price_sell: 0.7,
      })
    }

    const { products } = await sut.execute({
      userId: 'user-id',
      groupId: 1,
      page: 2,
      take: 10,
    })

    console.log(products)
    expect(products).toHaveLength(1)
    expect(products).toEqual([
      expect.objectContaining({
        description: 'Producto - 21',
      }),
    ])
  })

  it('should not be possible to find products if none have been created', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id',
        groupId: 1,
        page: 3,
        take: 10,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
