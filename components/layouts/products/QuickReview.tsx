import React from "react";

import { IProductType } from "@/models/products";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductDetailLayout from "@/components/layouts/products/Detail";

import { EyeIcon } from "lucide-react";

export default function QuickViewProduct({
  product,
  isLarge,
}: {
  product: IProductType;
  isLarge?: boolean;
}) {
  return (
    <Dialog>
      {/* opacity-0 absolute top-10 end-3 group-hover:opacity-100  */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`p-[10px] absolute opacity-0 bg-white  
          border border-transparent rounded-full 
          group-hover:opacity-100 group-hover:border-gray-200
          hover:border-primary hover:bg-primary hover:text-white
          dark:text-black ${!isLarge ? ' top-16 end-3 ' : 'top-2/3 -right-2 transform -translate-x-1/2 -translate-y-1/2'}`}
        >
          <EyeIcon className="size-4" />
        </Button>
      </DialogTrigger>
      {/* <DialogTrigger asChild>
        <Button variant="outline"
        >Edit Profile</Button>
      </DialogTrigger> */}

      <DialogContent className="max-w-6xl">
        <VisuallyHidden>
          <DialogTitle>Product name</DialogTitle>
        </VisuallyHidden>
        <ProductDetailLayout {...product} />
      </DialogContent>
    </Dialog>
  );
}
