import BreadcrumbResponsive from "@/components/layouts/Breadcrumb";
import ShoppingCartLayout from "@/components/layouts/carts/ShoppingCart";
import { breadcrumbConfig } from "@/data/breadcrumb";
import React, { Suspense } from "react";

export default function CartPage() {
  return (
    <div>
      <div className="bg-gray-400 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="lg:px-4 ">
            <div className="py-10">
              <BreadcrumbResponsive items={breadcrumbConfig.shoppingCart} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto lg:px-8 px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20">
        <div className="lg:px-4 ">
          <Suspense fallback={<div>loading...</div>}>
            <ShoppingCartLayout />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
