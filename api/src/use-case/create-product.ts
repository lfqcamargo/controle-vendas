import { GroupNotExistsError } from '@/errors/group-not-exists-error'
import { ProductAlreadyExistsError } from '@/errors/product-already-exists-error'
import { GroupsRepository } from '@/repositories/groups-repository'
import { ProductsRepository } from '@/repositories/products-repository'

interface CreateProductUseCaseRequest {
  userId: string
  groupId: number
  description: string
  priceBuy: number
  priceSell: number
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private groupsRepository: GroupsRepository,
  ) {}

  async execute({
    userId,
    groupId,
    description,
    priceBuy,
    priceSell,
  }: CreateProductUseCaseRequest) {
    const productAlreadyCreated =
      await this.productsRepository.searchByDescription(userId, description)

    if (productAlreadyCreated) {
      throw new ProductAlreadyExistsError()
    }

    const groupExists = await this.groupsRepository.findById(userId, groupId)

    if (!groupExists) {
      throw new GroupNotExistsError()
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
