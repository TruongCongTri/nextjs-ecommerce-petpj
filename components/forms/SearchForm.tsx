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
import { ISearchProps } from "@/commons/props";
import { siteConfig } from "@/data/site";
import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SearchDialog({ categories, products }: ISearchProps) {
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
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((prod) => (
              <CommandItem key={prod.id} asChild>
                <Link
                  href={`${siteConfig.proxy.product}/${prod.id}`}
                  className="flex gap-2 items-center"
                >
                  <Avatar>
                    <AvatarImage src={prod.images[0]} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{prod.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Categories">
            {categories.map((cate) => (
              <CommandItem key={cate.id}>
                <Link
                  href={`${siteConfig.proxy.shop}/${cate.id}`}
                  className="flex gap-2 items-center"
                >
                  {/* <User /> */}
                  <Avatar>
                    <AvatarImage src={cate.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{cate.name}</span>
                  {/* <CommandShortcut>⌘P</CommandShortcut> */}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
