import Container from "@/components/layouts/container";
import { siteConfig } from "@/data/site-config";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditCategoriesPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  redirect(`${siteConfig.dashboard.viewCategory}`);

  return (
    <Container>
      <div>re-direct</div>
    </Container>
  );
}
