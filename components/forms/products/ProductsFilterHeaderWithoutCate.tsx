"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/data/site";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import ProductsFilterForm from "./ProductsFilterForm";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_RATE,
  DEFAULT_SORT,
  MAX_PRICE,
  MIN_PRICE,
} from "@/commons/filterValidation";

export default function ProductsFilterHeader({
  numberOfProds,
}: {
  numberOfProds: number;
}) {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const searchParams = useSearchParams();
  // const pathname = usePathname();

  const ratingParam = searchParams.get("rating") || DEFAULT_RATE;
  const priceStartParam = searchParams.get("priceStart") || `${MIN_PRICE}`;
  const priceEndParam = searchParams.get("priceEnd") || `${MAX_PRICE}`;
  const tagParams = searchParams.getAll("tag") || "";

  const sortParam = searchParams.get("sort") || DEFAULT_SORT;
  // const currentPageParam = searchParams.get("page") || `${DEFAULT_PAGE}`;
  // const perPageParam = searchParams.get("perPage") || `${DEFAULT_PER_PAGE}`;

  // const handleValue = useCallback(
  //   (newSort: string) => {
  //     const key = "sort";
  //     const newSearchParams = new URLSearchParams(searchParams || undefined);
  //     newSearchParams.set(key, String(newSort));
  //     newSearchParams.delete("page"); // Clear the page number when changing page size
  //     router.push(`${pathname}?${newSearchParams.toString()}`);
  //   },
  //   [searchParams, pathname]
  // );

  const handleValue = (e: string) => {
    let tagParamsList = "";
    tagParams.map((o, idx) => {
      if (idx + 1 === tagParams.length) {
        tagParamsList += `tag=${o}`;
      } else {
        tagParamsList += `tag=${o}&`;
      }
    });

    router.push(
      `${siteConfig.proxy.shop}/${slug}?rating=${ratingParam}&priceStart=${priceStartParam}&priceEnd=${priceEndParam}&${tagParamsList}&sort=${e}&page=${DEFAULT_PAGE}&perPage=${DEFAULT_PER_PAGE}`
    );
  };

  return (
    <div className="lg:flex lg:justify-between lg:items-center space-y-4 lg:space-y-0">
      <div className="flex justify-between">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <SlidersHorizontalIcon className="h-6 w-6" />
              <span className="sr-only">Toggle filter menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="space-y-4 max-h-[600px] py-4">
            <VisuallyHidden.Root>
              <DrawerTitle>Filter</DrawerTitle>
            </VisuallyHidden.Root>
            <div className="px-4">
              <ProductsFilterForm />
            </div>
            <div className="px-8">
              <DrawerClose asChild>
                <Button className="w-full" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="flex items-center gap-2">
          <div className="hidden lg:grid capitalize">Sort by:</div>
          {/* <Select onValueChange={(e) => handleValue(e)} defaultValue={sortParam}> */}
          <Select
            onValueChange={(e) => handleValue(e)}
            defaultValue={sortParam}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low Price</SelectItem>
              <SelectItem value="desc">High Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>{numberOfProds}</div>
        <div className="capitalize">Results Found</div>
      </div>
    </div>
  );
}
