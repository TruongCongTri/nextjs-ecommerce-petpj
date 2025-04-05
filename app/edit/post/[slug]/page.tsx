"use client";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  editPost,
  getPostForEditing,
} from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, use, useEffect } from "react";
import { toast } from "sonner";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [cateId, setCateId] = React.useState<string>("");
  const [postType, setPostType] = React.useState<string>("DOCUMENTATION");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { userId, isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isSignedIn) {
        router.push(`/posts/${slug}`);
      }
      try {
        const post = await getPostForEditing(slug);
        if (post.success) {
          setId(post.data?.id ?? "");
          setTitle(post.data?.title ?? "");
          setContent(post.data?.content ?? "");
          setDesc(post.data?.desc ?? "");
          setCateId(post.data?.categoryId ?? "");
          setPostType(post.data?.type ?? "DOCUMENTATION");
        } else {
          toast.error(`${post.message}`);
          router.push(`/posts/${slug}`);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        toast.error("Failed to fetch post.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchPost();
    }
  }, [slug, isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!userId) {
        throw new Error("User ID is not available");
      }

      const result = await editPost(id, {
        title,
        slug: slug,
        desc,
        content,
        authorId: userId,
        categoryId: cateId,
        type: postType,
      });
      if (result.success) {
        toast.success("Your post has been updated!");
        router.push(`/edit/post`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="mb-6 ">
        <Link href={`/edit/category`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <div className="text-3xl font-bold mb-8">Edit Posts</div>
      <form className="max-w-5xl space-y-6" onSubmit={handleSubmit}>
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
            placeholder="Enter category slug"
            className="bg-slate-50"
            disabled={true}
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
          <Input
            id="type"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            placeholder="Enter post type"
            className="bg-slate-50"
            disabled={true}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="desc">Topic</Label>
          <Input
            id="desc"
            value={cateId}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post topic"
            className="bg-slate-50"
            disabled={true}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Container>
  );
}
