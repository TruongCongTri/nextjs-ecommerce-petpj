import Link from "next/link";
import Image from "next/image";

import { IPromoType } from "@/models/promos";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { MoveRightIcon } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function PromoCard(promo: IPromoType) {
  return (
    <Card className="lg:w-[395px] lg:h-[530px] w-full h-full group relative space-y-4 overflow-hidden ">
      <div className="rounded-xl">
        <figure className="">
          <div className="absolute inset-x-0 top-[35px] mx-auto text-white flex flex-col gap-4 justify-center items-center">
            <div id="deal-type" className="uppercase text-sm font-medium">
              {promo.type}
            </div>
            <div id="tittle" className="capitalize text-[40px] font-semibold">
              {promo.title}
            </div>

            <div id="content" className="flex gap-1 normal-case">
              {promo.description}
            </div>
            <Button
              asChild
              variant="ghost"
              size="default"
              className="w-[200px] bg-white text-primary rounded-full px-4 py-4 font-semibold text-base border border-transparent hover:border-green-400 hover:bg-primary hover:text-white "
            >
              <Link href={siteConfig.home} target="_blank">
                <p className="capitalize">shop now</p>{" "}
                <MoveRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
          <Image
            src={`${promo.image ? promo.image : "/images/placeholder.svg"}`}
            alt={promo.title}
            width={395}
            height={530}
            className="object-cover rounded-xl h-[530px]"
          />
        </figure>
      </div>
    </Card>
  );
}
