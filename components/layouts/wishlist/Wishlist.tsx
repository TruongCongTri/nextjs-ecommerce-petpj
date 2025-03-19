"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { siteConfig } from "@/data/site";
import { IUserType } from "@/models/authorization";
import { ICartType } from "@/models/carts";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function WishlistLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, setAuth] = useState<IUserType>();
  const [cart, setCart] = useState<ICartType>();
  const [isCartLoading, setIsCartLoading] = useState(false);

  const token = getCookie("token");
  useEffect(() => {
    // console.log(token); // Logging the token value for debugging purposes
    try {
      setIsLoading(true);

      if (token) {
        const fetchAuth = async () => {
          const authRes = await /* providing accessToken in bearer */
          fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
            },
            // credentials: "include", // Include cookies (e.g., accessToken) in the request
          });
          if (!authRes.ok) {
            console.log(`error getting auth data`);
            setIsLoading(false);
            setIsExpired(true);
            deleteCookie("token");
          } else {
            const authData = await authRes.json();
            setAuth(authData);
            setIsLoading(false);
            setIsExpired(false);

            setIsCartLoading(true);
            const fetchCart = async () => {
              const cartRes = await fetch(`https://dummyjson.com/carts/1`);
              if (!cartRes.ok) {
                console.log(`error getting cart by user id`);
                setIsCartLoading(false);
              } else {
                const cartData: ICartType = await cartRes.json();
                setCart(cartData);
                setIsCartLoading(false);
                console.log(cartData);
              }
            };
            fetchCart();
          }
        };

        fetchAuth();
      }

      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      router.push(`${siteConfig.authorization.login}`);
      setIsLoading(false);
      setIsExpired(true);
      deleteCookie("token");
    }
  }, [router, token]);

  return (
    <main className="flex flex-col lg:flex-row lg:justify-between gap-6 md:gap-8 ">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
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
                                  <Button variant="outline">Add to cart</Button>
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
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
