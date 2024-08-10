import { ProductsRepository } from '@/repositories/products-repository'

interface CreateProductUseCaseRequest {
  userId: string
  groupId: number
  description: string
  priceBuy: number
  priceSell: number
}

export class CreateGroupUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    userId,
    groupId,
    description,
    priceBuy,
    priceSell,
  }: CreateProductUseCaseRequest) {
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
