import { ProductAlreadyExistsError } from '@/errors/product-already-exists-error'
import { ProductsRepository } from '@/repositories/products-repository'

interface CreateProductUseCaseRequest {
  userId: string
  groupId: number
  description: string
  priceBuy: number
  priceSell: number
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    userId,
    groupId,
    description,
    priceBuy,
    priceSell,
  }: CreateProductUseCaseRequest) {
    const productAlreadyCreated =
      await this.productsRepository.findByDescription(userId, description)

    if (productAlreadyCreated) {
      throw new ProductAlreadyExistsError()
    }

    const product = await this.productsRepository.create({
      user_id: userId,
      group_id: groupId,
      description,
      price_buy: priceBuy,
      price_sell: priceSell,
    })

    return {
      product,
    }
  }
}
