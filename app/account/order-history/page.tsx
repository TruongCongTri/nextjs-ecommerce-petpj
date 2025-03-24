import OrderHistoryTable from "@/components/tables/orders/OrderHistoryTable";
import { Card } from "@/components/ui/card";
import React from "react";

export default function OrderHistoryPage() {
  return (
    <div className="basis-full lg:basis-3/4">
      <Card>
        <OrderHistoryTable />
      </Card>
    </div>
  );
}
