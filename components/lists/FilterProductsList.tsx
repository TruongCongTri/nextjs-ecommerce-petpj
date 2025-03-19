import React from "react";

// import { productsData } from "@/data/data";

import ProductCard from "@/components/cards/ProductCard";

import { IProductType } from "@/models/products";

// const fetchProducts = async (): Promise<IProductFetch> => {
//   const res = await apis.product.getProducts();
//   return res.json();
// };

// 15 products
export default async function FiltersProductsList({
  products,
}: {
  products: IProductType[];
}) {
  const data = await products;
  return (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-3 lg:gap-6">
      {data.length === 0 ? (
        <div className="col-span-2 lg:col-span-3 h-[340px] flex items-center justify-center">
          Empty Products
        </div>
      ) : (
        <>
          {data.map((prod) => (
            <div key={prod.id}>
              <ProductCard {...prod} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
