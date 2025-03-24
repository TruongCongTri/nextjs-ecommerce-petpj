import apis from "@/apis";
import { ICommentFetch } from "@/models/comments";
import { IPostType } from "@/models/posts";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dot } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const fetchComments = async (postId: number): Promise<ICommentFetch> => {
  const data = await apis.comment.getCommentsByPost(postId);
  return data.json();
};

export default async function CommentList({ post }: { post: IPostType }) {
  const commentsData = await fetchComments(post.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="font-medium text-2xl">Comments</div>
      <div>
        {commentsData.comments.map((o, idx) => (
          <div key={idx} className="my-6">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-3 items-start">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <div className="capitalize font-medium text-sm">
                      {o.user.fullName}
                    </div>
                    <Dot />
                    <div className="font-normal text-sm text-muted-foreground">
                      26 Apr 2025
                    </div>
                  </div>
                  <div className="font-normal text-sm text-muted-foreground">
                    {o.body}
                  </div>
                </div>
              </div>
            </div>
            {commentsData.comments.length - 1 !== idx && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>
      <Button
        className="rounded-full w-[140px] bg-white border border-primary text-primary"
        size="lg"
      >
        Load More
      </Button>
    </div>
  );
}
