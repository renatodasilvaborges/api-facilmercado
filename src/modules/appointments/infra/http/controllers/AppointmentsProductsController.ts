import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentProductService from '@modules/appointments/services/CreateAppointmentProductService';

export default class AppointmentsProductsController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { product_id } = request.body;
    const provider_id = request.user.id;

    const createAppointment = container.resolve(CreateAppointmentProductService);

    const appointment = await createAppointment.execute({
      provider_id,
      product_id,
    });

    return response.json(appointment);
  }
}
