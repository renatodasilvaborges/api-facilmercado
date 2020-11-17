import { injectable, inject } from 'tsyringe';

import AppointmentProduct from '../infra/typeorm/entities/AppointmentProduct';
import IAppointmentsProductsRepository from '../repositories/IAppointmentsProductsRepository';

interface IRequest {
  provider_id: string;
  product_id: string;
}

@injectable()
class CreateAppointmentProductService {
  constructor(
    @inject('AppointmentsProductsRepository')
    private appointmentsProducts: IAppointmentsProductsRepository,
  ) {}

  public async execute({ provider_id, product_id }: IRequest): Promise<AppointmentProduct> {

    const appointmentProduct = await this.appointmentsProducts.create({
      provider_id,
      product_id,
    });

    return appointmentProduct;
  }
}

export default CreateAppointmentProductService;
