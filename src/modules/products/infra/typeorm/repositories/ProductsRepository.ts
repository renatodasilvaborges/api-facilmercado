import { getRepository, Not, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindAllProductsDTO from '@modules/products/dtos/IFindAllProductsDTO';
import IFindMyAllProductsDTO from '@modules/products/dtos/IFindMyAllProductsDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async findAvailableAllProducts({ provider_id }: IFindAllProductsDTO): Promise<Product[]> {
    let products: Product[];

    if (provider_id) {
      products = await this.ormRepository.find({
        where: {
          id: Not(provider_id),
        },
      });
    } else {
      products = await this.ormRepository.find();
    }

    return products;
  }

  public async findMyAllProducts({ provider_id }: IFindMyAllProductsDTO): Promise<Product[]> {
    let products: Product[];

    products = await this.ormRepository.find({
      where: {
        provider_id: (provider_id),
      },
    });

    return products;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product  = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

}

export default ProductsRepository;
