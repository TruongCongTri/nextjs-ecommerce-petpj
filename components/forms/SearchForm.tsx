"use client";

import * as React from "react";
import Link from "next/link";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";

import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { siteConfig } from "@/data/site";
import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { ICategoryType } from "@/models/categories";
import { IProductType } from "@/models/products";
import { LoadingSpinner } from "../icons/loading-icon";

export function SearchDialog() {
  // export function SearchDialog() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [catList, setCateList] = useState<ICategoryType[]>([]);
  const [isCateLoading, setIsCateLoading] = useState(false);
  const [prodList, setProdList] = useState<IProductType[]>([]);
  const [isProdLoading, setIsProdLoading] = useState(false);

  useEffect(() => {
    setIsCateLoading(true);
    const fetchCates = async () => {
      const res = await fetch('https://dummyjson.com/products/categories');
      if (!res.ok) {
        console.log(`error getting categories data`);
        setIsCateLoading(false);
      }
      const data = await res.json();
      setCateList(data);
      setIsCateLoading(false);
      console.log(data);
      
    };
    setIsProdLoading(true);
    const fetchProds = async () => {
      // const res = await apis.product.getProducts(0, 0);
      const res = await fetch(`https://dummyjson.com/products?limit=0`);
      if (!res.ok) {
        console.log(`error getting products data`);
        setIsProdLoading(false);
      }
      const data = await res.json();
      setProdList(data.products);
      setIsProdLoading(false);
      console.log(data.products);
      
    };
    fetchCates();
    fetchProds();
  }, []);

  // const [inputValue, setInputValue] = React.useState("");
  // const handleValueChange = (value: string) => {
  //   setInputValue(value);
  //   setOpen(!!value);
  // };
  // const filteredCommands = Array.isArray(commands)
  //   ? commands.filter((command) =>
  //       command.label.toLowerCase().includes(inputValue.toLowerCase())
  //     )
  //   : [];
  // console.log("filteredCommands", filteredCommands);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" asChild>
        <div className="w-[120px] lg:w-[300px] p-2 border rounded-lg text-sm text-muted-foreground flex justify-between">
          <div className="flex items-center gap-1">
            <Search className="mr-2 h-4 w-4 " />
            Search...
          </div>
          <kbd className="hidden lg:grid pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Ctrl + S</span>
          </kbd>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Search for product or category</DialogTitle>
        </VisuallyHidden>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-[500px]">
          {!isCateLoading || !isProdLoading && <CommandEmpty>No results found.</CommandEmpty>}
          <CommandGroup heading="Products">
            {isProdLoading ? (
              <div className="w-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="min-h-[150px] max-h-[300px] overflow-y-auto overflow-x-hidden">
                {prodList.map((prod) => (
                  <CommandItem key={prod.id} asChild>
                    <Link
                      href={`${siteConfig.proxy.product}/${prod.id}`}
                      className="flex gap-2 items-center"
                    >
                      <Avatar>
                        <AvatarImage src={prod.thumbnail} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>{prod.title}</span>
                    </Link>
                  </CommandItem>
                ))}
              </div>
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Categories">
            {isCateLoading ? (
              <div className="w-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="min-h-[150px] max-h-[300px] overflow-y-auto overflow-x-hidden">
                {catList.map((cate, idx) => (
                  <CommandItem key={idx}>
                    <Link
                      href={`${siteConfig.proxy.shop}/${cate.slug}`}
                      className="flex gap-2 items-center"
                    >
                      {/* <User /> */}
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>{cate.name}</span>
                      {/* <CommandShortcut>⌘P</CommandShortcut> */}
                    </Link>
                  </CommandItem>
                ))}
              </div>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
