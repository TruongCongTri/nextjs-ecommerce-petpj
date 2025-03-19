import apis from "@/apis";
import { ICommentFetch } from "@/models/comments";
import { IPostType } from "@/models/posts";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dot } from "lucide-react";
import { Separator } from "../ui/separator";

const fetchComments = async (postId: number): Promise<ICommentFetch> => {
  const data = await apis.comment.getCommentsByPost(postId);
  return data.json();
};

export default async function CommentList({ post }: { post: IPostType }) {
  const commentsData = await fetchComments(post.id);

  return (
    <div className="">
      <div>Comments</div>
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
                  <div className="flex gap-1">
                    <div className="capitalize">{o.user.fullName}</div>
                    <Dot />
                    <div>26 Apr 2025</div>
                  </div>
                  <div>{o.body}</div>
                </div>
              </div>
            </div>
            {commentsData.comments.length - 1 !== idx && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
