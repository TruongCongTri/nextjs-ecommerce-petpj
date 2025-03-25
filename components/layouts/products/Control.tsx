"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CartContext } from "@/contexts/CartContext";
import { CartItemsList } from "@/contexts/CartContext";
import { ICartProductType } from "@/models/carts";
import { IProductType } from "@/models/products";
import { HeartIcon, Minus, Plus, ShoppingBagIcon, X } from "lucide-react";
import React, { useState } from "react";

export default function ProductDetailsControl({
  product,
}: {
  product: IProductType;
}) {
  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue(value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = React.useContext(CartContext) as CartItemsList;

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const cart: ICartProductType = {
        ...product,
        quantity: await value,
      };
      addToCart(await cart);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-4">
      {product.availabilityStatus === "Out of Stock" ? (
        <div className="flex items-center justify-center border rounded-full w-30 gap-1 px-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
            disabled={true}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            type="number"
            min="1"
            max={product.stock}
            defaultValue="1"
            className="w-4 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            disabled={true}
          />
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
            disabled={true}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center border rounded-full w-30 gap-1 px-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
            disabled={isLoading}
            onClick={handleDecrement}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || 1)}
            disabled={isLoading}
            className="w-10 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-muted hover:bg-primary/90 hover:text-white"
            disabled={isLoading}
            onClick={handleIncrement}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      )}
      {product.availabilityStatus === "Out of Stock" ? (
        <Button
          size="lg"
          className="normal-case border border-primary hover:border-primary/90 w-full rounded-full"
          disabled={true}
        >
          Out of stock <X className="size-10" />
        </Button>
      ) : (
        <Button
          size="lg"
          className="normal-case border border-primary hover:border-primary/90 w-full rounded-full"
          disabled={isLoading}
          onClick={onSubmit}
        >
          Add to Cart <ShoppingBagIcon className="size-10" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="p-5 bg-gray-100 rounded-full border border-gray-100 
                  dark:text-white dark:bg-muted
                  hover:text-white hover:bg-primary hover:border-primary 
                  dark:hover:text-white dark:hover:bg-primary dark:hover:border-primary "
      >
        <HeartIcon className="size-10" />
      </Button>
    </div>
  );
}
