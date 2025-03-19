import { IPostType } from "@/models/posts";
import { IProductType } from "@/models/products";

export function containsAny(arr1: string | string[], arr2: string | string[]) {
  if (Array.isArray(arr1)) {
    return arr1.some((item) => arr2.includes(item));
  } else {
    return Array.of(arr1).some((item) => arr2.includes(item));
  }
}

export function filterProducts(
  products: IProductType[],
  cate: string | string[],
  rating: number,
  priceStart: number,
  priceEnd: number,
  tag: string | string[]
) {
  products = products.filter((o) =>
    cate !== "" ? cate.includes(o.category.toLowerCase().toString()) : o
  );

  products = products.filter(
    (o) =>
      o.price >= parseFloat(priceStart.toString()) &&
      o.price <= parseFloat(priceEnd.toString())
  );
  products = products.filter((o) => o.rating >= parseFloat(rating.toString()));
  products = products.filter((o) =>
    tag !== "" ? containsAny(tag, o.tags) : o
  );

  return products;
}

export function filterProductsWithoutCate(
  products: IProductType[],
  rating: number,
  priceStart: number,
  priceEnd: number,
  tag: string | string[]
) {
  products = products.filter(
    (o) => o.price >= priceStart && o.price <= priceEnd
  );
  products = products.filter((o) => o.rating >= rating);
  products = products.filter((o) =>
    tag !== "" ? containsAny(tag, o.tags) : o
  );

  return products;
}

export function filterPosts(
  posts: IPostType[],
  cate: string | string[],
  tag: string | string[],
  search: string
) {
  // posts = posts.filter((o) =>
  //   cate !== "" ? cate.includes(o.category.toLowerCase().toString()) : o
  // );
  posts = posts.filter((o) =>
    search !== "" ? o.title.toLowerCase().toString().includes(search) : o
  );
  posts = posts.filter((o) => (tag !== "" ? containsAny(tag, o.tags) : o));

  return posts;
}
