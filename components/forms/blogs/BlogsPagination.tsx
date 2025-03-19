"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { PaginationWithLinks } from "@/components/ui/customize/pagination-with-links";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE_BLOG,
} from "@/commons/filterValidation";

// 3 card
export default function BlogsPagination({
  numberOfPosts,
}: {
  numberOfPosts: number;
}) {
  const searchParams = useSearchParams();
  //numberOfProds={data.total}
  const currentPageParam = searchParams.get("page") || `${DEFAULT_PAGE}`;
  const perPageParam =
    searchParams.get("perPage") || `${DEFAULT_PER_PAGE_BLOG}`;

  return (
    <div className="mt-8">
      <PaginationWithLinks
        page={parseInt(currentPageParam)}
        pageSize={parseInt(perPageParam)}
        totalCount={numberOfPosts}
      />
    </div>
  );
}
