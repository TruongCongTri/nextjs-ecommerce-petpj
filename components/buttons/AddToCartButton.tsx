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
    <Button
      variant="ghost"
      size="icon"
      className="p-[10px] absolute end-3 bottom-6 bg-gray-200 
      border border-transparent rounded-full 
      group-hover:border-primary group-hover:bg-primary group-hover:text-white
      hover:border-black/20 hover:bg-black/20 hover:text-white
      dark:text-black"
      onClick={onSubmit}
      disabled={isLoading}
    >
      <ShoppingBagIcon className="size-4 " />
    </Button>
  );
}
