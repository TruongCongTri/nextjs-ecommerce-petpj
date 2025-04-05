import {
  Post as PrismaPost,
  Category as PrismaCate,
  User,
} from "@prisma/client";
// export enum TYPE {
//   DOCUMENTATION = "documentation",
//   PRACTICE = "practice",
// }
export interface CreateCategoryInputProp {
  title: string;
  slug: string;
  categoryImage: string;
  authorId: string;
}

export interface CreatePostInputProp {
  title: string;
  slug: string;
  desc: string;
  content: string;
  authorId: string;
  categoryId: string;
  type: string;
}
export interface Category extends PrismaCate {
  author: User;
}
export interface Post extends PrismaPost, PrismaCate {
  author: User;
  category: Category;
}

export interface BlogPostListProps {
  posts: Post[]; // Assuming Post is the type for your posts
  // Add any other props you need for the BlogPostList component
}
