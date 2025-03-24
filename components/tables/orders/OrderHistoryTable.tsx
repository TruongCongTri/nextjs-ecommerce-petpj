"use client";
import React, { useEffect, useState } from "react";

import { DataTable } from "@/components/tables/commons/data-table";

import { orderColumns } from "./orderColumns";
// import { ordersData } from "@/data/data";
import { deleteCookie, getCookie } from "cookies-next";
import { siteConfig } from "@/data/site";
import { useRouter } from "next/navigation";
import { IUserType } from "@/models/authorization";
// import { IOrderFetch } from "@/models/orders";
// import apis from "@/apis";
import { ICartType } from "@/models/carts";
import { LoadingSpinner } from "@/components/icons/loading-icon";

export default function OrderHistoryTable() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [auth, setAuth] = useState<IUserType>();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cart, setCart] = useState<ICartType[]>([]);
  const token = getCookie("token");

  useEffect(() => {
    // console.log(token); // Logging the token value for debugging purposes
    try {
      setIsLoading(true);

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
          setIsExpired(true);
          deleteCookie("token");
          router.push(`${siteConfig.authorization.login}`);
        } else {
          const authData = await authRes.json();
          setAuth(authData);
          setIsExpired(false);
          setIsLoading(false);
          setIsCartLoading(true);
          const fetchCarts = async () => {
            // const cartsRes = await apis.cart.getCartsByUser(auth?.id || 1);
            const cartsRes = await fetch(
              `https://dummyjson.com/carts` +
                `?skip=0` +
                `&limit=0` +
                `&sortBy=id&order=desc`
            );
            if (!cartsRes.ok) {
              console.log(`error getting carts data`);
              setIsCartLoading(false);
            } else {
              const cartData = await cartsRes.json();
              console.log(cartData);

              setCart(cartData.carts);
              setIsCartLoading(false);
            }
          };
          fetchCarts();
        }
      };

      fetchAuth();
    } catch (error) {
      console.error("error", error);
      router.push(`${siteConfig.authorization.login}`);
      setIsLoading(false);
      setIsExpired(true);
      setIsCartLoading(false);
      deleteCookie("token");
    }
  }, [router, token]);

  // if (isLoading) return <p>Loading...</p>;
  // if (isExpired) return <p>Token expired...</p>;
  if (isLoading)
    return (
      <div className="w-full py-6 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  if (isExpired)
    return (
      <div className="w-full py-6 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  if (!auth)
    return (
      <div className="w-full py-6 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  if (isCartLoading)
    return (
      <div className="w-full py-6 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  return (
    // <>
    //   {isLoading ? (
    //     <p>Loading</p>
    //   ) : (
    //     <>
    //       {isExpired ? (
    //         <p>token expired</p>
    //       ) : (
    //         <>
    //           {isCartLoading ? (
    //             <p>Cart loading</p>
    //           ) : (
    <>
      <div className="flex justify-between items-center px-6 py-4">
        <div className="capitalize font-medium text-xl">Order History</div>
      </div>
      <div className="px-6">
        <DataTable columns={orderColumns} data={cart} />
      </div>
    </>
    //           )}
    //         </>
    //       )}
    //     </>
    //   )}
    // </>
  );
}
