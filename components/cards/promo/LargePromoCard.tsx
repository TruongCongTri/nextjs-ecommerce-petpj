// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";

import { IPromoType } from "@/models/promos";

import { Card } from "@/components/ui/card";
import { MoveRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export default function LargePromoCard(promo: IPromoType) {
  return (
    <Card className="lg:w-[808px] lg:h-[461px] w-[670px] group relative space-y-4 overflow-hidden ">
      <div className="rounded-xl">
        <figure className="">
          <div className="absolute inset-y-0 left-[60px] max-w-[500px] mx-auto text-white flex flex-col gap-4 justify-center items-left">
            <div id="deal-type" className="uppercase hidden">
              {promo.type}
            </div>
            <div id="tittle" className="capitalize font-semibold text-5xl">
              {promo.title}
            </div>

            <div className="border-l-2 border-green-700 px-3 space-y-3">
              <div id="content" className="flex gap-1 normal-case font-medium text-xl">
                {/* Sale up to <div className="">$79.99</div> */}
                {promo.description}
              </div>
              <div id="policies" className="normal-case font-normal text-sm ">
                {promo.policies}
              </div>
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
          {/* <CustomImage className="w-full rounded-t-xl max-w-[300px] max-h-[500px]">
            <CustomImageInput src={promo.image} />
            <CustomImageFallback className="rounded-t-xl">
              CN
            </CustomImageFallback>
          </CustomImage> */}
          <Image
            src={`${promo.image ? promo.image : "/images/placeholder.svg"}`}
            alt={promo.title}
            width={808}
            height={457}
            className="object-cover h-[457px] aspect-video rounded-xl"
          
          />
        </figure>
      </div>
    </Card>
  );
}
