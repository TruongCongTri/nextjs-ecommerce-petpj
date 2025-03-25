import Link from "next/link";

import { IProductType } from "@/models/products";
import { siteConfig } from "@/data/site";

import { Card, CardContent } from "@/components/ui/card";
import { RatingGroup } from "@/components/ui/customize/custom-rating";
import QuickViewProduct from "@/components/layouts/products/QuickReview";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddToCartButton from "../buttons/AddToCartButton";
import AddToFavButton from "../buttons/AddToFavButton";

export default function ProductCard(product: IProductType) {

  
  return (
    <Card className="lg:w-[240px] w-[190px] group relative space-y-4 overflow-hidden ">
      <div className="group-hover:border-green-400 border border-gray-300 rounded-xl">
        <figure>
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
          <QuickViewProduct product={product} />
          <AddToCartButton product={product} qtt={1} />
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

          <AddToFavButton product={product} qtt={1} />
        </CardContent>
      </div>
    </Card>
  );
}
