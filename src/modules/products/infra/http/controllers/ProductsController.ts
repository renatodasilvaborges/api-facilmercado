import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import UpdateProductImageService from '@modules/products/services/UpdateProductImageService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, price, image, description } = request.body;
    const provider_id = request.user.id;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      provider_id,
      price,
      image,
      description,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const provider_id = request.user.id;

    const listProduct = container.resolve(ListProductsService);

    const products = await listProduct.execute({
      provider_id
    });

    return response.json(products);
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const { provider_id } = request.params;

    const listProduct = container.resolve(ListProductsService);

    const products = await listProduct.execute({
      provider_id
    });

    return response.json(products);
  }

  public async showProduct(request: Request, response: Response): Promise<Response>{
    const { product_id } = request.params;

    const listProduct = container.resolve(ShowProductService);

    const product = await listProduct.execute({
      product_id
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const { id } = request.body;
    const { name, price, image, description } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const products = await updateProduct.execute({
      id,
      name,
      price,
      image,
      description,
    });

    return response.json(products);
  }

  public async updateImage(request: Request, response: Response): Promise<Response> {
    const updateImageProduct = container.resolve(UpdateProductImageService);
    const { product_id } = request.params;

      const product = await updateImageProduct.execute({
        product_id,
        image: request.file.filename,
      });

      return response.json(classToClass(product));
  }

}
