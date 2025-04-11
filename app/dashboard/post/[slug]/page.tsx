import NotFoundLayout from "@/components/layouts/not-found-layout";
import { getSinglePost } from "@/lib/actions";
import readingDuration from "@/lib/reading-duration";
import React from "react";
import PostReadingProgress from "@/components/reader/PostReadingProgress";
import PostHeader from "@/components/reader/PostHeader";
import PostSharing from "@/components/reader/PostSharing";
import PostContent from "@/components/reader/PostContent";
import TiptapRenderer from "@/components/tiptapRender/TiptapRender";
import PostToc from "@/components/reader/PostToc";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Edit } from "lucide-react";

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fetchPost = await getSinglePost(slug);

  if (!fetchPost.success || !fetchPost.data) {
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
      <div className="sticky top-30 overflow-auto ">
        <div className="flex flex-col gap-2">
          <Button size="sm" className="w-fit" asChild>
            <Link
              href={`${siteConfig.dashboard.editPost}/${fetchPost.data.slug}`}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </div>
      <article className="flex flex-col items-center ">
        <div className="lg:mr-12 lg:group-has-[[data-collapsible=icon]]/sidebar-wrapper:mr-2">
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
      </article>
    </Container>
  );
}
