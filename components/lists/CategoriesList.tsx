import React from "react";
import Link from "next/link";

import { siteConfig } from "@/data/site";

import CategoryCard from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/button";

import { MoveRightIcon } from "lucide-react";
import { ICategoryType } from "@/models/categories";
import apis from "@/apis";

const fetchCates = async (): Promise<ICategoryType[]> => {
  const res = await apis.category.getCategories();
  return res.json();
};

export default async function PopularCategoriesList() {
  const data = await fetchCates();

  return (
    <div className="flex flex-col lg:gap-6 gap-2">
      <div className="flex justify-between items-center">
        <div className="capitalize text-4xl font-semibold">Popular Categories</div>
        <Button
          asChild
          variant="link"
          className="text-primary dark:text-white font-medium text-base"
        >
          <Link href={siteConfig.proxy.shop} className="">
            View All <MoveRightIcon />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-1 lg:grid-cols-6 ">
        {data
          .filter((item, idx) => idx < 12)
          .map((o, idx) => (
            <CategoryCard key={idx} {...o} />
          ))}
      </div>
    </div>
  );
}
