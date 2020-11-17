import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';


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

}
