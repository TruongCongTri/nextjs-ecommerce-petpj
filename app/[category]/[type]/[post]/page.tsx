import NotFoundLayout from "@/components/layouts/not-found-layout";
import {
  getCategoryByCategorySlug,
  getPostByPostSlugByCateId,
} from "@/lib/actions";
import readingDuration from "@/lib/reading-duration";
import React, { Suspense } from "react";
import PostReadingProgress from "@/components/reader/PostReadingProgress";
import PostHeader from "@/components/reader/PostHeader";
import PostSharing from "@/components/reader/PostSharing";
import PostContent from "@/components/reader/PostContent";
import TiptapRenderer from "@/components/tiptapRender/TiptapRender";
import PostToc from "@/components/reader/PostToc";
import Container from "@/components/layouts/container";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ category: string; type: string; post: string }>;
}) {
  const { category, type, post } = await params;
  const fetchData = await getCategoryByCategorySlug(category);
  if (!fetchData.success) {
    return <NotFoundLayout />;
  }

  const fetchPost = await getPostByPostSlugByCateId(
    post,
    fetchData.data?.id || ""
  );
  if (!fetchPost.success || !fetchPost.data) {
    return <NotFoundLayout />;
  }
  if (fetchPost.data.type !== type.toUpperCase()) {
    return <NotFoundLayout />;
  }

  const readingTime = readingDuration(
    fetchPost.data.content,
    {
      wordsPerMinute: 225,
      emoji: false,
    },
    true
  );
  return (
    <Container>
      <article className="flex flex-col items-center gap-8">
        <Suspense fallback={<p>Loading feed...</p>}>
          <div className="lg:mr-8 lg:group-has-[[data-collapsible=icon]]/sidebar-wrapper:mr-2">
            <PostReadingProgress />
            <PostHeader
              title={fetchPost.data.title}
              author={fetchPost.data.author.firstName || ""}
              createdAt={fetchPost.data.createdAt.toDateString()}
              readingTime={parseInt(`${readingTime}`)}
              cover={"/images/placeholder.svg"}
            />
          </div>
          <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-12">
            <PostSharing />
            <PostContent>
              <TiptapRenderer>{`<span></span>${fetchPost.data.content}`}</TiptapRenderer>
            </PostContent>
            <PostToc />
          </div>
        </Suspense>
      </article>
    </Container>
  );
}
