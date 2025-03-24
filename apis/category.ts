import { apiConfig } from "@/data/api";

const category = {
  async getCategories() {
    // const res = await fetch(`${apiConfig.category.categories}`, {
    //   next: { revalidate: 30 },
    // });
    const res = await fetch(`${apiConfig.category.categories}`);
    return res;
  },
  async getCategoryList() {
    // const res = await fetch(`${apiConfig.category.categoryList}`, {
    //   next: { revalidate: 30 },
    // });
    const res = await fetch(`${apiConfig.category.categoryList}`);
    return res;
  },
};

export default category;
