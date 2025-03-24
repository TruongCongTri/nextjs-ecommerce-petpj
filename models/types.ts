import { IUserType } from "./authorization";

export interface ICategoryType {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface IProductType {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: string;
  categoryId: number;
  category: ICategoryType;
  saleId?: number;
}

export interface ICustomerReviewType {
  id: number;
  productId: number;
  product: IProductType;
  user: IUserType;
  rating: number;
  comment: string;
  image?: string[];
  video?: string;
  publishedTime: string;
}
export interface INewsType {
  id: number;
  author: IUserType;
  tittle: string;
  content: string;
  publishedDate: string;
  image: string;
}

export interface IPromoType {
  id: number;
  size: "large" | "small" | "medium" | "full";
  type: string;
  title: string;
  description: string;
  policies: string;
  href: string;
  image: string;
}

export interface ITagType {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ISingleCartType {
  quantity: number;
  product: IProductType;
  subTotal: number;
}

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

export interface IFAQType {
  question: string;
  answer: string;
}
