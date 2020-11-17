import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  price: Number;
  image: string;
  description: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id, name, price, image, description }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if(!product) {
      throw new AppError('product not found');
    }

    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;
