"use client";
import React, { useEffect, useState } from "react";

import { DataTable } from "@/components/tables/commons/data-table";

import { orderColumns } from "./orderColumns";
import { ordersData } from "@/data/data";
import { deleteCookie, getCookie } from "cookies-next";
import { siteConfig } from "@/data/site";
import { useRouter } from "next/navigation";
import { IUserType } from "@/models/authorization";
import { IOrderFetch } from "@/models/orders";

export default function OrderHistoryTable() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [auth, setAuth] = useState<IUserType>();
  const [cart, setCart] = useState<IOrderFetch>();
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

          const fetchCarts = async () => {
            const cartsRes = await fetch(
              `https://dummyjson.com/carts/${auth?.id}`,
              {
                method: "GET",
              }
            );
            if (!cartsRes.ok) {
              console.log(`error getting carts data`);
              setIsLoading(false);
            } else {
              const cartData = await cartsRes.json();
              setCart(cartData);
              setIsLoading(false);
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
      deleteCookie("token");
    }
  }, [router, token]);

  if (isLoading) return <p>Loading...</p>;
  if (isExpired) return router.push(`${siteConfig.authorization.login}`);
  return <DataTable columns={orderColumns} data={ordersData} />;
}
