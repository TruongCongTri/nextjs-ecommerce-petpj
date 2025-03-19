import OrderHistoryTable from "@/components/tables/orders/OrderHistoryTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function OrderHistoryPage() {
  return (
    <div className="basis-full lg:basis-3/4">
      <Card>
        <CardHeader className="-p-6">
          <CardTitle className="px-2 py-4 capitalize">Order History</CardTitle>
        </CardHeader>
        <OrderHistoryTable />
      </Card>
    </div>
  );
}
