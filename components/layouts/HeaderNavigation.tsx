import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PhoneCallIcon } from "lucide-react";
import { NavItem } from "@/commons/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { phoneConfig } from "@/data/information";

export default function HeaderNavigation({ items }: { items: NavItem[] }) {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full justify-between items-center hidden lg:flex text-muted-foreground">
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item, idx) => (
            <div key={idx}>
              {item.isGroup ? (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuTrigger className="text-sm font-medium hover:text-primary">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {item.items?.map((subItem, idx) => (
                        <ListItem
                          key={idx}
                          href={subItem.url}
                          // title={subItem.title}
                        >
                          {subItem.title}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuLink key={idx} asChild>
                  <Link
                    href={item.url}
                    className="group inline-flex h-[60px] w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors 
                    hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary focus:outline-none 
                    disabled:pointer-events-none disabled:opacity-50 
                    data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 
                    dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-primary dark:focus:bg-gray-800 dark:focus:text-primary 
                    dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    prefetch={false}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </div>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <a href={`tel:${phoneConfig[0].phone}`}>
        <div className="flex gap-1 items-center text-sm font-medium">
          <PhoneCallIcon className="size-6" />
          {phoneConfig[0].phone}
        </div>
      </a>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-sm font-medium text-muted-foreground",
            "hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary ",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
