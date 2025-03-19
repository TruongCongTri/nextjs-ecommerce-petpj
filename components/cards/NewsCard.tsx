import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/data/site";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  TagIcon,
  UserIcon,
  MessageSquareIcon,
  MoveRightIcon,
} from "lucide-react";
import { IPostType } from "@/models/posts";
import { IUserType } from "@/models/authorization";
import apis from "@/apis";
import { ICommentFetch } from "@/models/comments";

const fetchAuthor = async (userId: number): Promise<IUserType> => {
  const data = await apis.user.getUserById(userId);
  return data.json();
};
const fetchComments = async (postId: number): Promise<ICommentFetch> => {
  const data = await apis.comment.getCommentsByPost(postId);
  return data.json();
};

export default async function NewsCard(news: IPostType) {
  const author = await fetchAuthor(news.userId);
  const commentsData = await fetchComments(news.id);

  return (
    <Card className="lg:w-[395px] w-full group relative space-y-4 overflow-hidden">
      <div className="group-hover:border-green-400 border border-gray-300 rounded-xl">
        <figure className="group-hover:opacity-90">
          <div className="">
            <div className="bg-white/70 absolute bottom-[200px] left-4 size-[58px] rounded-xl dark:text-black flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="uppercase">18</div>
                <div className="uppercase">NOV</div>
              </div>
            </div>
          </div>
          <Image
            src={`/images/placeholder.svg`}
            alt="Post Image"
            width={395}
            height={295}
            className="object-cover w-full aspect-video rounded-t-xl"
          />
          {/* <CustomImage className="lg:w-[425px] md:w-[325px] w-[225px] rounded-t-xl max-w-[300px] max-h-[500px]">
            <CustomImageInput src={news.image} />
            <CustomImageFallback className="rounded-t-xl">
              CN
            </CustomImageFallback>
          </CustomImage> */}
        </figure>
        <CardContent className="px-6 pt-6 pb-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start gap-4">
              <div className="flex gap-1 items-center">
                <UserIcon className="size-4 text-gray-400" />
                <div className="capitalize font-normal text-sm">
                  {author.firstName} {author.lastName}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <MessageSquareIcon className="size-4 text-gray-400" />
                <div className="normal-case font-normal text-sm">
                  {commentsData.total} messages
                </div>
              </div>
            </div>
            <div className="flex justify-start gap-4">
              {news.tags.map((o, idx) => (
                <div key={idx} className="flex gap-1 items-center">
                  <TagIcon className="size-4 text-gray-400" />
                  <div className="capitalize font-normal text-sm">{o}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-medium group-hover:text-green-600 normal-case line-clamp-1">
                <Link href={`${siteConfig.proxy.blog}/${news.id}`}>
                  <span aria-hidden="true" className="absolute inset-0 " />
                  {news.title}
                </Link>
              </h3>
            </div>
          </div>
        </CardContent>
        <CardFooter className="">
          <Button
            variant="link"
            size="default"
            className="dark:text-black text-green-400 hover:text-green-800 -ml-2"
            asChild
          >
            <Link href={`${siteConfig.proxy.blog}/${news.id}`}>
              <p className="capitalize text-lg capitalize">read more</p>{" "}
              <MoveRightIcon className="size-4" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
