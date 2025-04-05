
import React from "react";
// import DOMPurify from "isomorphic-dompurify";
import { Post } from "@/lib/types";
import PostCard from "../cards/PostCard";

export default function BlogPostList({ posts }: {posts: Post[]}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
