import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  product_id: string;
  image: string;
}

@injectable()
class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ product_id, image }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);

    if(!product) {
      throw new AppError('Only authenticated user can change avatar.', 401);
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    const filename = await this.storageProvider.saveFile(image);

    product.image = filename;

    await this.productsRepository.save(product);

    return product;

  }

}

export default UpdateProductImageService;
