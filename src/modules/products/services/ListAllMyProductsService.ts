import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import {classToClass} from 'class-transformer';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
      const products = await this.productsRepository.findMyAllProducts({
        provider_id
      });

      return response.json(classToClass(products));
  }
}

export default ListProductsService;
