import { NavItem } from "@/commons/navigation";
import { mailConfig, phoneConfig } from "@/data/information";
import { siteConfig } from "@/data/site";
import { SproutIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function FooterMain({ items }: { items: NavItem[] }) {
  return (
    // bg-muted
    // <div className="bg-black text-white dark:bg-muted dark:text-white py-12 px-4 md:px-6">
    //   <footer className="container mx-auto lg:px-8">
    <footer className="bg-black text-white dark:bg-muted dark:text-white py-12 px-4 md:px-6">
      <div className="container mx-auto lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 md:mb-20 mb-10">
          <div className="col-span-2 flex flex-col items-start gap-4">
            <Link
              href={siteConfig.home}
              className="flex items-center gap-2 "
              prefetch={false}
            >
              <SproutIcon className="h-8 w-8 text-primary" />
              <span className="font-medium text-3xl">Ecobazar</span>
            </Link>
            <p className="text-muted-foreground font-normal text-sm max-w-[330px]">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
              dui, eget bibendum magna congue nec.
            </p>
            <div className="flex gap-4">
              <div className="pb-2 border-b border-primary font-medium text-sm">
                <a href={`tel:${phoneConfig[0].phone}`}>
                  {phoneConfig[0].phone}
                </a>
              </div>
              <div className="text-muted-foreground font-normal text-base">
                or
              </div>
              <div className="pb-2 border-b border-primary font-medium text-sm">
                <a href={`mailto:${mailConfig[0].mail}`}>
                  {mailConfig[0].mail}
                </a>
              </div>
            </div>
          </div>

          {items.map((item, idx) => (
            <div key={idx} className="grid gap-2">
              <h4 className="font-medium text-base mb-5">{item.title}</h4>
              {item.isGroup && (
                <>
                  {item.items?.map((subItem, idx) => (
                    <Link
                      key={idx}
                      href={subItem.url}
                      className="font-normal text-sm text-muted-foreground hover:text-white"
                      prefetch={false}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
        <Separator />
        <div className="container max-w-7xl mt-12 flex items-center justify-between">
          <p className="font-normal text-sm text-muted-foreground">
            Ecobazar eCommerce &copy; 2021. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="font-normal text-sm hover:underline"
              prefetch={false}
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="font-normal text-sm hover:underline"
              prefetch={false}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
