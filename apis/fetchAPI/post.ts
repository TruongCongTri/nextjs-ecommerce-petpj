import { IPostFetch } from "@/models/posts";
import apis from "..";


export const fetchPosts = async (
  skip?: number,
  limit?: number
): Promise<IPostFetch> => {
  const res = await apis.post.getPosts(skip, limit);
  return res.json();
};

export const fetchPostCategoryList = async (): Promise<string[]> => {
  const res = await apis.category.getCategoryList();
  return res.json();
};

export const fetchPostTagList = async (): Promise<string[]> => {
  const res = await apis.post.getPostTags();
  return res.json();
};
