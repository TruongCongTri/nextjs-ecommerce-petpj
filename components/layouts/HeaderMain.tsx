import Link from "next/link";
// import { SearchForm } from "../ui/customize/forms/search-form";
import { JSX, SVGProps } from "react";
import { siteConfig } from "@/data/site";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  ChevronRight,
  HeartIcon,
  ShoppingCartIcon,
  SproutIcon,
} from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { NavItem } from "@/commons/navigation";
import { SearchDialog } from "../forms/SearchForm";

import { CartButton } from "../buttons/CartButton";

export default function HeaderMain({ items }: { items: NavItem[] }) {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8  flex justify-between h-20 w-full shrink-0 items-center ">
      <div className="flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <VisuallyHidden.Root>
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden.Root>
            <Link href={siteConfig.home} prefetch={false}>
              <SproutIcon className="h-8 w-8 text-primary" />
              <span>Ecobazar</span>
            </Link>
            <div className="grid gap-2 py-6">
              {items.map((item, idx) => (
                <div key={idx}>
                  {!item.isGroup ? (
                    <Link
                      href={item.url}
                      className="flex w-full items-center py-2 text-lg font-semibold"
                      prefetch={false}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <Collapsible
                      defaultOpen={false}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger className="flex w-full items-center py-2 text-lg font-semibold">
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-2">
                        {item.items?.map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.url}
                            className="border-l pl-4 flex w-full items-center py-2 text-md font-semibold"
                            prefetch={false}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href={siteConfig.home}
          className="mr-6  lg:flex pl-4"
          prefetch={false}
        >
          <SproutIcon className="h-8 w-8 text-primary" />
          <span className="font-medium text-3xl hidden lg:grid">Ecobazar</span>
        </Link>
      </div>
      {/* <SearchForm /> */}
      <SearchDialog  />
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" >
          <Link href={siteConfig.accounts.wishlist}>
            <HeartIcon  className="size-8" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Link href={siteConfig.accounts.cart}>
            <ShoppingCartIcon className="size-8" />
          </Link>
        </Button>
        <CartButton />
      </div>
    </div>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
