import Link from "next/link";
import Image from "next/image";

import { ICategoryType } from "@/models/categories";
import { siteConfig } from "@/data/site";

import { Card, CardContent } from "@/components/ui/card";

export default function CategoryCard(category: ICategoryType) {
  return (
    <Card className="lg:w-[200px] w-[127px] group relative space-y-4 overflow-hidden ">
      <div className="group-hover:border-green-400 border border-gray-300 rounded-xl">
        <figure className="">
          {/* <Image
            className="aspect-square w-full rounded-t-xl"
            src={`${category.image ? category.image : null}`}
            width={300}
            height={500}
            alt={category.name}
          /> */}
          {/* <CustomImage className="aspect-square w-full rounded-t-xl max-w-[300px] max-h-[500px]">
            <CustomImageInput src="" />
            <CustomImageFallback className="rounded-t-xl">
              CN
            </CustomImageFallback>
          </CustomImage> */}
          <Image
            src={"/images/placeholder.svg"}
            alt={category.name}
            width={127}
            height={127}
            className=" w-full aspect-square rounded-t-xl"
          />
        </figure>
        <CardContent className="px-4 py-2">
          <div className="flex justify-center items-center">
            <div className="text-lg font-medium group-hover:text-green-600">
              <Link
                href={`${siteConfig.proxy.shop}?category=${category.slug}`}
                className="capitalize line-clamp-1"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {category.name}
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
