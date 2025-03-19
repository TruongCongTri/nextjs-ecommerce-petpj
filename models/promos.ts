import { IData } from "./general";

export interface IPromoType {
  id: number;
  size: "large" | "small" | "medium" | "full";
  type: string;
  title: string;
  description: string;
  policies: string;
  image: string;
}

export interface IPromoFetch extends IData {
  promotions: IPromoType[];

}
