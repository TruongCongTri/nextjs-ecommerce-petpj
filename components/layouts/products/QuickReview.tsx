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

export default function QuickViewProduct(product: IProductType) {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 bg-white/70 absolute top-16 end-3 rounded-full dark:text-black border border-transparent hover:border-green-400"
          >
            <EyeIcon className="size-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-6xl">
          <VisuallyHidden>
            <DialogTitle>Product name</DialogTitle>
          </VisuallyHidden>
          <ProductDetailLayout {...product} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
