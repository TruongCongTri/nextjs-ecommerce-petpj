"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { createCategory } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Container from "@/components/layouts/container";
import { siteConfig } from "@/data/site-config";
export default function CreateCategoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>;
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log({ title, slug, image });
    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      const result = await createCategory({
        title,
        slug,
        categoryImage: image,
        authorId: userId,
      });

      if (result.success) {
        toast.success("Category created successfully");
        router.push(`${siteConfig.dashboard.dashboard}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to create category", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="mb-6">
        <Button variant="outline" size="sm" disabled={!isLoaded || isSubmitting} asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Link>
        </Button>
      </div>
      <div className="text-3xl font-bold mb-8">Create New Category </div>
      <form className="max-w-3xl space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category title"
            className="bg-slate-50"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter category slug"
            className="bg-slate-50"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="image">Thumbnail</Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter category image"
            className="bg-slate-50"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Image
            src={image ? image : `/images/placeholder.svg`}
            alt={""}
            width={200}
            height={300}
            className="w-[200px] h-[300px] rounded-xl"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Category"}
        </Button>
      </form>
    </Container>
  );
}
