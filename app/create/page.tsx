import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreateDashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  redirect(`${siteConfig.dashboard.editPost}`);
  return (
    <Container>
      <div className="space-x-4 flex justify-between">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex gap-4">
          <Link href="/create/category">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 w-4 h-4" />
              Category
            </Button>
          </Link>
          <Link href="/create/post">
            <Button size="sm">
              <Plus className="mr-2 w-4 h-4" />
              Post
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
