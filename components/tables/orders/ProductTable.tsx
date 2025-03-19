import React from "react";

import { cartsData } from "@/data/data";

import { DataOnlyTable } from "@/components/tables/commons/data-only-table";
import { productColumns } from "./productColumns";
import { ISingleCartType } from "@/models/types";

async function getData(): Promise<ISingleCartType[]> {
  // Fetch data from your API here.
  return cartsData;
}

export default async function ProductTable() {
  const data = await getData();
  return <DataOnlyTable columns={productColumns} data={data} />;
}
