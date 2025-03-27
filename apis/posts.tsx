import { apiConfig } from "@/data/api";

const post = {
  async getPosts(limit?: number, skip?: number) {
    const res = await fetch(
      `${apiConfig.post.posts}` +
        `?${skip ? `skip=${skip}` : ""}` +
        `&${limit ? `limit=${limit}` : `limit=0`}`
    );
    return res;
  },
  async getRecentPosts(limit?: number, skip?: number) {
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
    const res = await fetch(`${apiConfig.post.postTags}`);
    return res;
  },
};

export default post;

