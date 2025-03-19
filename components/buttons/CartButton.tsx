"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

import { siteConfig } from "@/data/site";
import { IUserType } from "@/models/authorization";
import { ICartType } from "@/models/carts";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import CartItem from "../cards/cart/CartItem";

export function CartButton() {
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
    <>
      {isLoading ? (
        <Button></Button>
      ) : (
        <>
          {!token ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <ShoppingCart />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                {!cart ? <div>empty cart</div> : <div>has cart</div>}
                {!cart ? null : (
                  <SheetFooter className="absolute bottom-6 w-[335px] ">
                    <div className="flex justify-between items-center gap-2 w-full">
                      <Button type="submit" className="w-full rounded-full">
                        <Link href={siteConfig.accounts.checkOut}>
                          Checkout
                        </Link>
                      </Button>
                      <Button type="submit" className="w-full rounded-full">
                        <Link href={siteConfig.accounts.cart}>Go to Cart</Link>
                      </Button>
                    </div>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          ) : (
            <>
              {isExpired ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="hidden lg:flex">
                      <ShoppingCart />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Shopping Cart</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    {!cart ? <div>empty cart</div> : <div>has cart</div>}
                    {!cart ? null : (
                      <SheetFooter className="absolute bottom-6 w-[335px] ">
                        <div className="flex justify-between items-center gap-2 w-full">
                          <Button type="submit" className="w-full rounded-full">
                            <Link href={siteConfig.accounts.checkOut}>
                              Checkout
                            </Link>
                          </Button>
                          <Button type="submit" className="w-full rounded-full">
                            <Link href={siteConfig.accounts.cart}>
                              Go to Cart
                            </Link>
                          </Button>
                        </div>
                      </SheetFooter>
                    )}
                  </SheetContent>
                </Sheet>
              ) : (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="hidden lg:flex">
                      <ShoppingCart />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Shopping Cart</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="max-w-[335px] w-full grid gap-4 py-4">
                      {isCartLoading ? (
                        <div>loading....</div>
                      ) : (
                        <>
                          {cart ? (
                            cart.products.map((o, idx) => (
                              <CartItem key={idx} cart={o} />
                            ))
                          ) : (
                            <div>no items</div>
                          )}
                        </>
                      )}
                    </div>
                    <SheetFooter className="absolute bottom-6 max-w-[335px] w-full">
                        <div className="flex justify-between items-center gap-2 w-full">
                        <Button type="submit" className="w-full rounded-full">
                          <Link href={siteConfig.accounts.checkOut}>
                            Checkout
                          </Link>
                        </Button>
                        <Button type="submit" className="w-full rounded-full">
                          <Link href={siteConfig.accounts.cart}>
                            Go to Cart
                          </Link>
                        </Button>
                      </div>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
