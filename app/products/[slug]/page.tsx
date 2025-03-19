import ProductDetailLayout from "@/components/layouts/products/Detail";
import React, { Suspense } from "react";
import ProductDetailExtra from "@/components/layouts/products/Extra";
import RelatedProductsList from "@/components/lists/RelatedProductsList";
import { IProductType } from "@/models/products";
import apis from "@/apis";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { DotIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/icons/loading-icon";

const fetchProduct = async (prodId: number): Promise<IProductType> => {
  const data = await apis.product.getProductDetails(prodId);
  return data.json();
};
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await fetchProduct(parseInt(slug));
  const cateSlug = data.category;
  return (
    <div className="container mx-auto px-4 pt-4 pb-10 space-y-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 lg:space-y-20 ">
      {/* <div className="lg:px-4"> */}
      <Suspense
        fallback={
          <div className="grid md:grid-cols-2 gap-8 mx-auto px-2 sm:px-2 lg:px-2">
            <div className="grid grid-cols-5 gap-4 flex items-center gap-2 w-full">
              <div className="hidden md:grid gap-4 h-full">
                <Skeleton className="h-20 w-20" />
                <Skeleton className="h-20 w-20" />
                <Skeleton className="h-20 w-20" />
                <Skeleton className="h-20 w-20" />
                <Skeleton className="h-20 w-20" />
              </div>
              <div className="relative basis-3/4 h-full col-span-5 md:col-span-4 rounded-lg overflow-hidden">
                <Skeleton className="w-[438px] h-[523px]" />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2 py-5">
                <div className="flex gap-4">
                  <Skeleton className="w-10 h-8" />
                  <Skeleton className="w-6 h-6" />
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-10" />
                    <Skeleton className="h-6 w-8" />
                  </div>
                  <DotIcon />
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
              <Separator />
              <div className="grid gap-2 py-5">
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center">
                    <Skeleton className="h-6 w-6" />
                  </div>

                  <div className="flex gap-1 items-center">
                    <Skeleton className="h-6 w-6" />
                  </div>
                </div>
                <Skeleton className="h-20 w-30" />
              </div>
              <Separator />
              <div className="grid gap-4 py-5">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-6" />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 py-5">
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-6" />
                </div>
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ProductDetailLayout {...data} />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-20 flex justify-center items-center">
            <LoadingSpinner className="text-primary/50" />
          </div>
        }
      >
        <ProductDetailExtra {...data} />{" "}
      </Suspense>
      {/* </div> */}
      <Suspense
        fallback={
          <div className="lg:grid lg:grid-cols-4 lg:gap-6">
            <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px]" />
            <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
            <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
            <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
          </div>
        }
      >
        <RelatedProductsList cateSlug={cateSlug} />
      </Suspense>
    </div>
  );
}
