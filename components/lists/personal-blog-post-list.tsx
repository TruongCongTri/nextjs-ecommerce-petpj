import React from "react";
// import DOMPurify from "isomorphic-dompurify";
import { Post } from "@/lib/types";
import EditPostCard from "../cards/EditPostCard";

export default function PersonalBlogPostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        // <Card key={post.id} className="h-full transition-all hover:shadow-md">
        //   <CardHeader>
        //     <CardTitle className="line-clamp-1">
        //       <Link href={`/posts/${post.id}`}>{post.title}</Link>
        //     </CardTitle>
        //   </CardHeader>
        //   <CardContent>
        //     <div className="text-mute-foreground line-clamp-2">
        //       {/* {DOMPurify.sanitize(post.content, {
        //         ALLOWED_TAGS: [],
        //       })} */}

        //     </div>
        //   </CardContent>
        //   <CardFooter className="flex flex-col items-center gap-4">
        //     <div className="text-sm text-muted-foreground">
        //       <time dateTime={post.createdAt.toISOString()}>
        //         {formatDate(post.createdAt)}
        //       </time>
        //     </div>
        //     <div className="flex gap-2">
        //       <Link href={`/posts/${post.id}`}>
        //         <Button variant={"outline"} size="sm">
        //           <Eye className="mr-2 h-4 w-4" />
        //           View
        //         </Button>
        //       </Link>
        //       <Link href={`/edit/${post.id}`}>
        //         <Button variant={"outline"} size="sm">
        //           <Edit className="mr-2 h-4 w-4" />
        //           Edit
        //         </Button>
        //       </Link>
        //       <DeletePostButton postId={post.id} />
        //     </div>
        //   </CardFooter>
        // </Card>
        <EditPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
