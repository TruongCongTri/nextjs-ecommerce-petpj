import React from "react";

import { IPostFetch } from "@/models/posts";
import apis from "@/apis";
import SmallNewsCard from "@/components/cards/SmallNewsCard";

const fetchNews = async (): Promise<IPostFetch> => {
  const data = await apis.post.getPosts(0, 3);
  return data.json();
};
// 3 card
export default async function RecentlyAddedNewsList() {
  const data = await fetchNews();

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-start items-center">
        <div className="capitalize">Recently Added</div>
      </div>
      <div className="flex flex-col gap-4">
        {data.posts.map((o, idx) => (
          <SmallNewsCard key={idx} news={o} />
        ))}
      </div>
    </div>
  );
}
