"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
// import { siteConfig } from "@/data/site";

export default function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const pathname = usePathname();

  //   function clearInput() {
  //     setQuery("");
  //   }

  function onSubmit(value: string) {
    setQuery(value);
    router.push(`${pathname}?query=${value}`);
  }
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search items..."
          className="pl-10 rounded-xl"
          value={query}
          onChange={(e) => onSubmit(e.target.value)}
        />
        {/* <Button
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
          variant="ghost"
          size="icon"
          onClick={clearInput}
          asChild
        >
          <X />
        </Button> */}
      </div>
    </div>
  );
}
