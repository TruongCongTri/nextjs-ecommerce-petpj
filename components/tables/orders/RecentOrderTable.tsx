import React from "react";
import Link from "next/link";

import { IOrderType } from "@/models/types";
import { siteConfig } from "@/data/site";
import { ordersData } from "@/data/data";

import { Button } from "@/components/ui/button";
import { orderColumns } from "@/components/tables/orders/orderColumns";
import { DataOnlyTable } from "@/components/tables/commons/data-only-table";



export default function RecentOrderTable() {
  
  return (
    <>
      <div className="flex justify-between items-center px-2 py-4">
        <div className="capitalize">Recent Order History</div>
        <Button
          asChild
          variant="link"
          className="text-green-400 dark:text-white"
        >
          <Link href={siteConfig.accounts.order} className="">
            View All
          </Link>
        </Button>
      </div>
      {/* <DataOnlyTable columns={orderColumns} data={data} /> */}
    </>
  );
}
