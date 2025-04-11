import React from "react";

import Container from "@/components/layouts/container";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { siteConfig } from "@/data/site-config";

export default async function EditDashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  redirect(`${siteConfig.dashboard.viewPost}`);
  return (
    <Container>
      <div className="flex items-center justify-between mb-8 space-y-4">
        <div className="text-3xl font-bold">Dashboard</div>
      </div>
    </Container>
  );
}
