import Container from "@/components/layouts/container";
import NotFoundLayout from "@/components/layouts/not-found-layout";
import {
  getCategoryByCategorySlug,
  getPostByPostSlugByCateId,
} from "@/lib/actions";
import React from "react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; post: string }>;
}) {
  const { category, post } = await params;
  const fetchData = await getCategoryByCategorySlug(category);
  if (!fetchData.success) {
    return <NotFoundLayout />;
  }
  
  const fetchPost = await getPostByPostSlugByCateId(
    post,
    fetchData.data?.id || ""
  );
  if (!fetchPost.success) {
    return <NotFoundLayout />;
  }
  return <Container>{fetchPost?.data?.title} test</Container>;
}
