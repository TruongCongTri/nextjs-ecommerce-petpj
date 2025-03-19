import { apiConfig } from "@/data/api";
const product = {
  // skip ~ page -> page 2 ~ skip 5
  // limit ~ per page
  async getProducts(skip?: number, limit?: number, order?: string) {
    const res = await fetch(
      `${apiConfig.product.products}` +
        `?${skip ? `skip=${skip}` : ""}` +
        `&${limit ? `limit=${limit}` : `limit=0`}` +
        `&${order ? `sortBy=price&order=${order}` : ""}`
    );
    return res;
  },

  async getProductsOrderByDiscount(
    skip?: number,
    limit?: number,
    order?: string
  ) {
    const res = await fetch(
      `${apiConfig.product.products}` +
        `?${skip ? `skip=${skip}` : ""}` +
        `&${limit ? `limit=${limit}` : `limit=0`}` +
        `&${order ? `?sortBy=discountPercentage&order=${order}` : ""}`
    );
    return res;
  },

  async getProductDetails(prodId: number) {
    const res = await fetch(`${apiConfig.product.products}/${prodId}`);
    return res;
  },

  async getProductsByCate(
    cateSlug: string,
    limit?: number,
    skip?: number,
    order?: string
  ) {
    const res = await fetch(
      `${apiConfig.product.prodByCate}/${cateSlug}` +
        `?${limit ? `limit=${limit}` : `limit=0`}` +
        `&${skip ? `skip=${skip}` : ""}` +
        `&${order ? `sortBy=price&order=${order}` : ""}`
    );
    return res;
  },

  async getProductTags() {
    const res = await fetch(`https://dummyjson.com/c/08ed-1e9a-4523-88e4`);
    return res;
  },
};

export default product;
