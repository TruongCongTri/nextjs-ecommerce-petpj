import { apiConfig } from "@/data/api";
const user = {
  async getUserById(userId: number) {
    const res = await fetch(`${apiConfig.user.user}/${userId}`);
    return res;
  },
  async getUsers() {
    // const res = await fetch(`${apiConfig.user.user}?limit=10`, {
    //   next: { revalidate: 30 },
    // });
    const res = await fetch(`${apiConfig.user.user}?limit=10`);
    return res;
  },
};

export default user;
