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
import { ArrowLeft, Plus, PlusIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ViewPostsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const fetchCates = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
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

  const getDocumentsByCate = async (cateId: string) => {
    const documents = fetchDocuments.filter((o) => o.categoryId === cateId);
    if (documents.length === 0) {
      return (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">
            {`You don't have any posts belong to this topic yet!`}
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get started by creating your first post
          </p>
          <Link href={`${siteConfig.dashboard.createPost}`}>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Create Your Post
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 w-full ">
        {documents.map((o, idx) => (
          <EditPostCard key={idx} post={o as Post} />
        ))}
      </div>
    );
  };

  const getPracticesByCate = async (cateId: string) => {
    const practices = fetchPractices.filter((o) => o.categoryId === cateId);
    if (practices.length === 0) {
      return (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">
            {`You don't have any posts belong to this topic yet!`}
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get started by creating your first post
          </p>
          <Link href={`${siteConfig.dashboard.createPost}`}>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Create Your Post
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 w-full ">
        {practices.map((o, idx) => (
          <EditPostCard key={idx} post={o as Post} />
        ))}
      </div>
    );
  };

  return (
    <Container>
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex justify-between items-center w-full ">
          <Button size="sm" variant="outline" asChild>
            <Link href={`${siteConfig.dashboard.dashboard}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Link>
          </Button>
          <div className="flex gap-4">
            <Button size="sm" asChild>
              <Link href={`${siteConfig.dashboard.createPost}`}>
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`${siteConfig.dashboard.createCategory}`}>
                <Plus className="mr-2 h-4 w-4" /> New Topic
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">Posts Dashboard</div>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="outline"
              disabled={true}
              className="w-29 text-center"
            >
              <Link href={`${siteConfig.dashboard.viewPost}`}>Post</Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-29 text-center"
              asChild
            >
              <Link href={`${siteConfig.dashboard.viewCategory}`}>Topic</Link>
            </Button>
          </div>
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

        <Tabs defaultValue="document">
          <TabsList className="w-[340px] mb-2 ">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="document" className="w-full">
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
              <Tabs defaultValue={fetchCates[0].id} className="w-full">
                <TabsList className="w-[340px] mb-2">
                  {fetchCates?.map((o, idx) => (
                    <TabsTrigger key={idx} value={o.id}>
                      {o.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {fetchCates?.map((o, idx) => (
                  <TabsContent key={idx} value={o.id}>
                    {getDocumentsByCate(o.id)}
                  </TabsContent>
                ))}
              </Tabs>
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
              <Tabs defaultValue={fetchCates[0].id} className="w-full">
                <TabsList className="w-[340px] mb-2">
                  {fetchCates?.map((o, idx) => (
                    <TabsTrigger key={idx} value={o.id}>
                      {o.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {fetchCates?.map((o, idx) => (
                  <TabsContent key={idx} value={o.id}>
                    {getPracticesByCate(o.id)}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      )}
    </Container>
  );
}
