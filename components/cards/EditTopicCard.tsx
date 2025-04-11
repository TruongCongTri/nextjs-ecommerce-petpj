import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/types";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import DeleteCateButton from "../buttons/DeleteCate";
import { siteConfig } from "@/data/site-config";

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
export default function EditTopicCard({
  variant,
  cate,
}: {
  variant: string;
  cate: Category;
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
              href={`${siteConfig.dashboard.editCategory}/${cate.slug}`}
              className={`font-medium text-3xl p-1 rounded-xl w-fit ${
                variant === "dark" && cardVariants.title.dark
              } 
      ${variant === "bright" && cardVariants.title.bright}
      ${variant === "default" && cardVariants.title.default}`}
            >
              {cate.title}
            </Link>

            <div className="flex gap-2">
              <Button
                className="flex gap-2 items-center w-fit mt-auto cursor-pointer inline-flex"
                asChild
              >
                <Link
                  href={`${siteConfig.dashboard.editCategory}/${cate.slug}`}
                >
                  <div className="order-1 group-hover:order-2">Edit</div>
                  <Edit className="order-2 group-hover:order-1" />
                </Link>
              </Button>
              <DeleteCateButton cateId={cate.id} />
            </div>
          </div>
          <Image
            src={
              cate.categoryImage
                ? cate.categoryImage
                : "/images/placeholder.svg"
            }
            width={200}
            height={300}
            alt={cate.slug}
            className="w-[200px] h-[300px] rounded-xl"
          />
        </div>
      </CardContent>
    </Card>
  );
}
