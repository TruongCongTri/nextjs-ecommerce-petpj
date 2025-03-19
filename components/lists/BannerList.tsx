import React from "react";
// import { promosData } from "@/data/data";
import LargePromoCard from "@/components/cards/promo/LargePromoCard";
import SmallPromoCard from "@/components/cards/promo/SmallPromoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IPromoFetch } from "@/models/promos";
import apis from "@/apis";

const fetchBanners = async (): Promise<IPromoFetch> => {
  const data = await apis.promo.getPromos();
  return data.json();
};

export default async function BannerList() {
  const data = await fetchBanners();

  let i = 0;
  const bannersData = data.promotions.filter((o) => {
    if (i <= 3) {
      if (o.size !== "medium" && o.size !== "full") {
        i++;
        return o;
      }
    }
  });

  return (
    <div>
      <div className="hidden lg:gap-2 lg:grid lg:grid-cols-3 lg:grid-rows-2">
        {bannersData.map((o) =>
          o.size === "large" ? (
            <div key={o.id} className="col-span-2 row-span-2">
              <LargePromoCard {...o} />
            </div>
          ) : (
            <div key={o.id} className="col-start-3">
              <SmallPromoCard {...o} />
            </div>
          )
        )}
      </div>
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {bannersData.map((o, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <div>
                  <SmallPromoCard {...o} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden lg:grid">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
