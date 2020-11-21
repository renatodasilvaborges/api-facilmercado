export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  product_id?: string;
  date: Date;
}
