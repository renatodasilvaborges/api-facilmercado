import AppointmentProduct from '../infra/typeorm/entities/AppointmentProduct';
import ICreateAppointmentProductDTO from '../dtos/ICreateAppointmentProductDTO';

export default interface IAppointmentsProductsRepository {
  create(data: ICreateAppointmentProductDTO): Promise<AppointmentProduct>;
}
