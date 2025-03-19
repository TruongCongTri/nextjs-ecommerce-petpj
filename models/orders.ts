import { IUserType } from "./authorization";
import { IData } from "./general";

export interface IOrderType {
  id: string;
  date: string;
  status: "pending" | "processing" | "on the way" | "success" | "failed";
  buyer: IUserType;
  // cart: ISingleCartType[];
  discount: number;
  shipping: number | "Free";
  total: number;
  paymentMethod: "Paypal" | "MoMo" | "VNPay";
}

export interface IOrderFetch extends IData {
  carts: IOrderType[];
}
