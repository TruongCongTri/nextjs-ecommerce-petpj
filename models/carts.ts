import { IData } from "./general";
import { IProductType } from "./products";

export interface ICartProductType extends IProductType {
  quantity?: number;
  total?: number;
  // discountPercentage: number;
  discountedTotal?: number;
}

export interface ICartType {
  id: number;
  products: ICartProductType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartFetch extends IData {
  carts: ICartType[];
};

