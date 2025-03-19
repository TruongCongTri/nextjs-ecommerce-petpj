import { IData } from "./general";

export interface IQuoteType {
  id: number;
  quote: string;
  author: string;
}

export interface IQuoteFetch extends IData {
  comments: IQuoteType[];
}
