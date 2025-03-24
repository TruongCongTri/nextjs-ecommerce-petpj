import React from "react";
import Link from "next/link";

import { siteConfig } from "@/data/site";

import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";

import { MoveRightIcon } from "lucide-react";
import { IProductFetch } from "@/models/products";
import apis from "@/apis";
import LargeProductCard from "../cards/LargeProductCard";

const fetchProds = async (): Promise<IProductFetch> => {
  const res = await apis.product.getProductsOrderByDiscount(0, 12, 'asc');
  return res.json();
};

// 12 products
export default async function HotDealsList() {
  const data = await fetchProds();

  return (
    <div className="flex flex-col lg:gap-6 gap-2">
      <div className="flex justify-between items-center">
        <div className="capitalize text-4xl font-semibold">Hot Deals</div>
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

      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5">
        {data.products.map((o, idx) =>
          idx === 0 ? (
            <div key={idx} className="lg:col-span-2 lg:row-span-2">
              <LargeProductCard {...o} />
            </div>
          ) : (
            <ProductCard {...o} key={idx} />
          )
        )}
      </div>
    </div>
  );
}
