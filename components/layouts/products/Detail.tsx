import { JSX, SVGProps } from "react";
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
        <div className="hidden md:grid gap-4 h-full">
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
              <div className="capitalize text-sm font-normal">
                Brand: {product.brand}
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="normal-case text-sm font-normal">Share item:</div>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-full dark:text-black 
            group-hover:text-green-400 border border-transparent group-hover:border-green-400"
              >
                <FacebookIcon className="size-10 " />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-full dark:text-black 
            group-hover:text-green-400 border border-transparent group-hover:border-green-400"
              >
                <TwitterIcon className="size-10 " />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-full dark:text-black 
            group-hover:text-green-400 border border-transparent group-hover:border-green-400"
              >
                <InstagramIcon className="size-10 " />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-full dark:text-black 
            group-hover:text-green-400 border border-transparent group-hover:border-green-400"
              >
                <ShoppingBagIcon className="size-10" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground normal-case text-sm font-normal">
            {product.description}
          </p>
        </div>
        <Separator />
        <div className="grid gap-4 py-6">
          <div className="flex items-center gap-4">
            {product.availabilityStatus === "Out of Stock" ? (
              <Button size="lg" className="normal-case">
                Out of stock <ShoppingBagIcon className="size-10" />
              </Button>
            ) : (
              <Button size="lg" className="normal-case">
                Add to Cart <ShoppingBagIcon className="size-10" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="bg-gray-100 rounded-full dark:text-black 
            group-hover:text-green-400 border border-transparent group-hover:border-green-400"
            >
              <HeartIcon className="size-10" />
            </Button>
          </div>
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

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
