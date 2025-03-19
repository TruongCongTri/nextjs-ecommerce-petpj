"use client";
import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataOnlyTable<TData, TValue>({
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
