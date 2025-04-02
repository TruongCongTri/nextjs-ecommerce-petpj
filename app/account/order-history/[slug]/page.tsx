import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { DotIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Separator } from "@/components/ui/separator";
import { ICartType } from "@/models/carts";
import apis from "@/apis";
import { IUserType } from "@/models/authorization";
import { DataOnlyTable } from "@/components/tables/commons/data-only-table";
import { productColumns } from "@/components/tables/orders/productColumns";

const fetchCart = async (cartId: number): Promise<ICartType> => {
  const data = await apis.cart.getCartDetails(cartId);
  return data.json();
};
const fetchUser = async (userId: number): Promise<IUserType> => {
  const data = await apis.user.getUserById(userId);
  return data.json();
};
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await fetchCart(parseInt(slug));
  const userData = await fetchUser(data.userId);
  return (
    <div className="w-[380px] lg:w-full basis-full lg:basis-3/4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="capitalize lg:flex items-center">
              <div className="font-medium text-xl">Order Details</div>
              <div className="text-gray-400 lg:flex items-center">
                <DotIcon />
                <span className="font-normal text-sm text-muted-foreground">
                  April 24, 2021
                </span>
                <DotIcon />
                <span className="font-normal text-sm text-muted-foreground">
                  {data.totalProducts} Products
                </span>
              </div>
            </CardTitle>
            <Button
              asChild
              variant="link"
              className="text-primary -px-4 font-medium text-base"
            >
              <Link href={`${siteConfig.accounts.order}`} className="">
                Back to List
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className=" w-full space-y-6">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 w-full pt-6">
            {/* billing address */}
          <Card className="w-full lg:rounded-r-none">
            <CardHeader className="-p-6 px-5 py-4 border-b font-medium text-sm text-muted-foreground">
              Billing Address
            </CardHeader>
            <CardContent className="-p-6 px-5 py-4">
              <div className="h-full flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <div className="font-normal text-base">
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div className="font-normal text-sm text-muted-foreground">
                    {userData.address.address} {userData.address.city}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="font-medium text-xs text-muted-foreground">
                      Email
                    </div>
                    <div className="font-medium text-sm">{userData.email}</div>
                  </div>
                  <div>
                    <div className="font-medium text-xs text-muted-foreground">
                      Phone
                    </div>
                    <div className="font-medium text-sm">{userData.phone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* shipping address */}
          <Card className="w-full lg:rounded-l-none lg:border-l-none">
            <CardHeader className="-p-6 border-b px-5 py-4 font-medium text-sm text-muted-foreground">
              Shipping Address
            </CardHeader>
            <CardContent className="-p-6 px-5 py-4">
              <div className="h-full flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <div className="font-normal text-base">
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div className="font-normal text-sm text-muted-foreground">
                    {userData.address.address} {userData.address.city}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="font-medium text-xs text-muted-foreground">
                      Email
                    </div>
                    <div className="font-medium text-sm">{userData.email}</div>
                  </div>
                  <div>
                    <div className="font-medium text-xs text-muted-foreground">
                      Phone
                    </div>
                    <div className="font-medium text-sm">{userData.phone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* order info */}
          <Card className="lg:ml-6 w-full">
            <CardHeader className="-p-6 border-b px-5 py-4 ">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-xs text-muted-foreground">
                    Order ID:
                  </div>
                  <div className="font-normal text-sm">#4152</div>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <div className="font-medium text-xs text-muted-foreground">
                    Payment Method:
                  </div>
                  <div className="font-normal text-sm">PayPal</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="-p-6 px-5 py-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="font-normal text-sm text-muted-foreground">
                    Subtotal:
                  </div>
                  <div className="font-medium text-sm">$365.00</div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-normal text-sm text-muted-foreground">
                    Discount:
                  </div>
                  <div className="font-medium text-sm">20%</div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-normal text-sm text-muted-foreground">
                    Shipping:
                  </div>
                  <div className="font-medium text-sm">Free</div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-normal text-lg">Total:</div>
                  <div className="font-semibold text-lg text-primary">
                    $84.00
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
          <div >
          <DataOnlyTable columns={productColumns} data={data.products} />
        </div>
        </CardContent>

        {/* <ProductTable /> */}
        
      </Card>
    </div>
  );
}
