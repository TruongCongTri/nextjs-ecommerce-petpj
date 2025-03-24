import Link from "next/link";

import { IProductType } from "@/models/products";
import { siteConfig } from "@/data/site";

import { Card, CardContent } from "@/components/ui/card";
import { RatingGroup } from "@/components/ui/customize/custom-rating";
import QuickViewProduct from "@/components/layouts/products/QuickReview";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddToFavButton from "../buttons/AddToFavButton";
import AddToCartButtonLarge from "../buttons/AddToCartButtonLarge";

export default function LargeProductCard(product: IProductType) {
  return (
    <Card className="lg:w-[480px] w-[380px] h-full group relative space-y-4 overflow-hidden ">
      <div className="h-full group-hover:border-primary border border-gray-300 rounded-xl">
        {/* relative lg:w-[480px] w-[380px] lg:h-[480px] h-[380px] */}
        <figure className="">
          <Image
            src={`${
              product.thumbnail ? product.thumbnail : "/images/placeholder.svg"
            }`}
            alt={product.title}
            width={480}
            height={480}
            className=" w-full aspect-square rounded-t-xl"
          />
        </figure>

        <CardContent className="px-4 py-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-base font-normal group-hover:text-green-600">
              <Link
                href={`${siteConfig.proxy.product}/${product.id}`}
                className="capitalize line-clamp-1"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </div>

            <p className="text-xl font-semibold uppercase">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </p>

            <div className="flex items-center gap-2">
              <RatingGroup
                readonly
                ratingSteps={5}
                // defaultValue="1"
                value={product.rating.toString()}
                className="size-3 "
              />
              <div className="font-normal text-xs text-muted-foreground">
                {" "}
                (524 Feedback)
              </div>
            </div>
          </div>

          <div className="">
            {/* <Button
              variant="ghost"
              size="icon"
              className="p-[10px] absolute opacity-0 bg-white  
          border border-transparent rounded-full 
          group-hover:opacity-100 group-hover:border-gray-200
          hover:border-primary hover:bg-primary hover:text-white
          dark:text-black top-2/3 -right-2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <EyeIcon className="size-4" />
            </Button> */}
            <QuickViewProduct product={product} isLarge={true} />
            <AddToCartButtonLarge product={product} qtt={1} />
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

          <AddToFavButton product={product} qtt={1} isLarge={true} />
        </CardContent>
      </div>
    </Card>
  );
}
