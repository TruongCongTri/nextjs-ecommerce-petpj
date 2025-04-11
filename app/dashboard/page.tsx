import Container from "@/components/layouts/container";
import { siteConfig } from "@/data/site-config";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  redirect(`${siteConfig.dashboard.viewPost}`);
  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <div className="text-3xl font-bold">Dashboard</div>
      </div>
    </Container>
  );
}
