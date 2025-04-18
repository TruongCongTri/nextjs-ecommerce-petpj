import { IPostType } from "@/models/posts";
import React from "react";
import Image from "next/image";
import { Dot, MessageSquareIcon, TagIcon, UserIcon } from "lucide-react";
import { IUserType } from "@/models/authorization";
import { ICommentFetch } from "@/models/comments";
import apis from "@/apis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const fetchAuthor = async (userId: number): Promise<IUserType> => {
  const data = await apis.user.getUserById(userId);
  return data.json();
};
const fetchComments = async (postId: number): Promise<ICommentFetch> => {
  const data = await apis.comment.getCommentsByPost(postId);
  return data.json();
};

export default async function Detail({ post }: { post: IPostType }) {
  const author = await fetchAuthor(post.userId);
  const commentsData = await fetchComments(post.id);

  return (
    <div className="flex flex-col gap-8">
      <Image
        src={`/images/placeholder.svg`}
        alt="Post Image"
        width={600}
        height={800}
        className="object-cover w-full aspect-video rounded-xl"
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-start gap-4">
          <div className="flex gap-1 items-center">
            <UserIcon className="size-5 text-primary" />
            <div className="capitalize text-sm font-normal text-muted-foreground">
              {author.firstName} {author.lastName}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <MessageSquareIcon className="size-5 text-primary" />
            <div className="normal-case text-sm font-normal text-muted-foreground">
              {commentsData.total} Comments
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-4">
          {post.tags.map((o, idx) => (
            <div key={idx} className="flex gap-1 items-center">
              <TagIcon className="size-5 text-primary" />
              <div className="capitalize text-sm font-normal text-muted-foreground">
                {o}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-4xl font-medium group-hover:text-green-600 normal-case line-clamp-1">
            <span aria-hidden="true" className="absolute inset-0 " />
            {post.title}
          </h1>
        </div>
        <div className="w-full flex justify-between items-center py-2">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={author.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="capitalize line-clamp-2 font-medium text-base">
                {author.firstName} {author.lastName}
              </div>
              <div className="flex items-center gap-1 font-normal text-sm text-muted-foreground">
                <div className="capitalize">4 April 2025</div>
                <Dot />
                <div>6 min read</div>
              </div>
            </div>
          </div>
          <div>share options</div>
        </div>
        <Separator />

        <div className="mt-2 flex flex-col gap-2">
          <div className="font-normal text-xl ">{post.body}</div>
          <div className="flex justify-between gap-1">
            <Image
              src={`/images/placeholder.svg`}
              alt="Post Image"
              width={360}
              height={350}
              className="object-cover aspect-video rounded-xl"
            />
            <Image
              src={`/images/placeholder.svg`}
              alt="Post Image"
              width={360}
              height={350}
              className="object-cover aspect-video rounded-xl"
            />
          </div>
          <div className="font-normal text-xl ">{post.body}</div>
        </div>
      </div>
    </div>
  );
}
