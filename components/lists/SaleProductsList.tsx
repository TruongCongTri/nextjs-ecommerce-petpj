import React from "react";

import apis from "@/apis";
import { IProductFetch } from "@/models/products";
import SmallProductCard from "@/components/cards/SmallProductCard";

const fetchProducts = async (): Promise<IProductFetch> => {
  const data = await apis.product.getProductsOrderByDiscount(0, 3, "desc");
  return data.json();
};
// 3 card
export default async function SaleProductList() {
  const data = await fetchProducts();

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-start items-center">
        <div className="capitalize text-xl font-medium">Sale Products</div>
      </div>
      <div className="flex flex-col gap-4">
        {data.products.map((o, idx) => (
          <SmallProductCard product={o} key={idx} />
        ))}
      </div>
    </div>
  );
}
