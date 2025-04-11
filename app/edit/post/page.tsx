import React from "react";
import { redirect } from "next/navigation";
import Container from "@/components/layouts/container";
import { auth } from "@clerk/nextjs/server";
import { siteConfig } from "@/data/site-config";

export default async function EditPostsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  redirect(`${siteConfig.dashboard.viewPost}`);

  return (
    <Container>
      <div>re-direct</div>
    </Container>
  );
}
