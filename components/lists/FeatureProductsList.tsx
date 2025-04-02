import React from "react";
import Link from "next/link";

import { siteConfig } from "@/data/site";

import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";

import { MoveRightIcon } from "lucide-react";
import { IProductFetch } from "@/models/products";
import apis from "@/apis";

const fetchProds = async (): Promise<IProductFetch> => {
  const res = await apis.product.getProducts(24, 10);
  return res.json();
};

// 10 products
export default async function FeatureProductsList() {
  const data = await fetchProds();

  return (
    <div className="flex flex-col lg:gap-6 gap-2">
      <div className="flex justify-between items-center">
        <div className="capitalize text-2xl lg:text-4xl font-semibold">Feature Products</div>
        <Button
          asChild
          variant="link"
          className="text-primary dark:text-white font-medium text-base"
        >
          <Link href={siteConfig.proxy.shop} className="">
            View All <MoveRightIcon />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 ">
        {data.products.map((prod) => (
          <div key={prod.id}>
            <ProductCard {...prod} />
          </div>
        ))}
      </div>
    </div>
  );
}
