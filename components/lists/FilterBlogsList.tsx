import React from "react";

import NewsCard from "../cards/NewsCard";
import { IPostType } from "@/models/posts";

// 10 blogs
export default async function FilterBlogsList({
  posts,
}: {
  posts: IPostType[];
}) {
  const data = await posts;

  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-6">
      {data.length === 0 ? (
        <div className="col-span-2 lg:col-span-3 h-[340px] flex items-center justify-center">
          Empty Blogs
        </div>
      ) : (
        <>
          {data.map((post) => (
            <div key={post.id}>
              <NewsCard {...post} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
