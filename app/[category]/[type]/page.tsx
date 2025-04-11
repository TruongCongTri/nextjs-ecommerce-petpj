import SearchInput from "@/components/inputs/SearchInput";
import React, { Suspense } from "react";
import { Post } from "@/lib/types";
import PostCard from "@/components/cards/PostCard";
import {
  getCategoryByCategorySlug,
  getPostListByCategoryId,
} from "@/lib/actions";
import NotFoundLayout from "@/components/layouts/not-found-layout";
import Container from "@/components/layouts/container";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default async function DocumentsPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; type: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, type } = await params;
  const query = (await searchParams).query;

  const fetchCate = await getCategoryByCategorySlug(category);
  if (!fetchCate.success) {
    return <NotFoundLayout />;
  }
  const fetchPosts = await getPostListByCategoryId(
    fetchCate?.data?.id || "",
    type.toUpperCase(),
    query?.trim() || ""
  );

  if (!fetchPosts.success || !fetchPosts.data) {
    return <NotFoundLayout />;
  }

  // let posts = fetchPosts.data?.filter((o) => {
  //   return o.type === type.toUpperCase();
  // });

  // let posts = fetchPosts.data?.filter((o) => {
  //   if (query !== "") return o.title.includes(query || " ");
  //   else return o;
  // });

  // if (query?.trim() === "") {
  //   posts = posts;
  // } else {
  //   posts = posts.filter((o) => {
  //     if (query !== "") return o.title.includes(query || " ");
  //     else return o;
  //   });
  // }

  return (
    <Container>
      <div className="space-y-10 lg:space-y-20">
        <Suspense fallback={<p>Loading feed...</p>}>
          <SearchInput />

          {fetchPosts.data.length !== 0 ? (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 ">
              {fetchPosts.data.map((o, idx) => (
                <PostCard key={idx} post={o as Post} />
              ))}
            </div>
          ) : (
            <div className="mx-auto">
              <div className="text-center py-10">
                <h3 className="text-xl font-medium">
                  {`There are no posts belong to this topic yet!`}
                </h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  Start to explore other topics that we have
                </p>
                <Link href={`${siteConfig.home}`}>
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Suspense>
        {/* search input */}
        {/* <Card className="bg-muted">
          <CardContent>
            <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4 lg:gap-10">
              <div className="order-2 lg:order-1 space-y-4 lg:space-y-10">
                <div className="capitalize font-medium text-6xl text-primary text-center lg:text-left">
                  {fetchCate.data?.title}
                </div>
                <div className="capitalize font-normal text-xl lg:max-w-[500px]  text-center lg:text-left">
                  {type}
                </div>
              </div>
              <Image
                src={
                  fetchCate.data?.categoryImage
                    ? fetchCate.data.categoryImage
                    : `/images/placeholder.svg`
                }
                width={200}
                height={300}
                alt="listening"
                className="lg:w-[200px] w-[100px] lg:h-[300px] h-[200px] rounded-xl order-1 lg:order-2"
              />
            </div>
          </CardContent>
        </Card> */}

        {/* {postList ? (
        <BlogPostList posts={postList.data as Post[]} />
      ) : (
        <div>empty</div>
      )} */}
      </div>
    </Container>
  );
}
