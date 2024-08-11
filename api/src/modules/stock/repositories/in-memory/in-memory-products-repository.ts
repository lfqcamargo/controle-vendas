import { Prisma, Product } from '@prisma/client'
import { randomInt } from 'crypto'

import { ProductsRepository } from '../interface/products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async searchByDescription(userId: string, description: string) {
    const product =
      this.items.find(
        (product) =>
          product.user_id === userId && product.description === description,
      ) || null

    return product
  }

  async findById(userId: string, id: number) {
    const product =
      this.items.find(
        (product) => product.user_id === userId && product.id === id,
      ) || null

    return product
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = {
      id: randomInt(100),
      description: data.description,
      price_buy: data.price_buy,
      price_sell: data.price_sell,
      user_id: data.user_id,
      date_created: new Date(),
      group_id: data.group_id,
    }

    this.items.push(product)

    return product
  }
}
