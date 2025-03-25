"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash, X } from "lucide-react";

import { siteConfig } from "@/data/site";

import { CartContext } from "@/contexts/CartContext";
import { CartItemsList } from "@/contexts/CartContext";
import React from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

export function CartButton() {
  const { cartItems, clearCart, clearAllCart, getCartQuantity, getCartTotal } =
    React.useContext(CartContext) as CartItemsList;

  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  // const [isExpired, setIsExpired] = useState(false);
  // const [auth, setAuth] = useState<IUserType>();
  // const [cart, setCart] = useState<ICartType>();
  const [isCartLoading] = useState(false);

  // const token = getCookie("token");
  // useEffect(() => {
  //   // console.log(token); // Logging the token value for debugging purposes
  //   try {
  //     setIsLoading(true);

  //     if (token) {
  //       const fetchAuth = async () => {
  //         const authRes = await /* providing accessToken in bearer */
  //         fetch("https://dummyjson.com/auth/me", {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
  //           },
  //           // credentials: "include", // Include cookies (e.g., accessToken) in the request
  //         });
  //         if (!authRes.ok) {
  //           console.log(`error getting auth data`);
  //           setIsLoading(false);
  //           setIsExpired(true);
  //           deleteCookie("token");
  //         } else {
  //           const authData = await authRes.json();
  //           setAuth(authData);
  //           setIsLoading(false);
  //           setIsExpired(false);

  //           setIsCartLoading(true);
  //           const fetchCart = async () => {
  //             const cartRes = await fetch(`https://dummyjson.com/carts/1`);
  //             if (!cartRes.ok) {
  //               console.log(`error getting cart by user id`);
  //               setIsCartLoading(false);
  //             } else {
  //               const cartData: ICartType = await cartRes.json();
  //               setCart(cartData);
  //               setIsCartLoading(false);
  //               console.log(cartData);
  //             }
  //           };
  //           fetchCart();
  //         }
  //       };

  //       fetchAuth();
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("error", error);
  //     router.push(`${siteConfig.authorization.login}`);
  //     setIsLoading(false);
  //     setIsExpired(true);
  //     deleteCookie("token");
  //   }
  // }, [router, token]);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="hidden lg:flex">
            <ShoppingCart />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center">
                Shopping Cart ({getCartQuantity()})
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="max-w-[335px] w-full grid gap-4 py-4">
            <ScrollArea className="h-[500px] w-full ">
              {isCartLoading ? (
                <div>loading...</div>
              ) : (
                <>
                  {cartItems.length !== 0 ? (
                    cartItems.map((o, idx) => (
                      // className="flex justify-center items-center"
                      <div key={idx}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Image
                              src={`${
                                o.thumbnail
                                  ? o.thumbnail
                                  : "/images/placeholder.svg"
                              }`}
                              alt={o.thumbnail || "image"}
                              width={100}
                              height={100}
                              className="aspect-square rounded-xl"
                            />
                            <div className="flex flex-col gap-2">
                              <div className="font-normal text-sm">
                                {o.title}
                              </div>
                              <div className="flex gap-1 items-center">
                                <div className="font-normal text-sm text-muted-foreground">
                                  {o.quantity}
                                </div>
                                <X className="size-3" />
                                <div className="font-semibold text-sm ">
                                  {o.price}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => clearCart(o)}
                          >
                            <X />
                          </Button>
                        </div>
                        {cartItems.length - 1 !== idx && (
                          <Separator className="my-3" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div>Cart is empty</div>
                  )}
                </>
              )}
            </ScrollArea>
          </div>
          <SheetFooter className="absolute bottom-6 max-w-[335px] w-full">
            <div className="w-full flex flex-col">
              {cartItems.length !== 0 && (
                <div className="flex justify-end items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isCartLoading}
                    onClick={clearAllCart}
                  >
                    <Trash />
                  </Button>
                </div>
              )}
              <div className="flex justify-between items-center py-6">
                {cartItems.length !== 0 ? (
                  <div className="font-normal text-base text-muted-foreground">
                    {getCartQuantity()}{" "}
                    {getCartQuantity() === 1 ? "product" : "products"}
                  </div>
                ) : (
                  <div className="font-normal text-base text-muted-foreground">
                    0 product
                  </div>
                )}
                <div className="font-semibold text-base">
                  {cartItems.length !== 0 ? getCartTotal() : "$0"}
                </div>
              </div>
              <div className="flex flex-col justify-between items-center gap-2 w-full">
                <Button
                  className="w-full rounded-full"
                  disabled={isCartLoading}
                  onClick={() => router.push(siteConfig.accounts.checkOut)}
                >
                  Checkout
                </Button>
                <Button
                  className="w-full rounded-full"
                  disabled={isCartLoading}
                  onClick={() => router.push(siteConfig.accounts.cart)}
                >
                  Go to Cart
                </Button>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
