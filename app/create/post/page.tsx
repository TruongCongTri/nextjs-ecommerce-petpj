"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { createPost } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@/lib/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/layouts/container";
import { siteConfig } from "@/data/site-config";

const postTypes = [
  {
    value: "DOCUMENTATION",
  },
  { value: "PRACTICE" },
];
export default function CreatePostPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>();
  const [isCateLoading, setIsCateLoading] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [cateId, setCateId] = useState<string>("");
  const [postType, setPostType] = useState<string>("DOCUMENTATION");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    setIsCateLoading(true);
    async function fetchCategories() {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
      setIsCateLoading(false);
    }
    fetchCategories();
  }, []);

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
    console.log(slug);

    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      const result = await createPost({
        title: title,
        slug: slug,
        desc: desc,
        content: content,
        authorId: userId,
        categoryId: cateId,
        type: postType,
      });

      if (result.success) {
        toast.success("Post created successfully");
        router.push(`${siteConfig.dashboard.dashboard}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to create Post", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="mb-6">
        <Button variant="outline" size="sm" disabled={!isLoaded} asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Link>
        </Button>
      </div>
      <div className="text-3xl font-bold mb-8">Create New Post </div>
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
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="desc">Description</Label>
          <Input
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter category short description"
            className="bg-slate-50"
            required
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="content">Content</Label>
          <Input
            id="image"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter category content"
            className="bg-slate-50"
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="type">Type</Label>
          <Select onValueChange={(e) => setPostType(e)}>
            <SelectTrigger className="w-[180px]" disabled={isCateLoading}>
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {isCateLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {postTypes.map((o, idx) => (
                    <SelectItem key={idx} value={o.value}>
                      {o.value}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <Label htmlFor="topic">Topic</Label>
          <Select onValueChange={(e) => setCateId(e)}>
            <SelectTrigger className="w-[180px]" disabled={isCateLoading}>
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {isCateLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {categories?.map((o, idx) => (
                    <SelectItem key={idx} value={o.id}>
                      {o.title}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Post"}
        </Button>
      </form>
    </Container>
  );
}
