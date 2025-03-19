import React from "react";

import { newsData } from "@/data/data";

import {
  CustomImage,
  CustomImageFallback,
  CustomImageInput,
} from "@/components/ui/customize/custom-image";

// 8 card
export default function GalleryList() {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-start items-center">
        <div className="capitalize">Our Gallery</div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {newsData.map((o) => (
          <div key={o.id}>
            <CustomImage className="aspect-square w-full rounded-xl max-w-[100px] max-h-[100px]">
              <CustomImageInput src={o.image} />
              <CustomImageFallback className="rounded-t-xl">
                CN
              </CustomImageFallback>
            </CustomImage>
          </div>
        ))}
      </div>
    </div>
  );
}
