"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface DeleteCateButtonProps {
  cateId: string;
}

export default function DeleteCateButton({ cateId }: DeleteCateButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCategory(cateId);
      if (result.success) {
        toast.success("Category deleted successfully.");
        router.refresh(); // Refresh the page to reflect the changes
      } else {
        toast.error(result.message || "Failed to delete Category.");
      }
    } catch (error) {
      console.error("Error deleting Category:", error);
      toast.error("Failed to delete Category. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-destructive hover:bg-destructive hover:text-white items-center w-fit mt-auto cursor-pointer inline-flex"
        >
          <div className="order-1 group-hover:order-2">Delete</div>
          <Trash2 className="order-2 group-hover:order-1" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Category and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/80"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
