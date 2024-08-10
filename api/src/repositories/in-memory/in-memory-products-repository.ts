import { Prisma, Product } from '@prisma/client'
import { randomInt } from 'crypto'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  findById(id: string): Promise<Product | null> {
    throw new Error(`${id} Method not implemented.`)
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
