import EditCateCard from "@/components/cards/EditCateCard";
import Container from "@/components/layouts/container";
import NotFoundLayout from "@/components/layouts/not-found-layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import prisma from "@/lib/db";
import { Category } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditCategoriesPage() {
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
      <div className="flex justify-between mb-8 space-y-4">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <Button size="sm" variant="outline" className="w-40 text-center" asChild>
              <Link href={`${siteConfig.dashboard.editPost}`}>Post</Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-40 text-center"
              disabled={true}
            >
              <Link href={`${siteConfig.dashboard.editCategory}`}>Topic</Link>
            </Button>
          </div>
          <div className="text-3xl font-bold">Edit Topic Dashboard</div>
        </div>
        <div className="flex gap-4">
          <Button size="sm" variant="outline" asChild>
            <Link href="/edit">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Link>
          </Button>
        </div>
      </div>

      {fetchCategories.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">
            {`You don't have any posts yet!`}
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Get started by creating your first category
          </p>
          <Link href="/create/category">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Create Your First Category
            </Button>
          </Link>
        </div>
      ) : (
        // <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        // <PersonalBlogPostList posts={fetchPosts as Post[]} />
        // </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 ">
          {fetchCategories.map((o, idx) => (
            <EditCateCard key={idx} cate={o as Category} />
          ))}
        </div>
      )}
    </Container>
  );
}
