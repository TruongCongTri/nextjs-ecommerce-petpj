"use client";
import React, { useEffect, useState } from "react";

import { siteConfig } from "@/data/site";

import { Button } from "@/components/ui/button";
import { orderColumns } from "@/components/tables/orders/orderColumns";
import { ICartFetch } from "@/models/carts";

import { DataTable } from "../commons/data-table";
import { LoadingSpinner } from "@/components/icons/loading-icon";
import { useRouter } from "next/navigation";

export default function RecentOrderTable({ userId }: { userId: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<ICartFetch>();

  useEffect(() => {
    try {
      const fetchCarts = async () => {
        const cartsRes = await fetch(
          `https://dummyjson.com/carts` +
            `?skip=0` +
            `&limit=6` +
            `&sortBy=id&order=desc`
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
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading)
    return (
      <p className="w-full flex justify-center py-4">
        <LoadingSpinner />
      </p>
    );
  return (
    <>
      <div className="flex justify-between items-center px-6 py-4">
        <div className="capitalize font-medium text-xl">
          Recent Order History
        </div>
        <Button
          asChild
          variant="link"
          className="text-primary dark:text-white font-medium text-base"
        >
          <div onClick={() => router.push(`${siteConfig.accounts.order}`)} className="cursor-pointer">
            View All
          </div>
        </Button>
      </div>
      <div className="px-6">
        <DataTable columns={orderColumns} data={cart?.carts || []} />
      </div>
    </>
  );
}
