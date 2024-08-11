import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryProductsRepository } from '@//modules/stock/repositories/in-memory/in-memory-products-repository'
import { InMemoryGroupsRepository } from '@/modules/stock/repositories/in-memory/in-memory-groups-repository'
import { DeleteProductService } from '@/modules/stock/services/delete-product'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

let groupsRepository: InMemoryGroupsRepository
let productsRepository: InMemoryProductsRepository
let sut: DeleteProductService

describe('Delete Product', () => {
  beforeEach(async () => {
    groupsRepository = new InMemoryGroupsRepository()
    productsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductService(productsRepository)

    await groupsRepository.create({
      user_id: 'user-id',
      description: 'Pão',
    })
  })

  it('should delete product', async () => {
    const product = await productsRepository.create({
      user_id: 'user-id',
      group_id: 1,
      description: 'Pão de Forma',
      price_buy: 0.5,
      price_sell: 0.75,
    })

    const result = await sut.execute({ userId: 'user-id', id: product.id })
    expect(result).toEqual(true)
  })

  it('should throw an error if product does not exist', async () => {
    await expect(() =>
      sut.execute({ userId: 'user-id', id: 999 }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
