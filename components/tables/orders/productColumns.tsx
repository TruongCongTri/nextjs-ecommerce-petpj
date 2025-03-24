"use client";
import { ColumnDef } from "@tanstack/react-table";

// import { ISingleCartType } from "@/models/types";
import { ICartProductType } from "@/models/carts";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productColumns: ColumnDef<ICartProductType>[] = [
  {
    accessorKey: "title",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "discountedTotal",
    header: "SubTotal",
  },
];
