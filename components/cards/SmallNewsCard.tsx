import Link from "next/link";

import { siteConfig } from "@/data/site";

import { Card } from "@/components/ui/card";

import { Calendar } from "lucide-react";
import { IPostType } from "@/models/posts";

import {
  CustomImage,
  CustomImageFallback,
  CustomImageInput,
} from "../ui/customize/custom-image";

export default async function SmallNewsCard({ news }: { news: IPostType }) {
  return (
    <Card className="lg:w-[400px] w-full group relative space-y-4 overflow-hidden border-transparent shadow-none hover:border-primary hover:shadow hover:shadow-primary">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-3 items-start">
          <CustomImage className="aspect-square w-full rounded-xl max-w-[100px] max-h-[100px]">
            <CustomImageInput src="" />
            <CustomImageFallback className="rounded-xl">CN</CustomImageFallback>
          </CustomImage>
          <div className="flex flex-col gap-2">
            <Link href={`${siteConfig.proxy.blog}/${news.id}}`}>
              <div className="capitalize line-clamp-2 font-medium text-">
                {news.title}
              </div>
            </Link>
            <div className="capitalize flex items-center gap-1">
              <Calendar className="size-4 text-primary" />
              <div className="font-normal text-sm text-muted-foreground">
                Apr 25, 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
