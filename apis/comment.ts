import { apiConfig } from "@/data/api";

const comment = {
  async getComments() {
    const res = await fetch(`${apiConfig.comment.comments}`);
    return res;
  },
  async getCommentDetails(cmtId: number) {
    const res = await fetch(`${apiConfig.comment.comments}/${cmtId}`);
    return res;
  },

  async getCommentsByPost(postId: number) {
    const res = await fetch(`${apiConfig.comment.cmtByPost}/${postId}`);
    return res;
  },
};

export default comment;
