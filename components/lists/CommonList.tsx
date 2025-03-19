import React from "react";
import Link from "next/link";

import { productsData } from "@/data/data";
import { siteConfig } from "@/data/site";

import CommonCard from "@/components/cards/CommonCard";
import { Button } from "@/components/ui/button";

import { MoveRightIcon } from "lucide-react";

export default function CommonList() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="capitalize">Popular Products</div>
        <Button
          asChild
          variant="link"
          className="text-green-400 dark:text-white"
        >
          <Link href={siteConfig.proxy.shop} className="">
            View All <MoveRightIcon />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {productsData.map((prod) => (
          <div key={prod.id}>
            <CommonCard {...prod} />
          </div>
        ))}
      </div>
    </div>
  );
}
