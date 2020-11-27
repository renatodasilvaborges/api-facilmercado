import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  provider_id: string;
}

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ provider_id }: IRequest): Promise<Product[] | null> {

      const products = await this.productsRepository.findMyAllProducts({
        provider_id
      });

    return classToClass(products);
  }
}

export default ListProviderMonthAvailabilityService;
