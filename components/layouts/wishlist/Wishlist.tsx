"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FavContext } from "@/contexts/FavContext";
import { FavItemsList } from "@/contexts/FavContext";

import { CartContext } from "@/contexts/CartContext";
import { CartItemsList } from "@/contexts/CartContext";
import { Trash, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WishlistLayout() {
  const { favItems, removeFromFav, clearAllFav } = React.useContext(
    FavContext
  ) as FavItemsList;
  const { addToCart } = React.useContext(CartContext) as CartItemsList;

  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
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
      {favItems.length !== 0 ? (
        <div className="flex-1">
        {favItems.length === 0 ? (
          <div>Wishlist is empty</div>
        ) : (
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
                          <div>Wishlist is empty</div>
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
                                    <Button variant="outline">
                                      Add to cart
                                    </Button>
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

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                      Product
                    </th>
                    <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                      Price
                    </th>
                    <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200">
                      Stock Status
                    </th>
                    <th className="py-4 bg-gray-100 font-medium text-sm text-muted-foreground uppercase border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {favItems.map((o, idx) => (
                    <tr
                      key={o.id}
                      className={`hover:bg-gray-100 py-4 px-6 ${
                        favItems.length - 1 !== idx && "border-b"
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
                          <div className="font-normal text-base">{o.title}</div>
                        </div>
                      </td>
                      <td>
                        <div className="font-normal text-base">
                          {o.discountPercentage
                            ? Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(
                                (o.price * (100 - o.discountPercentage)) / 100
                              )
                            : Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(o.price)}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium text-base">
                          {o.availabilityStatus}
                        </div>
                      </td>
                      <td>
                        <div className="px-6 justify-end items-center flex gap-6">
                          {o.availabilityStatus === "Out of Stock" ? (
                            <Button
                              size="lg"
                              className="rounded-full "
                              disabled={true}
                            >
                              Out of Stock
                            </Button>
                          ) : (
                            <Button
                              size="lg"
                              className="rounded-full "
                              onClick={() => addToCart(o)}
                            >
                              Add to cart
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full hover:bg-primary hover:text-white"
                            onClick={() => removeFromFav(o)}
                          >
                            <X />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            {favItems.length !== 0 && (
              <CardFooter className="py-4 px-6 border-t">
                <div className="w-full flex justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary/70 hover:text-white"
                          onClick={clearAllFav}
                        >
                          <Trash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove all from Wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardFooter>
            )}
          </Card>
        )}
      </div>
      ) : (
        <div className="py-[80px] flex items-center justify-center">Wishlist is empty</div>
      )} 
    </main>
  );
}
