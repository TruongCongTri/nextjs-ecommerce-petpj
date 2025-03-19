import React from "react";

// import { productsData } from "@/data/data";

import ProductCard from "@/components/cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { IProductFetch } from "@/models/products";
import apis from "@/apis";

const fetchProds = async (cateSlug: string): Promise<IProductFetch> => {
  const res = await apis.product.getProductsByCate(cateSlug);
  return res.json();
};
export default async function RelatedProductsList({
  cateSlug,
}: {
  cateSlug: string;
}) {
  const data = await fetchProds(cateSlug);

  return (
    <div className="flex flex-col lg:gap-8 gap-4">
      <div className="flex justify-center items-center">
        <div className="capitalize text-4xl font-semibold">
          Related Products
        </div>
      </div>
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {data.products.map(
          (prod, idx) => idx <= 3 && <ProductCard {...prod} key={prod.id} />
        )}
      </div>
      <div className="lg:hidden relative w-full mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full rounded-lg overflow-hidden"
        >
          <CarouselContent>
            {data.products.map(
              (prod, idx) =>
                idx <= 3 && (
                  <CarouselItem key={idx} className="basis-1/2">
                    <ProductCard {...prod} />
                  </CarouselItem>
                )
            )}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/50 hover:bg-background/75 p-2 rounded-full" />
          <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/50 hover:bg-background/75 p-2 rounded-full" />
        </Carousel>
      </div>
    </div>
  );
}
