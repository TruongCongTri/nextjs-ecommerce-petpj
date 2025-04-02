import React from "react";

import NewsCard from "@/components/cards/NewsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { IPostFetch } from "@/models/posts";
import apis from "@/apis";

const fetchPosts = async (): Promise<IPostFetch> => {
  const data = await apis.post.getPosts(0, 3);
  return data.json();
}


export default async function NewsList() {
  const data = await fetchPosts();

  return (
    <div className="flex flex-col lg:gap-8 gap-4">
      <div className="flex justify-center items-center">
        <div className="capitalize text-2xl lg:text-4xl font-semibold">Latest News</div>
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {data.posts.map((o) => (
          <div key={o.id}>
            <NewsCard {...o} />
          </div>
        ))}
      </div>
      <div className="lg:hidden relative w-full mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full rounded-lg overflow-hidden"
        >
          <CarouselContent>
            {data.posts.map((o, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <div>
                  <NewsCard {...o} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/50 hover:bg-background/75 p-2 rounded-full" />
          <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/50 hover:bg-background/75 p-2 rounded-full" />
        </Carousel>
      </div>
    </div>
  );
}
