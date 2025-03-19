import { apiConfig } from "@/data/api";

const category = {
  async getCategories() {
    const res = await fetch(`${apiConfig.category.categories}`, {
      next: { revalidate: 30 },
    });
    return res;
  },
  async getCategoryList() {
    const res = await fetch(`${apiConfig.category.categoryList}`, {
      next: { revalidate: 30 },
    });
    return res;
  },
};

export default category;
