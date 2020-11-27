import { Decimal128 } from "mongodb";

export default interface ICreateProductDTO {
  name: string;
  provider_id: string;
  price: string;
  image: string;
  description: string;
}
