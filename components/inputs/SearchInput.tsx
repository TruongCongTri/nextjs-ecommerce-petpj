// npm i use-debounce
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
// import { siteConfig } from "@/data/site";
import { useDebounce } from "use-debounce";

export default function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const pathname = usePathname();

  // delay for 1s
  const [debounceSearchInput] = useDebounce(query, 500);
  //   function clearInput() {
  //     setQuery("");
  //   }

  // function onSubmit(value: string) {
  //   setQuery(value);
  //   router.push(`${pathname}?query=${query}`);
  // }
  useEffect(() => {
    router.push(`${pathname}?query=${debounceSearchInput}`);
  }, [debounceSearchInput, pathname, router]);
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search items..."
          className="pl-10 rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
