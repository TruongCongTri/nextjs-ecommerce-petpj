import EditTopicCard from "@/components/cards/EditTopicCard";
import Container from "@/components/layouts/container";
import NotFoundLayout from "@/components/layouts/not-found-layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import prisma from "@/lib/db";
import { Category } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Plus, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function ViewCategoriesPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const fetchCategories = await prisma.category.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  if (!fetchCategories) {
    return <NotFoundLayout />;
  }
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
          <div className="text-3xl font-bold">Topics Dashboard</div>
          <div className="flex gap-4">
            <Button size="sm" variant="outline" className="w-29 text-center">
              <Link href={`${siteConfig.dashboard.viewPost}`}>Post</Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-29 text-center"
              disabled={true}
              asChild
            >
              <Link href={`${siteConfig.dashboard.viewCategory}`}>Topic</Link>
            </Button>
          </div>
        </div>
      </div>

      {fetchCategories.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">
            {`You don't have any categories yet!`}
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get started by creating your first category
          </p>
          <Link href={`${siteConfig.dashboard.createCategory}`}>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Create Your First Category
            </Button>
          </Link>
        </div>
      ) : (
        // <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        // <PersonalBlogPostList posts={fetchPosts as Post[]} />
        // </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-2 ">
          {fetchCategories.map((o, idx) => (
            <EditTopicCard key={idx} cate={o as Category} variant="default" />
          ))}
        </div>
      )}
    </Container>
  );
}
