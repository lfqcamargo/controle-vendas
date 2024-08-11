import { beforeEach, describe, expect, it } from 'vitest'

import { ProductAlreadyExistsError } from '@/errors/product-already-exists-error'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from '@/use-case/create-product'

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository)
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
})
