import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IProductType } from "@/models/products";

import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/ui/customize/custom-carousel";
import { RatingGroup } from "@/components/ui/customize/custom-rating";

import {
  DotIcon,
  ShoppingBagIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import {
  CustomImage,
  CustomImageFallback,
  CustomImageInput,
} from "@/components/ui/customize/custom-image";
import ProductDetailsControl from "./Control";

export default async function ProductDetailLayout(product: IProductType) {
  // const ratings = product.reviews.map((o) => o.rating);
  // console.log(ratings);

  // let sum = 0;
  // // const numbers = [65, 44, 12, 4];
  // ratings.forEach(myFunction);

  // function myFunction(item: number) {
  //   sum += item;
  // }
  // console.log(`sum ${sum}`);

  return (
    <div className="grid md:grid-cols-2 gap-8 mx-auto px-2 sm:px-2 lg:px-2">
      {/* <div className="grid gap-2"> */}
      <Carousel
        orientation="vertical"
        // className="flex items-center gap-2 w-full"
        className="grid grid-cols-5 gap-4 flex items-center gap-2 w-full"
      >
        <div className="grid gap-4 h-full">
          <CarouselPrevious className="left-11" />
          <CarouselThumbsContainer className="py-8 h-60 basis-1/4">
            {product.images.map((o, index) => (
              <SliderThumbItem
                key={index}
                index={index}
                className="rounded-md bg-transparent"
              >
                <span className="border border-muted flex items-center justify-center h-full w-full rounded-md cursor-pointer bg-background">
                  <Image
                    src={o ? o : "/public/images/placeholder.svg"}
                    alt={product.title}
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </span>
              </SliderThumbItem>
            ))}
          </CarouselThumbsContainer>
          <CarouselNext className="left-11" />
        </div>
        <div className="relative basis-3/4 h-full col-span-5 md:col-span-4 rounded-lg overflow-hidden">
          <CarouselMainContainer className="h-full">
            {product.images.map((o, idx) => (
              <SliderMainItem
                key={idx}
                className="border border-muted flex items-center justify-center h-52 rounded-md"
              >
                <Image
                  src={o ? o : "/public/images/placeholder.svg"}
                  alt={product.title}
                  quality={100}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />

                {/* slice {idx+1} */}
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
        </div>
      </Carousel>
      {/* </div> */}
      <div className="grid gap-2">
        <div className="grid gap-3 py-6">
          <div className="flex gap-4">
            <h1 className="text-4xl font-semibold">{product.title}</h1>
            <Badge variant="secondary" className="capitalize">
              {product.availabilityStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <RatingGroup
                readonly
                ratingSteps={5}
                value={`${product.rating}`}
                // defaultValue="5"
                className="size-3 "
              />
              <div className="normal-case font-normal text-sm text-muted-foreground">
                {product.reviews.length} reviews
              </div>
            </div>
            <DotIcon className="text-muted-foreground" />
            <div className="flex gap-1">
              <div className="uppercase font-medium text-sm ">SKU:</div>
              <div className="uppercase font-normal text-sm text-muted-foreground">
                {product.sku}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="flex items-center gap-1">
              {product.discountPercentage ? (
                <>
                  <span className="text-muted-foreground text-xl font-normal line-through uppercase">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </span>
                  <span className="text-2xl font-medium text-primary uppercase">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      (product.price * (100 - product.discountPercentage)) / 100
                    )}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold uppercase">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}{" "}
                </span>
              )}
            </div>
            <Badge variant="destructive" className="normal-case rounded-full">
              {product.discountPercentage}% Off
            </Badge>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 py-6">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <div className="capitalize text-sm font-normal flex gap-2 items-center">
                Brand:{" "}
                {product.brand ? (
                  product.brand
                ) : (
                  <CustomImage className="aspect-square w-full rounded-xl max-w-[56px] max-h-[56px]">
                    <CustomImageInput src="" />
                    <CustomImageFallback className="rounded-xl">
                      CN
                    </CustomImageFallback>
                  </CustomImage>
                )}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="normal-case text-sm font-normal">Share item:</div>
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-100 rounded-full border border-transparent 
            dark:text-white dark:bg-muted
            hover:text-white hover:bg-primary hover:border-primary 
            dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary "
                >
                  <FacebookIcon className="size-10 " />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-100 rounded-full border border-transparent 
                  dark:text-white dark:bg-muted
                  hover:text-white hover:bg-primary hover:border-primary 
                  dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary "
                >
                  <TwitterIcon className="size-10 " />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-100 rounded-full border border-transparent 
                  dark:text-white dark:bg-muted
                  hover:text-white hover:bg-primary hover:border-primary 
                  dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary "
                >
                  <InstagramIcon className="size-10 " />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-100 rounded-full border border-transparent 
                  dark:text-white dark:bg-muted
                  hover:text-white hover:bg-primary hover:border-primary 
                  dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary "
                >
                  <ShoppingBagIcon className="size-10" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground normal-case text-sm font-normal">
            {product.description}
          </p>
        </div>
        <Separator />
        <div className="grid gap-4 py-6">
          {/* <div className="flex items-center gap-4">
            {product.availabilityStatus === "Out of Stock" ? (
              <div className="flex items-center justify-center border rounded-full w-30 gap-1 px-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
                  disabled={true}
                >
                  <Minus className="w-4 h-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input 
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  className="w-4 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={true}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
                  disabled={true}
                >
                  <Plus className="w-4 h-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center border rounded-full w-30 gap-1 px-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  className="w-10 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            )}
            {product.availabilityStatus === "Out of Stock" ? (
              <Button
                size="lg"
                className="normal-case border border-primary hover:border-primary/90 w-full rounded-full"
                disabled={true}
              >
                Out of stock <X className="size-10" />
              </Button>
            ) : (
              <Button
                size="lg"
                className="normal-case border border-primary hover:border-primary/90 w-full rounded-full"
              >
                Add to Cart <ShoppingBagIcon className="size-10" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="p-5 bg-gray-100 rounded-full border border-gray-100 
                  dark:text-white dark:bg-muted
                  hover:text-white hover:bg-primary hover:border-primary 
                  dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary "
            >
              <HeartIcon className="size-10" />
            </Button>
          </div> */}
          <ProductDetailsControl product={product} />
        </div>
        <Separator />
        <div className="grid gap-4 py-6">
          <div className="flex items-center gap-1">
            <div className="capitalize text-sm font-medium">Category: </div>
            <Link
              href={`${siteConfig.proxy.shop}/${product.category}`}
              className="text-sm font-normal capitalize text-gray-400 hover:underline hover:text-gray-900 hover:dark:text-white"
            >
              {product.category}
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <div className="capitalize text-sm font-medium">Tag: </div>
            {product.tags.map((o, idx) => (
              <div
                key={idx}
                className="text-sm font-normal capitalize text-gray-400 hover:underline hover:text-gray-900 hover:dark:text-white"
              >
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
