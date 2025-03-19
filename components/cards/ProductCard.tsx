import Link from "next/link";

import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import { IProductType } from "@/models/products";
import { siteConfig } from "@/data/site";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RatingGroup } from "@/components/ui/customize/custom-rating";
import QuickViewProduct from "@/components/layouts/products/QuickReview";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function ProductCard(product: IProductType) {
  return (
    <Card className="lg:w-[240px] w-[190px] group relative space-y-4 overflow-hidden ">
      <div className="group-hover:border-green-400 border border-gray-300 rounded-xl">
        <figure>
          {/* <CustomImage className="aspect-square w-full rounded-t-xl max-w-[300px] max-h-[500px]">
            <CustomImageInput src={product.thumbnail} />
            <CustomImageFallback className="rounded-t-xl">
              CN
            </CustomImageFallback>
          </CustomImage> */}
          <Image
            src={`${
              product.thumbnail ? product.thumbnail : "/images/placeholder.svg"
            }`}
            alt={product.title}
            width={190}
            height={190}
            className=" w-full aspect-square rounded-t-xl"
          />
        </figure>
        <CardContent className="px-4 py-2">
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-normal group-hover:text-green-600">
                <Link
                  href={`${siteConfig.proxy.product}/${product.id}`}
                  className="capitalize line-clamp-1"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </Link>
              </div>

              <p className="text-base font-medium uppercase">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </p>
            </div>
          </div>
          <RatingGroup
            readonly
            ratingSteps={5}
            // defaultValue="1"
            value={product.rating.toString()}
            className="size-3 "
          />
          <div className="">
            <Button
              variant="ghost"
              size="icon"
              className="bg-gray-100 absolute end-3 bottom-6 rounded-full dark:text-black 
            group-hover:text-green-400 border border-transparent group-hover:border-green-400"
            >
              <ShoppingBagIcon className="size-4 " />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 bg-white/70 absolute top-3 end-3 rounded-full dark:text-black border border-transparent hover:border-green-400"
            >
              <HeartIcon className="size-4" />
            </Button>
            <div className="hidden lg:grid">
              <QuickViewProduct {...product} />
            </div>
          </div>
          <div>
            {product.discountPercentage && (
              <Badge className="absolute top-3 start-3 bg-red-500 hover:bg-red-500">
                Sale {product.discountPercentage}%
              </Badge>
            )}
            {product.availabilityStatus === "Out of Stock" && (
              <Badge className="absolute top-12 start-3 bg-black hover:bg-black ">
                {product.availabilityStatus}
              </Badge>
            )}
            
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
