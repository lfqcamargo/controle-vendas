import { ProductsRepository } from '@/modules/stock/repositories/interface/products-repository'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

interface DeleteProductServiceRequest {
  userId: string
  id: number
}

export class DeleteProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ userId, id }: DeleteProductServiceRequest): Promise<boolean> {
    const productExists = await this.productsRepository.findById(userId, id)

    if (!productExists) {
      throw new ResourceNotFoundError()
    }

    const productDeleted = await this.productsRepository.delete(userId, id)

    return productDeleted
  }
}
