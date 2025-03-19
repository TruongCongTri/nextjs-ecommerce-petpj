import { apiConfig } from "@/data/api";

const general = {
  async getPhones() {
    const res = await fetch(`${apiConfig.comment.comments}`);
    return res;
  },
  async getMails() {
    const res = await fetch(`${apiConfig.comment.comments}`);
    return res;
  },

  async getCommentsByPost(postId: number) {
    const res = await fetch(`${apiConfig.comment.cmtByPost}/${postId}`);
    return res;
  },
};

export default general;
