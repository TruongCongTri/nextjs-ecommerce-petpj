import { apiConfig } from "@/data/api";
import { ICartProductType } from "@/models/carts";

const cart = {
  async getCartDetails(cartId: number) {
    const res = await fetch(`${apiConfig.cart.carts}/${cartId}`);
    return res;
  },

  async getCarts(skip?: number, limit?: number) {
    const res = await fetch(
      `${apiConfig.cart.carts}` +
        `?${skip ? `skip=${skip}` : "skip=0"}` +
        `&${limit ? `limit=${limit}` : `limit=0`}` +
        `&sortBy=id&order=desc`
    );
    return res;
  },

  async getCartsByUser(userId: number, skip?: number, limit?: number) {
    const res = await fetch(
      `${apiConfig.cart.cartByUser}/${userId}` +
        `?${skip ? `skip=${skip}` : "skip=0"}` +
        `&${limit ? `limit=${limit}` : `limit=0`}` +
        `&sortBy=id&order=desc`
    );
    return res;
  },

  async addToCart(userId: number, products: ICartProductType[]) {
    const res = await fetch(`${apiConfig.cart.addCart}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        products: products,
      }),
    });
    return res;
  },
};

export default cart;
