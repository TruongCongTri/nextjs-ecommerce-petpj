"use client";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editCategory, getCategoryForEditing } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, use, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";


export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { userId, isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!isSignedIn) {
        router.push(`/categories/${slug}`);
      }
      try {
        const category = await getCategoryForEditing(slug);
        if (category.success) {
          setId(category.data?.id ?? "");
          setTitle(category.data?.title ?? "");
          setThumbnail(category.data?.categoryImage ?? "");
        } else {
          toast.error(`${category.message}`);
          router.push(`/categories/${slug}`);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
        toast.error("Failed to fetch category.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchCategory();
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

      const result = await editCategory(id, {
        title,
        slug: slug,
        categoryImage: thumbnail,
        authorId: userId,
      });
      if (result.success) {
        toast.success("Your Category has been updated!");
        router.push(`/edit/category`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category.");
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
          <Button variant="outline" size="sm" disabled={!isLoaded || isLoading || isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <div className="text-3xl font-bold mb-8">Edit Category</div>
      <form className="max-w-5xl space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter category title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-50"
            required
            disabled={isLoading || isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="Enter category slug"
            value={slug}
            className="bg-slate-50"
            disabled={true || isLoading || isSubmitting}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="image">Thumbnail</Label>
          <Input
            id="image"
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Enter category image"
            className="bg-slate-50"
            disabled={isLoading || isSubmitting}
          />
        </div>
        <div>
          <Image
            src={thumbnail ? thumbnail : `/images/placeholder.svg`}
            alt={""}
            width={200}
            height={300}
            className="w-[200px] h-[300px] rounded-xl"
          />
        </div>
        <Button type="submit" disabled={!isLoaded || isLoading || isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
          {isLoading && "Loading..."}
        </Button>
      </form>
    </Container>
  );
}
