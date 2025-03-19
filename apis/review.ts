//https://dummyjson.com/c/b4ec-ebfd-4646-8a6f

const review = {
  async getReviews() {
    const res = await fetch(`https://dummyjson.com/c/b4ec-ebfd-4646-8a6f`, {
      next: { revalidate: 30 },
    });
    return res;
  },
};

export default review;
