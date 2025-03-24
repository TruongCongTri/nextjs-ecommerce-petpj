"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingBagIcon } from "lucide-react";

import { CartContext } from "@/contexts/CartContext";
import { CartItemsList } from "@/contexts/CartContext";
import { IProductType } from "@/models/products";
import { ICartProductType } from "@/models/carts";

export default function AddToCartButton({
  product,
  qtt,
}: {
  product: IProductType;
  qtt: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = React.useContext(CartContext) as CartItemsList;

  async function onSubmit() {
    try {
      setIsLoading(true);

      const cart: ICartProductType = product;
      cart.quantity = qtt;
      addToCart(cart);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  }
  return (
    //  absolute end-3 top-20
    <Button
      variant="ghost"
      className={`w-[350px] absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        text-black bg-gray-200 
        border border-transparent rounded-full 
        group-hover:text-white group-hover:bg-primary group-hover:border-primary 
        
        dark:text-black `}
      onClick={onSubmit}
      disabled={isLoading}
    >
      <div className="flex items-center justify-center gap-3">
        <div>Add to Cart</div>
        <ShoppingBagIcon className="size-4 " />
      </div>
    </Button>
  );
}
