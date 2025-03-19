import { ICategoryType, INewsType, IProductType } from "@/models/types";

export interface ISearchProps {
  categories: ICategoryType[];
  products: IProductType[];
}

export interface IProductsListProps {
  products: IProductType[];
}
export interface ICategoriesListProps {
  categories: ICategoryType[];
}
export interface INewsListProps {
  news: INewsType[];
}