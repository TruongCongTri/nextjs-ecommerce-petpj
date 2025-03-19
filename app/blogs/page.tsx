import React, { Suspense } from "react";

import FilterBlogsList from "@/components/lists/FilterBlogsList";
import BlogsFilterHeader from "@/components/forms/blogs/BlogsFilterHeader";
import BlogsPagination from "@/components/forms/blogs/BlogsPagination";
import BlogsFilterForm from "@/components/forms/blogs/BlogsFilterForm";
import GalleryList from "@/components/lists/GalleryList";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/icons/loading-icon";
import { Skeleton } from "@/components/ui/skeleton";
import RecentlyAddedNewsList from "@/components/lists/RecentlyAddedNewsList";
import { fetchPosts } from "@/apis/fetchAPI/post";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE_BLOG,
  DEFAULT_SORT,
} from "@/commons/filterValidation";
import { filterPosts } from "@/utils/filterFunction";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    cate = "",
    tag = "",
    query = "",
    sort = `${DEFAULT_SORT}`,
    page = `${DEFAULT_PAGE}`,
    perPage = `${DEFAULT_PER_PAGE_BLOG}`,
  } = await searchParams;

  const skip = (parseInt(page.toString()) - 1) * parseInt(perPage.toString());
  const limit = parseInt(perPage.toString());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const order = sort.toString();
  // get all data
  const allData = await fetchPosts();
  // get data each page
  const data = await fetchPosts(skip, limit);

  const postsAfterFilter = filterPosts(
    data.posts,
    cate,
    tag,
    query.toString()
  );
  const allPostsAfterFilter = filterPosts(
    allData.posts,
    cate,
    tag,
    query.toString()
  );

  return (
    <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 ">
      <div className="flex gap-6">
        <div className="hidden lg:grid lg:basis-2/5 space-y-6 h-full">
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <BlogsFilterForm />
          </Suspense>
          <Separator />
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <GalleryList />
          </Suspense>
          <Separator />
          <Suspense
            fallback={
              <div className="w-[400px] h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <RecentlyAddedNewsList />
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
            <BlogsFilterHeader numberOfPosts={allPostsAfterFilter.length} />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <FilterBlogsList posts={postsAfterFilter} />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-20 flex justify-center items-center ">
                <LoadingSpinner className="text-primary/50" />
              </div>
            }
          >
            <BlogsPagination numberOfPosts={data.total} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
