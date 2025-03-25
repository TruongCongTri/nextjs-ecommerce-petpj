import React, { Suspense } from "react";
import ProductsFilterHeader from "@/components/forms/products/ProductsFilterHeader";
import FiltersProductsList from "@/components/lists/FilterProductsList";
import ProductsPagination from "@/components/forms/products/ProductsPagination";

import PromoCard from "@/components/cards/promo/PromoCard";
import ProductsFilterForm from "@/components/forms/products/ProductsFilterForm";
import { Separator } from "@/components/ui/separator";
import SaleProductsList from "@/components/lists/SaleProductsList";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_RATE,
  DEFAULT_SORT,
  MAX_PRICE,
  MIN_PRICE,
} from "@/commons/filterValidation";
import { filterProducts } from "@/utils/filterFunction";
import { fetchProducts } from "@/apis/fetchAPI/product";
import { LoadingSpinner } from "@/components/icons/loading-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { IPromoFetch } from "@/models/promos";
import apis from "@/apis";

const fetchPromos = async (): Promise<IPromoFetch> => {
  const data = await apis.promo.getPromos();
  return data.json();
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    cate = "",
    tag = "",
    priceStart = `${MIN_PRICE}`,
    priceEnd = `${MAX_PRICE}`,
    rating = `${DEFAULT_RATE}`,
    sort = `${DEFAULT_SORT}`,
    page = `${DEFAULT_PAGE}`,
    perPage = `${DEFAULT_PER_PAGE}`,
  } = await searchParams;

  const skip = (parseInt(page.toString()) - 1) * parseInt(perPage.toString());
  const limit = parseInt(perPage.toString());
  const order = sort.toString();

  // get all data
  const allData = await fetchProducts();
  // get data each page
  const data = await fetchProducts(skip, limit, order);

  const prodsAfterFilter = filterProducts(
    data.products,
    cate,
    parseInt(rating.toString()),
    parseFloat(priceStart.toString()),
    parseFloat(priceEnd.toString()),
    tag
  );

  const allProdsAfterFilter = filterProducts(
    allData.products,
    cate,
    parseInt(rating.toString()),
    parseFloat(priceStart.toString()),
    parseFloat(priceEnd.toString()),
    tag
  );

  const promoData = await fetchPromos();

  let i = 0;
  const singlePromo = promoData.promotions.filter((o) => {
    if (i <= 3) {
      if (o.size === "medium") {
        i++;
        return o;
      }
    }
  });
  return (
    <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 ">
      <div className="flex gap-6">
        <div className="hidden lg:grid lg:basis-2/5 space-y-6 w-full">
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <ProductsFilterForm />
          </Suspense>
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <PromoCard {...singlePromo[0]} />
          </Suspense>
          <Separator />
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <SaleProductsList />
          </Suspense>
        </div>
        <div className="basis-full lg:basis-4/5 gap-2 lg:gap-6 space-y-6">
          <Suspense
            fallback={
              <div className="lg:flex lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-[250px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-[120px]" />
                </div>
              </div>
            }
          >
            <ProductsFilterHeader numberOfProds={allProdsAfterFilter.length} />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-20 flex justify-center items-center">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <FiltersProductsList products={prodsAfterFilter} />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <ProductsPagination numberOfProds={data.total} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
