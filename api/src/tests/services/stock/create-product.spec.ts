import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGroupsRepository } from '@/modules/stock/repositories/in-memory/in-memory-groups-repository'
import { InMemoryProductsRepository } from '@/modules/stock/repositories/in-memory/in-memory-products-repository'
import { CreateProductService } from '@/modules/stock/services/create-product'
import { GroupNotExistsError } from '@/shared/errors/group-not-exists-error'
import { ProductAlreadyExistsError } from '@/shared/errors/product-already-exists-error'

let productsRepository: InMemoryProductsRepository
let groupsRepository: InMemoryGroupsRepository
let sut: CreateProductService

describe('Create Product Use Case', () => {
  beforeEach(async () => {
    productsRepository = new InMemoryProductsRepository()
    groupsRepository = new InMemoryGroupsRepository()
    sut = new CreateProductService(productsRepository, groupsRepository)

    await groupsRepository.create({
      user_id: 'user-id',
      description: 'Pão',
    })
  })

  it('should register a new product', async () => {
    const result = await sut.execute({
      userId: 'user-id',
      groupId: 1,
      description: 'Pão de Forma',
      priceBuy: 0.5,
      priceSell: 0.75,
    })

    expect(result.product.description).toEqual('Pão de Forma')
  })

  it('should not be able to register with the same product description twice', async () => {
    await sut.execute({
      userId: 'user-id',
      groupId: 1,
      description: 'Pão de Forma',
      priceBuy: 0.5,
      priceSell: 0.75,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        groupId: 1,
        description: 'Pão de Forma',
        priceBuy: 0.5,
        priceSell: 0.75,
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })

  it('should not be possible to register with a non-existent group', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id',
        groupId: 2,
        description: 'Pão de Forma',
        priceBuy: 0.5,
        priceSell: 0.75,
      }),
    ).rejects.toBeInstanceOf(GroupNotExistsError)
  })
})
