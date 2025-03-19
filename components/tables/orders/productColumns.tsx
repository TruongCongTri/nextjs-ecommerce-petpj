"use client";
import { ColumnDef } from "@tanstack/react-table";

import { ISingleCartType } from "@/models/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productColumns: ColumnDef<ISingleCartType>[] = [
  {
    accessorKey: "product.name",
    header: "Product",
  },
  {
    accessorKey: "product.price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "subTotal",
    header: "SubTotal",
  },
];
