"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash, X } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/data/site";
import { useRouter } from "next/navigation";

import { CartContext } from "@/contexts/CartContext";
import { CartItemsList } from "@/contexts/CartContext";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ShoppingCartLayout() {
  const {
    cartItems,
    increaseCart,
    decreaseCart,
    clearCart,
    clearAllCart,
    getCartQuantity,
    getCartTotal,
  } = React.useContext(CartContext) as CartItemsList;

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // const [isExpired, setIsExpired] = useState(false);
  // const [auth, setAuth] = useState<IUserType>();
  // const [cart, setCart] = useState<ICartType>();
  // const [isCartLoading, setIsCartLoading] = useState(false);

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
    <main className="flex flex-col lg:flex-row lg:justify-between gap-6 md:gap-8 ">
      {cartItems.length !== 0 ? (
        <>
          <div className="flex-1">
            <Card>
              <CardContent className="-p-6">
                {/* {isLoading ? (
              <div>loading</div>
            ) : (
              <>
                {isExpired ? (
                  <div>loading</div>
                ) : (
                  <>
                    {isCartLoading ? (
                      <div>loading</div>
                    ) : (
                      <>
                        {!cart ? (
                          <div>Cart is empty</div>
                        ) : (
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr>
                                <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-700 border-b border-gray-200">
                                  Product
                                </th>
                                <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-700 border-b border-gray-200">
                                  Price
                                </th>
                                <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-700 border-b border-gray-200">
                                  Quantity
                                </th>
                                <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-700 border-b border-gray-200">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {cart.products.map((o) => (
                                <tr key={o.id} className="hover:bg-gray-100">
                                  <td className="py-4 px-6 border-b border-gray-200">
                                    {o.title}
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-200">
                                    {o.discountPercentage
                                      ? Intl.NumberFormat("en-US", {
                                          style: "currency",
                                          currency: "USD",
                                        }).format(
                                          (o.price *
                                            (100 - o.discountPercentage)) /
                                            100
                                        )
                                      : Intl.NumberFormat("en-US", {
                                          style: "currency",
                                          currency: "USD",
                                        }).format(o.price)}
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-6 h-6 hover:bg-muted"
                                      >
                                        <Minus className="w-4 h-4" />
                                        <span className="sr-only">
                                          Decrease quantity
                                        </span>
                                      </Button>
                                      <Input
                                        type="number"
                                        min="1"
                                        max="5"
                                        defaultValue="1"
                                        className="w-12 text-center"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-6 h-6 hover:bg-muted"
                                      >
                                        <Plus className="w-4 h-4" />
                                        <span className="sr-only">
                                          Increase quantity
                                        </span>
                                      </Button>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-200">
                                    <Button variant="outline">Remove</Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )} */}

                <div className="hidden lg:block">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="py-4 px-6 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                          Product
                        </th>
                        <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                          Price
                        </th>
                        <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                          Quantity
                        </th>
                        <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                          Subtotal
                        </th>
                        <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((o, idx) => (
                        <tr
                          key={o.id}
                          className={`hover:bg-gray-100 py-4 px-6 ${
                            cartItems.length - 1 !== idx && "border-b"
                          }`}
                        >
                          <td className="px-6">
                            <div className="flex gap-3 items-center">
                              <Image
                                src={`${
                                  o.thumbnail
                                    ? o.thumbnail
                                    : "/images/placeholder.svg"
                                }`}
                                alt={o.thumbnail || "image"}
                                width={100}
                                height={100}
                                className="aspect-square rounded-none"
                              />
                              <div className="font-normal text-base">
                                {o.title}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="font-normal text-base">
                              {o.discountPercentage
                                ? Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(
                                    (o.price * (100 - o.discountPercentage)) /
                                      100
                                  )
                                : Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(o.price)}
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 hover:bg-muted"
                                onClick={() => decreaseCart(o)}
                              >
                                <Minus className="w-4 h-4" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <div className="font-normal text-base">
                                {o.quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 hover:bg-muted"
                                onClick={() => increaseCart(o)}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>
                          </td>
                          <td>
                            {/* {o.discountPercentage
                            ? Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(
                                (o.price * (100 - o.discountPercentage)) / 100
                              ) */}
                            <div className="font-medium text-base">
                              {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(
                                o.discountedTotal || o.price * (o.quantity || 1)
                              )}
                            </div>
                          </td>
                          <td className="px-6 ">
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full hover:bg-primary hover:text-white"
                                onClick={() => clearCart(o)}
                              >
                                <X />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="lg:hidden">
                  <div className="w-full text-left border-collapse">
                    <div className="rounded-t-xl bg-gray-100">
                      <div className="px-4 lg:px-6 py-4 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                        Product
                      </div>
                    </div>
                    <div>
                      {cartItems.map((o, idx) => (
                        <div
                          key={o.id}
                          className={`hover:bg-gray-100 py-4 px-4 lg:px-6 flex gap-4 ${
                            cartItems.length - 1 !== idx && "border-b"
                          }`}
                        >
                          {/* h-[50px] w-[50px] lg:h-[100px] lg:w-[100px] max-w-[100px] max-h-[100px]  */}
                          <Image
                            src={`${
                              o.thumbnail
                                ? o.thumbnail
                                : "/images/placeholder.svg"
                            }`}
                            alt={o.thumbnail || "image"}
                            width={100}
                            height={100}
                            className="h-[100px] w-[100px] aspect-square rounded-xl"
                          />

                          <div className="w-full flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="font-normal text-base line-clamp-1">
                                {o.title}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 hover:bg-muted"
                                  onClick={() => decreaseCart(o)}
                                >
                                  <Minus className="w-4 h-4" />
                                  <span className="sr-only">
                                    Decrease quantity
                                  </span>
                                </Button>
                                <div className="font-normal text-base">
                                  {o.quantity}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 hover:bg-muted"
                                  onClick={() => increaseCart(o)}
                                >
                                  <Plus className="w-4 h-4" />
                                  <span className="sr-only">
                                    Increase quantity
                                  </span>
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-end">
                              <div className="font-normal text-base">
                                {o.discountPercentage
                                  ? Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    }).format(
                                      (o.price * (100 - o.discountPercentage)) /
                                        100
                                    )
                                  : Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    }).format(o.price)}
                              </div>

                              <div className="justify-end items-center flex gap-2 lg:gap-6">
                                {o.availabilityStatus === "Out of Stock" ? (
                                  <Button
                                    size="lg"
                                    className="rounded-full "
                                    disabled={true}
                                  >
                                    Out of Stock
                                  </Button>
                                ) : (
                                  <></>
                                )}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-full hover:bg-primary hover:text-white"
                                  onClick={() => clearCart(o)}
                                >
                                  <X />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              {cartItems.length !== 0 && (
                <CardFooter className="py-4 px-4 lg:px-6 border-t">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-end w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="hover:bg-primary hover:text-white"
                              onClick={clearAllCart}
                            >
                              <Trash />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove all from Shopping Cart</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <Button
                        variant="outline"
                        className="rounded-full bg-accent hover:bg-primary hover:text-white"
                        size="lg"
                        // onClick={clearAllCart}
                        onClick={() => router.push(siteConfig.proxy.shop)}
                      >
                        Return to shop
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full bg-accent hover:bg-primary hover:text-white"
                        size="lg"
                        // onClick={clearAllCart}
                      >
                        Update Cart
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <div className="w-full lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="font-normal text-xl">Shopping Total</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <>
                  <div className="flex items-center justify-between py-3">
                    <div className="font-normal text-sm text-muted-foreground">
                      Subtotal:
                    </div>
                    <div className="font-medium text-sm">
                      {cartItems.length !== 0 && getCartQuantity()}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-3">
                    <div className="font-normal text-sm text-muted-foreground">
                      Subtotal:
                    </div>
                    <div className="font-medium text-sm">
                      {cartItems.length !== 0 && getCartQuantity()}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-3">
                    <div className="font-normal text-base text-muted-foreground">
                      Subtotal
                    </div>
                    <div className="font-medium text-sm">
                      {cartItems.length !== 0 &&
                        Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(getCartTotal())}
                    </div>
                  </div>
                </>
              </CardContent>
              {cartItems.length !== 0 && (
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={isLoading || cartItems.length === 0}
                    onClick={() => router.push(siteConfig.accounts.checkOut)}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </>
      ) : (
        <div className="py-[80px] flex items-center justify-center">
          Cart is empty
        </div>
      )}
    </main>
  );
}
