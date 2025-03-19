import Link from "next/link";

import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import { IProductType } from "@/models/types";
import { siteConfig } from "@/data/site";

import {
  CustomImage,
  CustomImageFallback,
  CustomImageInput,
} from "@/components/ui/customize/custom-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RatingGroup } from "@/components/ui/customize/custom-rating";
import QuickViewProduct from "@/components/layouts/products/QuickReview";

export default function CommonCard(product: IProductType) {
  return (
    <Card className="lg:w-[240px] w-[190px] group relative space-y-4 overflow-hidden ">
      <div className="group-hover:border-green-400 border border-gray-300 rounded-xl">
        <figure className="group-hover:opacity-90">
          <CustomImage className="aspect-square w-full rounded-t-xl max-w-[300px] max-h-[500px]">
            <CustomImageInput src={product.images[0]} />
            <CustomImageFallback className="rounded-t-xl">
              CN
            </CustomImageFallback>
          </CustomImage>
        </figure>
        <CardContent className="px-4 py-2">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg group-hover:text-green-600">
                <Link
                  href={`${siteConfig.proxy.product}/${product.id}`}
                  className="capitalize line-clamp-2"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>

              <p className="text-lg font-semibold uppercase">{product.price}</p>
            </div>
          </div>
          <RatingGroup
            readonly
            ratingSteps={5}
            defaultValue="1"
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
            <div className="hidden lg:grid">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black border border-transparent hover:border-green-400"
              >
                <HeartIcon className="size-4" />
              </Button>
              <QuickViewProduct {...product} />
            </div>
          </div>
        </CardContent>
        {/* <CardFooter className="p-0 border-t">
        <Button variant="ghost" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </CardFooter> */}
      </div>
    </Card>
  );
}
