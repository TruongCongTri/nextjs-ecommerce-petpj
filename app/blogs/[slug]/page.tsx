import BlogsFilterForm from "@/components/forms/blogs/BlogsFilterForm";
import GalleryList from "@/components/lists/GalleryList";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoadingSpinner } from "@/components/icons/loading-icon";
import RecentlyAddedNewsList from "@/components/lists/RecentlyAddedNewsList";
import Detail from "@/components/layouts/posts/Detail";
import { IPostType } from "@/models/posts";
import apis from "@/apis";
import CommentForm from "@/components/forms/CommentForm";
import CommentList from "@/components/lists/CommentList";

const fetchPost = async (postId: number): Promise<IPostType> => {
  const data = await apis.post.getPostDetails(postId);
  return data.json();
};

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await fetchPost(parseInt(slug));

  return (
    <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 ">
      <div className="flex gap-12">
        <div className="basis-full lg:basis-4/5 gap-2 lg:gap-6 space-y-10">
          <Detail post={data} />
          <div className="flex flex-col gap-6">
            <div className="font-medium text-2xl">Leave a Comment</div>
            <CommentForm />
          </div>
          <CommentList post={data} />
        </div>
        <div className="hidden lg:grid lg:basis-2/5 space-y-6 h-full ">
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
        <div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <SlidersHorizontalIcon className="h-6 w-6" />
                <span className="sr-only">Toggle filter menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <VisuallyHidden>
                <DrawerTitle>Filter</DrawerTitle>
              </VisuallyHidden>
              <div className="px-4">
                <Suspense
                  fallback={
                    <div className="h-20 flex justify-center items-center ">
                      <LoadingSpinner className="text-primary/50" />
                    </div>
                  }
                >
                  <BlogsFilterForm />
                </Suspense>
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
        </div>
      </div>
    </div>
  );
}
