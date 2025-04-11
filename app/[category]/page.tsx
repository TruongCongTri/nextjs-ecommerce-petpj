import React from "react";
import Container from "@/components/layouts/container";
import { redirect } from "next/navigation";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  redirect(`${category}/documentation`);

  return (
    <Container>
      <div>re-route</div>
    </Container>
  );
}
