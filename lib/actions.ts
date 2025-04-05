"use server";
import { auth } from "@clerk/nextjs/server";
import { CreateCategoryInputProp, CreatePostInputProp } from "./types";
import prisma from "./db";

// posts
export async function createPost(data: CreatePostInputProp) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }
    // Validate the input data
    const post = await prisma.post.create({
      data: {
        title: data.title,
        desc: data.desc,
        slug: data.slug,
        content: data.content,
        authorId: userId,
        categoryId: data.categoryId,
        type: data.type,
      },
    });
    // If the post is created successfully,
    // return success status as true
    // with the post data
    return { success: true, data: post };
  } catch (error) {
    // Handle any errors that occur during the post creation
    console.error("Error creating post:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return {
      success: false,
      message: "Failed to create post",
    };
  }
}
export async function getPostListByCategoryId(cateId: string) {
  try {
    // Validate the input data
    const post = await prisma.post.findMany({
      where: {
        categoryId: cateId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: true, // Include the author information
        category: true,
      },
    });
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    return { success: true, data: post };
  } catch (error) {
    // Handle any errors that occur during the post creation
    console.error("Database Error:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Post not found" };
  }
}
export async function getPostByPostSlugByCateId(
  postSlug: string,
  cateId: string
) {
  try {
    // Validate the input data
    const post = await prisma.post.findUnique({
      where: {
        slug: postSlug,
        categoryId: cateId,
      },
      include: {
        author: true, // Include the author information
        category: true,
      },
    });
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    return { success: true, data: post };
  } catch (error) {
    // Handle any errors that occur during the post creation
    console.error("Database Error:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Post not found" };
  }
}

export async function getPostForEditing(postSlug: string) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }
    // Validate the input data
    const post = await prisma.post.findUnique({
      where: {
        slug: postSlug,
      },
    });
    // Check if the post exists
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    // If the post is found and the user is authorized,
    if (post.authorId !== userId) {
      return {
        success: false,
        message: "You do not have permission to edit this post",
      };
    }
    return { success: true, data: post };
  } catch (error) {
    // Handle any errors that occur during the post creation
    console.error("Database Error:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Post not found" };
  }
}
// edit post
export async function editPost(postId: string, data: CreatePostInputProp) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }
    // Validate the input data
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });
    // Check if the post exists
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    // Verify ownership before updating
    if (post.authorId !== userId) {
      return {
        success: false,
        message: "You do not have permission to edit this post",
      };
    }

    // Update the post
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        desc: data.desc,
        slug: data.slug,
        content: data.content,
        categoryId: data.categoryId,
        type: data.type,
        updatedAt: new Date(), // Update the updatedAt field
      },
    });
    return { success: true, message: "Edit post successfully" };
  } catch (error) {
    // Handle any errors that occur during the post creation
    console.error("Error updating post:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Failed to update post" };
  }
}
export async function deletePost(postId: string) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }
    // Verify ownership before updating
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    if (post.authorId !== userId) {
      return {
        success: false,
        message: "You do not have permission to edit this post",
      };
    }

    // Update the post
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    // If the post is deleted successfully,
    // return success status as true
    return { success: true, message: "Delete post successfully" };
  } catch (error) {
    // Handle any errors that occur during the post deleting
    console.error("Error deleting post:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return {
      success: false,
      message: "Failed to delete post",
    };
  }
}


// categories
export async function createCategory(data: CreateCategoryInputProp) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }
    // Validate the input data
    const cate = await prisma.category.create({
      data: {
        title: data.title,
        slug: data.slug,
        categoryImage: data.categoryImage,
        authorId: userId,
      },
    });
    // If the category is created successfully,
    // return success status as true
    // with the category data
    return { success: true, data: cate };
  } catch (error) {
    // Handle any errors that occur during the category creation
    console.error("Error creating category:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return {
      success: false,
      message: "Failed to create category",
    };
  }
}
export async function getCategoryByCategorySlug(cateSlug: string) {
  try {
    // Validate the input data
    const category = await prisma.category.findUnique({
      where: {
        slug: cateSlug,
      },
      include: {
        author: true, // Include the author information
      },
    });
    if (!category) {
      return { success: false, message: "Post not found" };
    }
    return { success: true, data: category };
  } catch (error) {
    // Handle any errors that occur during the post creation
    console.error("Database Error:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Category not found" };
  }
}
export async function getCategoryForEditing(cateSlug: string) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }

    // Validate the input data
    const category = await prisma.category.findUnique({
      where: {
        slug: cateSlug,
      },
      include: {
        author: true, // Include the author information
      },
    });

    // Check if the category exists
    if (!category) {
      return { success: false, message: "Category not found" };
    }
    // Verify ownership before updating
    if (category.authorId !== userId) {
      return {
        success: false,
        message: "You do not have permission to edit this category",
      };
    }

    return { success: true, data: category };
  } catch (error) {
    // Handle any errors that occur during the category editing
    console.error("Error fetching category for edit:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Failed to fetch category" };
  }
}
// edit category
export async function editCategory(
  cateId: string,
  data: CreateCategoryInputProp
) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }

    // get the category by id
    const category = await prisma.category.findUnique({
      where: {
        id: cateId,
      },
      select: {
        authorId: true,
      },
    });

    // Check if the category exists
    if (!category) {
      return { success: false, message: "Category not found" };
    }
    // Verify ownership before updating
    if (category.authorId !== userId) {
      return {
        success: false,
        message: "You do not have permission to edit this category",
      };
    }

    // Validate the input data
    await prisma.category.update({
      where: {
        id: cateId,
      },
      data: {
        title: data.title,
        slug: data.slug,
        categoryImage: data.categoryImage,
        updatedAt: new Date(), // Update the updatedAt field
      },
    });

    return { success: true, message: "Edit category successfully" };
  } catch (error) {
    // Handle any errors that occur during the category editing
    console.error("Error updating Category:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return { success: false, message: "Failed to update Category" };
  }
}
// delete category
export async function deleteCategory(cateId: string) {
  try {
    const { userId } = await auth();
    // Check if the user is authenticated
    if (!userId) {
      // If the user is not authenticated,
      // return success status as false
      // with an error message
      return { success: false, message: "User not authenticated" };
    }
    // Verify ownership before updating
    const category = await prisma.category.findUnique({
      where: {
        id: cateId,
      },
      select: {
        authorId: true,
      },
    });

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    if (category.authorId !== userId) {
      return {
        success: false,
        message: "You do not have permission to edit this category",
      };
    }

    // Update the post
    await prisma.category.delete({
      where: {
        id: cateId,
      },
    });

    // If the category is deleted successfully,
    // return success status as true
    return { success: true, message: "Delete category successfully" };
  } catch (error) {
    // Handle any errors that occur during the post deleting
    console.error("Error deleting category:", error);
    // If an error occurs,
    // return success status as false
    // with an error message
    return {
      success: false,
      message: "Failed to category post",
    };
  }
}
