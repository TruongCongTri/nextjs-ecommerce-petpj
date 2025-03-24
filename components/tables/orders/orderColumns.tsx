"use client";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/tables/commons/column-header";

import { MoreHorizontal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ICartType } from "@/models/carts";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const orderColumns: ColumnDef<ICartType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: () => {
      const date = new Date();

      return <div className="font-normal text-sm">{date.toDateString()} {date.toTimeString()}</div>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-normal text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: () => {
      return <div className="font-normal text-sm">Processing</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only text-primary">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <VisuallyHidden>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
            </VisuallyHidden>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${order.id}`)}
              className="text-primary font-normal text-sm"
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  router.push(`${siteConfig.accounts.order}/${order.id}`)
                }
                className="text-primary font-normal text-sm"
              >
                View Order Details
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
