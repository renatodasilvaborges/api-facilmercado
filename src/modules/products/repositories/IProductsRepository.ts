import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IFindAllProductsDTO from '../dtos/IFindAllProductsDTO';
import IFindMyAllProductsDTO from '../dtos/IFindMyAllProductsDTO';

export default interface IProductRepository {
  findById (id: string): Promise<Product | undefined >;
  findAvailableAllProducts (data: IFindAllProductsDTO): Promise<Product[]>;
  findMyAllProducts (data: IFindMyAllProductsDTO): Promise<Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}
