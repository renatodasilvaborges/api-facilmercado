import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  provider_id: string;
  price: string;
  image: string;
  description: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

  ) {}

  public async execute({ name, provider_id, price, image, description }: IRequest): Promise<Product> {

    const product = await this.productsRepository.create({
      name,
      provider_id,
      price,
      image,
      description,
    });

    return product;
  }
}

export default CreateProductService;
