import React from "react";

// import { promosData } from "@/data/data";

import FullWidthPromoCard from "@/components/cards/promo/FullWidthPromoCard";
import { IPromoFetch } from "@/models/promos";
import apis from "@/apis";
import SmallPromoCard from "../cards/promo/SmallPromoCard";

const fetchPromos = async (): Promise<IPromoFetch> => {
  const res = await apis.promo.getPromos();
  return res.json();
};
export default async function PromoFullSizeList() {
  const data = await fetchPromos();

  let i = 0;
  const fullSizePromoData = data.promotions.filter((o) => {
    if (i === 0) {
      if (o.size === "full") {
        i++;
        return o;
      }
    }
  });

  return (
    <div className="">
      {fullSizePromoData.map((o) => (
        <div key={o.id}>
          <div className="hidden lg:grid">
            <FullWidthPromoCard {...o} />
          </div>
          <div className="lg:hidden">
            <SmallPromoCard {...o} />
          </div>
        </div>
      ))}
    </div>
  );
}
