import React from "react";

import apis from "@/apis";
// import { promosData } from "@/data/data";
import PromoCard from "@/components/cards/promo/PromoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IPromoFetch } from "@/models/promos";

const fetchPromos = async (): Promise<IPromoFetch> => {
  const data = await apis.promo.getPromos();
  return data.json();
};

export default async function PromoList() {
  const data = await fetchPromos();

  let i = 0;
  const promoData = data.promotions.filter((o) => {
    if (i <= 3) {
      if (o.size === "medium") {
        i++;
        return o;
      }
    }
  });

  return (
    <div>
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {promoData.map((o) => (
          <div key={o.id} className="">
            <PromoCard {...o} />
          </div>
        ))}
      </div>
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {promoData.map((o, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <div>
                  <PromoCard {...o} />
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
