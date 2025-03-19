"use client";

import React from "react";
import {  useRouter, useSearchParams } from "next/navigation";
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
import BlogsFilterForm from "./BlogsFilterForm";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE_BLOG } from "@/commons/filterValidation";

export default function BlogsFilterHeader({
  numberOfPosts,
}: {
  numberOfPosts: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const catesParam = searchParams.getAll("cate") || "";
  const tagParams = searchParams.getAll("tag") || "";
  const queryParam = searchParams.get("query") || "";

  const sortParam = searchParams.get("sort") || "default";
  // const currentPageParam = searchParams.get("page") || "1";
  // const perPageParam = searchParams.get("perPage") || "5";

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
    let cateParamsList = "";
    catesParam.map((o, idx) => {
      if (idx + 1 === catesParam.length) {
        cateParamsList += `cate=${o}`;
      } else {
        cateParamsList += `cate=${o}&`;
      }
    });
    let tagParamsList = "";
    tagParams.map((o, idx) => {
      if (idx + 1 === tagParams.length) {
        tagParamsList += `tag=${o}`;
      } else {
        tagParamsList += `tag=${o}&`;
      }
    });

    router.push(
      `${siteConfig.proxy.blog}?${cateParamsList}&${tagParamsList}&query=${queryParam}&sort=${e}&page=${DEFAULT_PAGE}&perPage=${DEFAULT_PER_PAGE_BLOG}`
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
          <DrawerContent>
            <VisuallyHidden.Root>
              <DrawerTitle>Filter</DrawerTitle>
            </VisuallyHidden.Root>
            <div className="px-4">
              <BlogsFilterForm />
            </div>
            <div className="px-4">
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
              <SelectItem value="asc">Latest</SelectItem>
              <SelectItem value="desc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>{numberOfPosts}</div>
        <div className="capitalize">Results Found</div>
      </div>
    </div>
  );
}
