// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";

import { IPromoType } from "@/models/promos";

import { Card } from "@/components/ui/card";
import { MoveRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export default function FullWidthPromoCard(promo: IPromoType) {
  return (
    <Card className="lg:w-[1216px] lg:h-[350px] w-[670px] group relative space-y-4 overflow-hidden ">
      <div className="rounded-xl">
        <figure className="">
          <div className="text-muted-foreground absolute top-20 end-3 mx-auto text-white flex flex-col gap-3 justify-center items-left">
            <div id="deal-type" className="uppercase font-medium text-base">
              {promo.type}
            </div>
            <div id="tittle" className="capitalize text-[56px] font-semibold">
              {promo.title}
            </div>

            <div id="policies" className="normal-case text-base font-normal">
              {promo.policies}
            </div>

            <Button
              asChild
              variant="ghost"
              size="default"
              className="w-[200px] bg-primary text-white rounded-full px-4 py-4 font-semibold text-base border border-transparent hover:border-green-400 hover:bg-white hover:text-primary "
            >
              <Link href={siteConfig.home} target="_blank">
                <p className="capitalize">shop now</p>{" "}
                <MoveRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
          {/* <CustomImage className="w-full rounded-t-xl max-w-[300px] max-h-[500px]">
            <CustomImageInput src={promo.image} />
            <CustomImageFallback className="rounded-t-xl">
              CN
            </CustomImageFallback>
          </CustomImage> */}
          <Image
            src={`${promo.image ? promo.image : "/images/placeholder.svg"}`}
            alt={promo.title}
            width={1214}
            height={350}
            className="object-cover h-[350px] aspect-video rounded-xl"
          />
        </figure>
      </div>
    </Card>
  );
}
