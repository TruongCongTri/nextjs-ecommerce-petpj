"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";

import { FavContext } from "@/contexts/FavContext";
import { FavItemsList } from "@/contexts/FavContext";
import { IProductType } from "@/models/products";
import { ICartProductType } from "@/models/carts";

export default function AddToFavButton({
  product,
  qtt,
  isLarge,
}: {
  product: IProductType;
  qtt: number;
  isLarge?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToFav } = React.useContext(FavContext) as FavItemsList;

  async function onSubmit() {
    try {
      setIsLoading(true);
      const fav: ICartProductType = { ...product, quantity: await qtt };
      addToFav(fav);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`p-[10px] absolute opacity-0 bg-white  
          border border-transparent rounded-full 
          group-hover:opacity-100 group-hover:border-gray-200
          hover:border-primary hover:bg-primary hover:text-white
          dark:text-black 
          ${
            isLarge
              ? " top-2/3 left-6 transform -translate-x-1/2 -translate-y-1/2"
              : " top-3 end-3 "
          }`}
      onClick={onSubmit}
      disabled={isLoading}
    >
      <HeartIcon className="size-4" />
    </Button>
  );
}
