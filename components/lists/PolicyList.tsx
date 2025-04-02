import React from "react";
import { Card } from "../ui/card";
import { Headset, Package, ShoppingBag, Truck } from "lucide-react";

export default function PolicyList() {
  return (
    <Card>
      <div className="flex justify-between lg:items-center p-4 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Truck className="text-primary lg:size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold text-center lg:text-left">Free Shipping</div>
            <div className="hidden lg:grid text-sm font-normal text-muted-foreground">
              Free shipping on all your order
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Headset className="text-primary lg:size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold text-center lg:text-left">Customer Support 24/7</div>
            <div className="hidden lg:grid text-sm font-normal text-muted-foreground">
              Instant access to Support
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <ShoppingBag className="text-primary lg:size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold text-center lg:text-left">100% Secure Payment</div>
            <div className="hidden lg:grid text-sm font-normal text-muted-foreground">
              We ensure your money is save
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Package className="text-primary lg:size-10" />
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold text-center lg:text-left">Money-Back Guarantee</div>
            <div className="hidden lg:grid text-sm font-normal text-muted-foreground">
              30 Days Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
