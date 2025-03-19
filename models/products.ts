import { IMetaData, IData } from "./general";
import { IReviewType } from "./reviews";

export interface IProductType {
  id?: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail?: string;
  images: string[];
  category: string;
  brand: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  availabilityStatus: string;
  sku: string;
  stock: number;
  meta: IMetaData;
  reviews: IReviewType[];
  minimumOrderQuantity?: number;
}

export interface IProductFetch extends IData {
  products: IProductType[];
}
