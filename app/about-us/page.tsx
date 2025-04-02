import React, { Suspense } from "react";
import Image from "next/image";
import { LoadingSpinner } from "@/components/icons/loading-icon";
import { CustomerReviewsList } from "@/components/lists/CustomerReviewsList";
import {
  Check,
  Headset,
  Leaf,
  MoveRightIcon,
  Package,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeList } from "@/components/lists/EmployeeList";
import Link from "next/link";
import { siteConfig } from "@/data/site";
export default function AboutUsPage() {
  return (
    <>
      <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:py-8 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:flex-row lg:gap-[58px] gap-4">
          <div className="flex flex-col justify-center gap-8">
            <div className="text-4xl lg:text-6xl font-semibold lg:max-w-[600px] text-center lg:text-left">
              100% Trusted Organic Food Store
            </div>
            <div className="font-normal text-lg text-muted-foreground">
              Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi,
              laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit.
              Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan.
              Donec a eros non massa vulputate ornare. Vivamus ornare commodo
              ante, at commodo felis congue vitae.
            </div>
          </div>
          <Image
            width={500}
            height={300}
            alt="about-01"
            src={`/images/placeholder.svg`}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-[58px] px-4 lg:px-0 gap-4">
        <Image
          width={700}
          height={300}
          alt="about-01"
          src={`/images/placeholder.svg`}
          className="order-2 lg:order-1"
        />

        <div className="flex flex-col justify-center gap-8 order-1 lg:order-2  pb-10 ">
          <div className="text-4xl lg:text-6xl font-semibold lg:max-w-[600px] text-center lg:text-left">
            100% Trusted Organic Food Store
          </div>
          <div className="font-normal text-lg text-muted-foreground lg:max-w-[500px]">
            Pellentesque a ante vulputate leo porttitor luctus sed eget eros.
            Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a
            mi. Nulla eu eros consequat tortor tincidunt feugiat.
          </div>
          <div className="flex gap-6 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Leaf className="size-10 text-primary" />
                </div>
                <div>
                  <div className="capitalize font-medium text-lg">
                    100% Organic food
                  </div>
                  <div className="capitalize font-normal text-sm text-muted-foreground">
                    100% healthy & Fresh food.
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Star className="size-10 text-primary" />
                </div>
                <div>
                  <div className="capitalize font-medium text-lg">
                    Customer Feedback
                  </div>
                  <div className="capitalize font-normal text-sm text-muted-foreground">
                    Our happy customer
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Truck className="size-10 text-primary" />
                </div>
                <div>
                  <div className="capitalize font-medium text-lg">
                    Free Shipping
                  </div>
                  <div className="capitalize font-normal text-sm text-muted-foreground">
                    Free shipping with discount
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Headset className="size-10 text-primary" />
                </div>
                <div>
                  <div className="capitalize font-medium text-lg">
                    100% Organic food
                  </div>
                  <div className="capitalize font-normal text-sm text-muted-foreground">
                    100% healthy & Fresh food.
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <ShoppingBag className="size-10 text-primary" />
                </div>
                <div>
                  <div className="capitalize font-medium text-lg">
                    Customer Feedback
                  </div>
                  <div className="capitalize font-normal text-sm text-muted-foreground">
                    Our happy customer
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Package className="size-10 text-primary" />
                </div>
                <div>
                  <div className="capitalize font-medium text-lg">
                    Free Shipping
                  </div>
                  <div className="capitalize font-normal text-sm text-muted-foreground">
                    Free shipping with discount
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:py-8 flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:flex-row lg:gap-[58px] gap-4">
          <div className="flex flex-col justify-center gap-8 ">
            <div className="text-4xl lg:text-6xl font-semibold lg:max-w-[600px] text-center lg:text-left">
              We Delivered, You Enjoy Your Order.
            </div>
            <div className="font-normal text-lg text-muted-foreground lg:max-w-[500px]">
              Ut suscipit egestas suscipit. Sed posuere pellentesque nunc,
              ultrices consectetur velit dapibus eu. Mauris sollicitudin
              dignissim diam, ac mattis eros accumsan rhoncus. Curabitur auctor
              bibendum nunc eget elementum.
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full p-1 bg-primary/10">
                  <Check className="text-primary size-3" />
                </div>
                <div className="font-normal text-sm text-muted-foreground">
                  Sed in metus pellentesque.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full p-1 bg-primary/10">
                  <Check className="text-primary size-3" />
                </div>
                <div className="font-normal text-sm text-muted-foreground">
                  Fusce et ex commodo, aliquam nulla efficitur, tempus lorem.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full p-1 bg-primary/10">
                  <Check className="text-primary size-3" />
                </div>
                <div className="font-normal text-sm text-muted-foreground">
                  Maecenas ut nunc fringilla erat varius.
                </div>
              </div>
            </div>
            <Link href={siteConfig.proxy.shop}>
              <Button className="w-[150px] rounded-full" size="lg">
                Shop now <MoveRightIcon />
              </Button>
            </Link>
          </div>
          <Image
            width={500}
            height={300}
            alt="about-01"
            src={`/images/placeholder.svg`}
          />
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-[60px]">
          <Suspense
            fallback={
              <div className="h-20 flex justify-center items-center">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <EmployeeList />
          </Suspense>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-[60px]">
          <Suspense
            fallback={
              <div className="h-20 flex justify-center items-center">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <CustomerReviewsList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
