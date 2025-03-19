import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { DotIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Separator } from "@/components/ui/separator";
import ProductTable from "@/components/tables/orders/ProductTable";

export default function OrderDetailPage() {
  return (
    <div className="basis-full lg:basis-3/4">
      <Card>
        <CardHeader className="-p-6 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="px-2 py-4 capitalize lg:flex items-center">
              Order Details
              <div className="text-gray-400 lg:flex items-center">
                <DotIcon /> <span>April 24, 2021</span> <DotIcon />
                <span>3 Products</span>
              </div>
            </CardTitle>
            <Button
              asChild
              variant="link"
              className="text-green-400 dark:text-white -px-4"
            >
              <Link href={`${siteConfig.accounts.order}`} className="">
                Back to List
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="lg:flex w-full pt-6">
          <Card className="w-full">
            <CardHeader className="-p-6 border-b px-5 py-4">
              Billing Address
            </CardHeader>
            <CardContent className="-p-6 px-5 py-4">
              <div>Dainne Russell</div>
              <div>4140 Parker Rd. Allentown, New Mexico 31134</div>
              <div>Email</div>
              <div>dainne.ressell@gmail.com</div>
              <div>Phone</div>
              <div>(671) 555-0110</div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="-p-6 border-b px-5 py-4">
              Shipping Address
            </CardHeader>
            <CardContent className="-p-6 px-5 py-4">
              <div>Dainne Russell</div>
              <div>4140 Parker Rd. Allentown, New Mexico 31134</div>
              <div>Email</div>
              <div>dainne.ressell@gmail.com</div>
              <div>Phone</div>
              <div>(671) 555-0110</div>
            </CardContent>
          </Card>

          <Card className="lg:ml-6 w-full">
            <CardHeader className="-p-6 border-b px-5 py-4 ">
              <div className="flex justify-between items-center space-x-4">
                <div>
                  <div>Order ID:</div>
                  <div>#4152</div>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <div>Payment Method:</div>
                  <div>PayPal</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="-p-6 px-5 py-4">
              <div className="flex justify-between pb-4">
                <div>Subtotal:</div>
                <div>$365.00</div>
              </div>
              <Separator />
              <div className="flex justify-between py-4">
                <div>Discount:</div>
                <div>20%</div>
              </div>
              <Separator />
              <div className="flex justify-between py-4">
                <div>Shipping:</div>
                <div>Free</div>
              </div>
              <Separator />
              <div className="flex justify-between pt-4">
                <div>Total:</div>
                <div>$84.00</div>
              </div>
            </CardContent>
          </Card>
        </CardContent>

        <ProductTable />
      </Card>
    </div>
  );
}
