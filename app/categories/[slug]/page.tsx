import React, { Suspense } from "react";
import FiltersProductsList from "@/components/lists/FilterProductsList";

import { promosData } from "@/data/data";
import PromoCard from "@/components/cards/promo/PromoCard";
import { Separator } from "@/components/ui/separator";
import SaleProductsList from "@/components/lists/SaleProductsList";
// import { IProductFetch } from "@/models/products";
// import apis from "@/apis";
import ProductsFilterFormWithoutCate from "@/components/forms/products/ProductsFilterFormWithoutCate";
import ProductsFilterHeaderWithoutCate from "@/components/forms/products/ProductsFilterHeaderWithoutCate";
import ProductsPagination from "@/components/forms/products/ProductsPagination";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_RATE,
  DEFAULT_SORT,
  MAX_PRICE,
  MIN_PRICE,
} from "@/commons/filterValidation";
import { filterProductsWithoutCate } from "@/utils/filterFunction";
import { fetchProductsByCate } from "@/apis/fetchAPI/product";
import { LoadingSpinner } from "@/components/icons/loading-icon";
import { Skeleton } from "@/components/ui/skeleton";

// const fetchProducts = async (
//   slug: string,
//   skip?: number,
//   limit?: number,
//   order?: string
// ): Promise<IProductFetch> => {
//   const res = await apis.product.getProductsByCate(slug, limit, skip, order);
//   return res.json();
// };

export default async function CategoryDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const {
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

  // call api get all data
  const allData = await fetchProductsByCate(slug);
  // call api get data each page
  const data = await fetchProductsByCate(slug, skip, limit, order);

  // let prods = data.products.filter(
  //   (o) => o.rating >= parseFloat(rating.toString())
  // );
  // prods = prods.filter(
  //   (o) =>
  //     o.price >= parseFloat(priceStart.toString()) &&
  //     o.price <= parseFloat(priceEnd.toString())
  // );
  // prods = prods.filter((o) => (tag !== "" ? containsAny(tag, o.tags) : o));

  const prodsAfterFilter = filterProductsWithoutCate(
    data.products,
    parseInt(rating.toString()),
    parseFloat(priceStart.toString()),
    parseFloat(priceEnd.toString()),
    tag
  );
  // let allProds = allData.products.filter(
  //   (o) => o.rating >= parseFloat(rating.toString())
  // );
  // allProds = allProds.filter(
  //   (o) =>
  //     o.price >= parseFloat(priceStart.toString()) &&
  //     o.price <= parseFloat(priceEnd.toString())
  // );

  // allProds = allProds.filter((o) =>
  //   tag !== "" ? containsAny(tag, o.tags) : o
  // );

  const allProdsAfterFilter = filterProductsWithoutCate(
    allData.products,
    parseInt(rating.toString()),
    parseFloat(priceStart.toString()),
    parseFloat(priceEnd.toString()),
    tag
  );

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
            <ProductsFilterFormWithoutCate />
          </Suspense>
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <PromoCard {...promosData[0]} />
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
            <ProductsFilterHeaderWithoutCate
              numberOfProds={allProdsAfterFilter.length}
            />
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
              <div className="h-20 flex justify-center items-center">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <ProductsPagination numberOfProds={allProdsAfterFilter.length} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
