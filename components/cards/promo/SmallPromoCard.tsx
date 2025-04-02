// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";

import { IPromoType } from "@/models/promos";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { MoveRightIcon } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function SmallPromoCard(promo: IPromoType) {
  return (
    <Card className="w-full h-full group relative space-y-4 overflow-hidden ">
      <div className="rounded-xl">
        <figure className="">
          <div className="absolute top-8 left-8 mx-auto text-white flex flex-col gap-2 justify-center items-start">
            <div
              id="deal-type"
              className="uppercase font-medium text-sm text-black"
            >
              {promo.type}
            </div>
            <div
              id="tittle"
              className="capitalize text-black font-semibold text-2xl lg:text-4xl max-w-[250px]"
            >
              {promo.title}
            </div>

            <div
              id="content"
              className="flex gap-1 normal-case text-black font-normal text-sm "
            >
              {promo.description}
            </div>
            <div
              id="policies"
              className="normal-case text-black font-normal text-sm "
            >
              {promo.policies}
            </div>
            <Button
              asChild
              variant="link"
              size="default"
              className="font-semibold text-base rounded-full px-4 dark:text-black border border-transparent -ml-4"
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
            width={100}
            height={50}
            className="object-cover w-full aspect-video rounded-xl"
          />
        </figure>
      </div>
    </Card>
  );
}
