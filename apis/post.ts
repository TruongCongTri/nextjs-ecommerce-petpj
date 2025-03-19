import { apiConfig } from "@/data/api";

const post = {
  async getPosts(skip?: number, limit?: number) {
    const res = await fetch(
      `${apiConfig.post.posts}` +
        `?${skip ? `skip=${skip}` : ""}` +
        `&${limit ? `limit=${limit}` : `limit=0`}`
    );
    return res;
  },
  async getRecentPosts(skip?: number, limit?: number) {
    const res = await fetch(
      `${apiConfig.post.posts}` +
        `?${skip ? `skip=${skip}` : ""}` +
        `&${limit ? `limit=${limit}` : `limit=0`}`
    );
    return res;
  },
  async getPostDetails(postId: number) {
    const res = await fetch(`${apiConfig.post.posts}/${postId}`);
    return res;
  },

  async getPostTags() {
    const res = await fetch(`https://dummyjson.com/c/9930-b3b9-499b-91d1`);
    return res;
  },
};

export default post;

