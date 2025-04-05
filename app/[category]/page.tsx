import SearchInput from "@/components/inputs/SearchInput";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/lib/types";
import PostCard from "@/components/cards/PostCard";
import { getCategoryByCategorySlug, getPostListByCategoryId } from "@/lib/actions";
import NotFoundLayout from "@/components/layouts/not-found-layout";
import Container from "@/components/layouts/container";

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category } = await params;
  const query = (await searchParams).query;

  const fetchCate = await getCategoryByCategorySlug(category);
  if (!fetchCate.success) {
    return <NotFoundLayout />;
  }
  const fetchPosts = await getPostListByCategoryId(fetchCate?.data?.id || "");

  if (!fetchPosts.success) {
    return <NotFoundLayout />;
  }

  fetchPosts.data?.filter((o) => {
    if (query !== "") return o.title.includes(query || " ");
    else return o;
  });

  return (
    <Container>
      <div className="space-y-10 lg:space-y-20">
        {/* search input */}
        <Card className="bg-muted">
          <CardContent>
            <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4 lg:gap-10">
              <div className="order-2 lg:order-1 space-y-4 lg:space-y-10">
                <div className="capitalize font-medium text-6xl text-primary text-center lg:text-left">
                  {fetchCate.data?.title}
                </div>
                <div className="font-normal text-xl lg:max-w-[500px]  text-center lg:text-left">
                  Our digital marketing agency helps businesses grow and succeed
                  online through a range of services including SEO, PPC, social
                  media marketing, and content creation.
                </div>
              </div>
              <Image
                src={
                  fetchCate.data?.categoryImage
                    ? fetchCate.data.categoryImage
                    : `/images/placeholder.svg`
                }
                width={300}
                height={300}
                alt="listening"
                className="lg:max-w-[300px] max-w-[200px] rounded-xl order-1 lg:order-2"
              />
            </div>
          </CardContent>
        </Card>
        <SearchInput />
        {/* {postList ? (
        <BlogPostList posts={postList.data as Post[]} />
      ) : (
        <div>empty</div>
      )} */}

        {fetchPosts.data?.length !== 0 ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 ">
            {fetchPosts.data?.map((o, idx) => (
              <PostCard key={idx} post={o as Post} />
            ))}
          </div>
        ) : (
          <div>empty</div>
        )}
      </div>
    </Container>
  );
}
