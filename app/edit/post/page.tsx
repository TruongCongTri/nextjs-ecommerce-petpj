import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import EditPostCard from "@/components/cards/EditPostCard";
import Container from "@/components/layouts/container";
import NotFoundLayout from "@/components/layouts/not-found-layout";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Post } from "@/lib/types";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function EditPostsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const fetchPosts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      category: true,
    },
  });
  if (!fetchPosts) {
    return <NotFoundLayout />;
  }
  const fetchDocuments = fetchPosts.filter((o) => o.type === "DOCUMENTATION");
  const fetchPractices = fetchPosts.filter((o) => o.type === "PRACTICE");
  return (
    <Container>
      <div className="flex justify-between mb-8 space-y-4">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="outline"
              disabled={true}
              className="w-40 text-center"
            >
              <Link href={`${siteConfig.dashboard.editPost}`}>Post</Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-40 text-center"
              asChild
            >
              <Link href={`${siteConfig.dashboard.editCategory}`}>Topic</Link>
            </Button>
          </div>
          <div className="text-3xl font-bold">Edit Posts Dashboard</div>
        </div>
        <div className="flex gap-4">
          <Button size="sm" variant="outline" asChild>
            <Link href="/edit">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Link>
          </Button>
        </div>
      </div>

      {fetchPosts.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">
            {`You don't have any posts yet!`}
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get started by creating your first post
          </p>
          <Link href="/create/post">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        // <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        // <PersonalBlogPostList posts={fetchPosts as Post[]} />
        // </div>

        <Tabs defaultValue="document" className="w-full">
          <TabsList className="w-[340px] mb-2">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="document">
            {fetchDocuments.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium">
                  {`You don't have any documents yet!`}
                </h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  Get started by creating your first document
                </p>
                <Link href="/create/post">
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" /> Create Your First
                    Document
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 ">
                {fetchDocuments.map((o, idx) => (
                  <EditPostCard key={idx} post={o as Post} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="practice">
            {fetchPractices.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium">
                  {`You don't have any practices yet!`}
                </h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  Get started by creating your first practice
                </p>
                <Link href="/create/post">
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" /> Create Your First
                    Practice
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 ">
                {fetchPractices.map((o, idx) => (
                  <EditPostCard key={idx} post={o as Post} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </Container>
  );
}
