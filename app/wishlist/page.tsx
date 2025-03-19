import WishlistLayout from "@/components/layouts/wishlist/Wishlist";
import React, { Suspense } from "react";

export default function WishListPage() {
  return (
    <div className="container mx-auto lg:px-8 px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20">
      <div className="lg:px-4 ">
        <Suspense fallback={<div>loading...</div>}>
          <WishlistLayout />
        </Suspense>
      </div>
    </div>
  );
}
