import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllFromMonthProviderDTO from '../dtos/IFindAllFromMonthProviderDTO';
import IFindAllFromDayProviderDTO from '../dtos/IFindAllFromDayProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllFromMonthProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllFromDayProviderDTO): Promise<Appointment[]>;

}
