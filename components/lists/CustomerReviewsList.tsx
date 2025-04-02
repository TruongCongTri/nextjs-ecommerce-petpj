import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomerReviewCard from "../cards/CustomerReviewCard";
import { IReviewFetch } from "../../models/reviews";
import apis from "@/apis";

const fetchReviews = async (): Promise<IReviewFetch> => {
  const res = await apis.review.getReviews();
  return res.json();
};

export async function CustomerReviewsList() {
  const data = await fetchReviews();

  return (
    <>
    <div className="mb-[50px] capitalize text-2xl lg:text-4xl font-semibold">Client Testimonial</div>
    <Carousel
      opts={{
        align: "start",
      }}
      className=""
    >
      <CarouselContent className="space-x-1">
        {data.reviews.map((o, idx) => (
          <CarouselItem key={idx} className="basis-full lg:basis-1/3">
            <div className="">
              <CustomerReviewCard {...o} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:grid">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
    </>
  );
}
