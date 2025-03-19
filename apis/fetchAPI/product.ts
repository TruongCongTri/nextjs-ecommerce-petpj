import { IProductFetch } from "@/models/products";
import apis from "..";

export const fetchProducts = async (
  skip?: number,
  limit?: number,
  order?: string
): Promise<IProductFetch> => {
  const res = await apis.product.getProducts(skip, limit, order);
  return res.json();
};

export const fetchProductsByCate = async (
  slug: string,
  skip?: number,
  limit?: number,
  order?: string
): Promise<IProductFetch> => {
  const res = await apis.product.getProductsByCate(slug, limit, skip, order);
  return res.json();
};

export const fetchProductCategoryList = async (): Promise<string[]> => {
  const res = await apis.category.getCategoryList();
  return res.json();
};

export const fetchProductTagList = async (): Promise<string[]> => {
  const res = await apis.product.getProductTags();
  return res.json();
};
