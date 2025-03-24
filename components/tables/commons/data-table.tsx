"use client";
import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel, //pagination
  getSortedRowModel, //sorting
  SortingState, //sorting
  useReactTable,
  ColumnFiltersState, //filter
  getFilteredRowModel, //filter
  VisibilityState, //visibility
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { DataTablePagination } from "./table-pagination";
import { DataTableViewOptions } from "./column-toggle";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]); //sorting
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  ); //filtering
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({}); //visibility
  const [rowSelection, setRowSelection] = React.useState({}); //row selection

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //pagination
    onSortingChange: setSorting, //sorting
    getSortedRowModel: getSortedRowModel(), //sorting
    onColumnFiltersChange: setColumnFilters, //filtering
    getFilteredRowModel: getFilteredRowModel(), //filtering
    onColumnVisibilityChange: setColumnVisibility, //visibility
    onRowSelectionChange: setRowSelection, //row selection
    state: {
      sorting, //sorting
      columnFilters, //filtering
      columnVisibility, //visibility
      rowSelection, //row selection
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter order id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="lg:max-w-sm"
        />
        <DataTableViewOptions table={table} />
      </div>

      <div className="">
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
