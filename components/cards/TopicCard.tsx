import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Category } from "@/lib/types";

const cardVariants = {
  variant: {
    default: "bg-muted/50",
    bright: "bg-sky-300",
    dark: "bg-black",
  },
  title: {
    default: "bg-sky-300 hover:underline",
    bright: "bg-white hover:underline",
    dark: "bg-white hover:underline",
  },
  btn: {
    default: "bg-black text-sky-300",
    bright: "bg-white text-black",
    dark: "bg-white text-black",
  },
  link: {
    default: "text-black hover:text-sky-300",
    bright: "text-black hover:text-white",
    dark: "text-white hover:text-sky-300",
  },
};
export default function TopicCard({
  variant,
  item,
}: {
  variant: string;
  item: Category;
}) {
  return (
    <Card
      className={`rounded-xl ${variant === "dark" && cardVariants.variant.dark} 
      ${variant === "bright" && cardVariants.variant.bright}
      ${variant === "default" && cardVariants.variant.default}
      `}
    >
      <CardContent>
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex flex-col h-full justify-between">
            <Link
              href={`/${item.slug}/documentation`}
              className={`font-medium text-3xl p-1 rounded-xl w-fit ${
                variant === "dark" && cardVariants.title.dark
              } 
      ${variant === "bright" && cardVariants.title.bright}
      ${variant === "default" && cardVariants.title.default}`}
            >
              {item.title}
            </Link>

            <Collapsible>
              <CollapsibleTrigger>
                <div className="flex gap-2 items-center">
                  <div
                    className={`p-1 rounded-full ${
                      variant === "dark" && cardVariants.btn.dark
                    } 
      ${variant === "bright" && cardVariants.btn.bright}
      ${variant === "default" && cardVariants.btn.default}`}
                  >
                    <ArrowUpRight />
                  </div>
                  <div
                    className={`font-normal text-xl ${
                      variant === "dark" && cardVariants.link.dark
                    } 
      ${variant === "bright" && cardVariants.link.bright}
      ${variant === "default" && cardVariants.link.default}`}
                  >
                    Learn more
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <Link href={`${item.slug}/documentation`}>Documents</Link>
                  <Link href={`${item.slug}/practice`}>Practices</Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <Image
            src={
              item.categoryImage
                ? item.categoryImage
                : "/images/placeholder.svg"
            }
            width={200}
            height={300}
            alt={item.slug}
            placeholder="blur"
            blurDataURL="/images/placeholder.svg"
            className="w-[200px] h-[300px] rounded-xl"
          />
        </div>
      </CardContent>
    </Card>
  );
}
