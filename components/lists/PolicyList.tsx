import React from "react";
import { Card } from "../ui/card";
import { Headset, Package, ShoppingBag, Truck } from "lucide-react";

export default function PolicyList() {
  return (
    <Card>
      <div className="flex justify-between items-center p-10">
        <div className="flex gap-4 items-center">
          <Truck className="text-primary size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold">Free Shipping</div>
            <div className="text-sm font-normal text-muted-foreground">
              Free shipping on all your order
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Headset className="text-primary size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold">Customer Support 24/7</div>
            <div className="text-sm font-normal text-muted-foreground">
              Instant access to Support
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <ShoppingBag className="text-primary size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold">100% Secure Payment</div>
            <div className="text-sm font-normal text-muted-foreground">
              We ensure your money is save
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Package className="text-primary size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold">Money-Back Guarantee</div>
            <div className="text-sm font-normal text-muted-foreground">
              30 Days Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
