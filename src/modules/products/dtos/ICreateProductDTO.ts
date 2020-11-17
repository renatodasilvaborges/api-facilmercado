import { Decimal128 } from "mongodb";

export default interface ICreateProductDTO {
  name: string;
  provider_id: string;
  price: Number;
  image: string;
  description: string;
}
