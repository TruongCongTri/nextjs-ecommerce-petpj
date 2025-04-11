import React from "react";
import Image from "next/image";

import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Edit, Eye } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Post } from "@/lib/types";
import DeletePostButton from "../buttons/DeletePost";
import { siteConfig } from "@/data/site-config";

export default function EditPostCard({ post }: { post: Post }) {
  return (
    <Card className="group relative overflow-hidden py-0 max-w-[380px] lg:max-w-[353px] h-full transition-all hover:border-primary hover:shadow-md flex flex-col gap-0">
      {/* <div className="group-hover:border-primary border border-gray-300 rounded-xl w-full h-full flex flex-col"> */}
      <figure className="flex flex-col items-center gap-4 relative">
        <Image
          src={
            post.category.categoryImage
              ? post.category.categoryImage
              : `/images/placeholder.svg`
          }
          alt={""}
          width={200}
          height={200}
          className="aspect-square rounded-xl"
        />
        <div className="text-primary font-semibold text-5xl capitalize">
          {post.category.title}
        </div>
      </figure>
      <div className="px-4 pt-4 pb-2">
        <Separator />
      </div>
      <CardContent className="px-4 py-2 flex flex-col gap-2 grow">
        <Badge className="absolute top-3 right-3 z-10 bg-primary hover:bg-primary">
          New
        </Badge>

        <div className="group-hover:text-primary">
          <Link
            href={`${siteConfig.dashboard.viewPost}/${post.slug}`}
            className="capitalize tracking-tight font-medium text-3xl cursor-pointer"
          >
            {post.title}
          </Link>
        </div>
        <div className="font-normal text-xl ">{post.desc}</div>
        <div className="flex gap-2">
          <Button
            className="flex gap-2 items-center w-fit mt-auto cursor-pointer inline-flex"
            asChild
          >
            <Link href={`${siteConfig.dashboard.viewPost}/${post.slug}`}>
              <div className="order-1 group-hover:order-2">View</div>
              <Eye className="order-2 group-hover:order-1" />
            </Link>
          </Button>
          <Button
            className="flex gap-2 items-center w-fit mt-auto cursor-pointer inline-flex"
            asChild
          >
            <Link href={`${siteConfig.dashboard.editPost}/${post.slug}`}>
              <div className="order-1 group-hover:order-2">Edit</div>
              <Edit className="order-2 group-hover:order-1" />
            </Link>
          </Button>
          <DeletePostButton postId={post.id} />
        </div>
      </CardContent>
      {/* </div> */}
    </Card>
  );
}
