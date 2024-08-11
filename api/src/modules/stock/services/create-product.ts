import { GroupsRepository } from '@/modules/stock/repositories/interface/groups-repository'
import { ProductsRepository } from '@/modules/stock/repositories/interface/products-repository'
import { GroupNotExistsError } from '@/shared/errors/group-not-exists-error'
import { ProductAlreadyExistsError } from '@/shared/errors/product-already-exists-error'

interface CreateProductServiceRequest {
  userId: string
  groupId: number
  description: string
  priceBuy: number
  priceSell: number
}

export class CreateProductService {
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
  }: CreateProductServiceRequest) {
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
