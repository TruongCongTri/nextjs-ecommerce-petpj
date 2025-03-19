import { LoadingSpinner } from "@/components/icons/loading-icon";
import BannerList from "@/components/lists/BannerList";
import PopularCategoriesList from "@/components/lists/CategoriesList";

import { CustomerReviewsList } from "@/components/lists/CustomerReviewsList";

import FeatureProductsList from "@/components/lists/FeatureProductsList";
import HotDealsList from "@/components/lists/HotDealsList";
import NewsList from "@/components/lists/NewsList";
import PolicyList from "@/components/lists/PolicyList";
import PopularProductsList from "@/components/lists/PopularProductsList";
import PromoFullSizeList from "@/components/lists/PromoFullSizeList";
import PromoList from "@/components/lists/PromoList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-6 space-y-6">
        <Suspense
          fallback={
            <div>
              <div className="hidden lg:gap-2 lg:grid lg:grid-cols-3 lg:grid-rows-2">
                <div className="col-span-2 row-span-2">
                  {/* <LoadingSpinner /> */}
                  <Skeleton className="lg:w-[808px] lg:h-[461px] w-[670px] group relative space-y-4 overflow-hidden rounded-xl " />
                </div>
                <div className="col-start-3">
                  <Skeleton className="w-full h-full group relative space-y-4 overflow-hidden rounded-xl" />
                </div>
                <div className="col-start-3">
                  <Skeleton className="w-full h-full group relative space-y-4 overflow-hidden rounded-xl" />
                </div>
              </div>
              <div className="lg:hidden">
                <Skeleton className="w-full h-[215px] group relative space-y-4 overflow-hidden rounded-xl" />
              </div>
            </div>
          }
        >
          <BannerList />
        </Suspense>

        <Suspense
          fallback={
            <div className="h-20 flex justify-center items-center">
              <LoadingSpinner className="text-primary/50" />
            </div>
          }
        >
          <PolicyList />
        </Suspense>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-[60px] space-y-[60px]">
        <Suspense
          fallback={
            <div className="flex flex-col lg:gap-6 gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-[200px]" />
              </div>
              <div className="grid grid-cols-3 gap-1 lg:grid-cols-6 ">
                <Skeleton className="lg:w-[200px] w-[127px] lg:h-[224px] h-[170px]" />
                <Skeleton className="lg:w-[200px] w-[127px] lg:h-[224px] h-[170px] " />
                <Skeleton className="lg:w-[200px] w-[127px] lg:h-[224px] h-[170px] " />
                <Skeleton className="lg:w-[200px] w-[127px] lg:h-[224px] h-[170px] " />
                <Skeleton className="lg:w-[200px] w-[127px] lg:h-[224px] h-[170px] " />
                <Skeleton className="lg:w-[200px] w-[127px] lg:h-[224px] h-[170px] " />
              </div>
            </div>
          }
        >
          <PopularCategoriesList />
        </Suspense>
        <Suspense
          fallback={
            <div className="flex flex-col lg:gap-6 gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-[200px]" />
              </div>
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-1">
                <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px]" />
                <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
                <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
                <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
                <Skeleton className="lg:w-[240px] w-[190px] lg:h-[336px] h-[286px] " />
              </div>
            </div>
          }
        >
          <PopularProductsList />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-20 flex justify-center items-center">
              <LoadingSpinner className="text-primary/50" />
            </div>
          }
        >
          <PromoList />
        </Suspense>
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
            <HotDealsList />
          </Suspense>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-[60px] space-y-[60px]">
        <Suspense
          fallback={
            <div className="h-20 flex justify-center items-center">
              <LoadingSpinner className="text-primary/50" />
            </div>
          }
        >
          <PromoFullSizeList />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-20 flex justify-center items-center">
              <LoadingSpinner className="text-primary/50" />
            </div>
          }
        >
          <FeatureProductsList />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-20 flex justify-center items-center">
              <LoadingSpinner className="text-primary/50" />
            </div>
          }
        >
          <NewsList />
        </Suspense>
      </div>
      <div className=" bg-gray-100 dark:bg-gray-800">
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-[60px]">
        Partners
      </div>
    </div>
  );
}
