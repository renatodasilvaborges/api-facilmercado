import { getRepository, Repository } from 'typeorm';

import IAppointmentsProductsRepository from '@modules/appointments/repositories/IAppointmentsProductsRepository';
import ICreateAppointmentProductDTO from '../../../dtos/ICreateAppointmentProductDTO';

import AppointmentProduct from '../entities/AppointmentProduct';


class AppointmentsProductsRepository implements IAppointmentsProductsRepository {
  private ormRepository: Repository<AppointmentProduct>;

  constructor() {
    this.ormRepository = getRepository(AppointmentProduct);
  }


  public async create({ provider_id, product_id }: ICreateAppointmentProductDTO): Promise<AppointmentProduct> {
    const appointmentProduct = this.ormRepository.create({ provider_id, product_id });

    await this.ormRepository.save(appointmentProduct);

    return appointmentProduct;
  }

}

export default AppointmentsProductsRepository;
