import Link from "next/link";

import { siteConfig } from "@/data/site";

import { Card } from "@/components/ui/card";

import {
  CustomImage,
  CustomImageFallback,
  CustomImageInput,
} from "../ui/customize/custom-image";
import { IProductType } from "@/models/products";
import { RatingGroup } from "../ui/customize/custom-rating";

export default async function SmallProductCard({
  product,
}: {
  product: IProductType;
}) {
  return (
    <Card className="lg:w-[400px] w-full group relative space-y-4 overflow-hidden border-transparent shadow-none hover:border-primary hover:shadow hover:shadow-primary">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-3 items-center w-full ">
          <CustomImage className="aspect-square w-full rounded-xl max-w-[100px] max-h-[100px]">
            <CustomImageInput src={product.thumbnail} />
            <CustomImageFallback className="rounded-xl">CN</CustomImageFallback>
          </CustomImage>
          <div className="flex flex-col gap-2 w-full">
            <Link href={`${siteConfig.proxy.product}/${product.id}}`}>
              <div className="capitalize line-clamp-2 font-normal text-sm">{product.title}</div>
            </Link>
            <div className="capitalize flex gap-1 ">
              {product.discountPercentage ? (
                <>
                  <span className="text-base font-medium uppercase">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      (product.price * (100 - product.discountPercentage)) / 100
                    )}
                  </span>
                  <span className="text-muted-foreground text-base font-normal line-through uppercase">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-bold uppercase">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}{" "}
                </span>
              )}
            </div>
            <RatingGroup
              readonly
              ratingSteps={5}
              // defaultValue="1"
              value={product.rating.toString()}
              className="size-3 "
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
