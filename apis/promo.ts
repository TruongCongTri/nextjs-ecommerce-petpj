const promo = {
  async getPromos() {
    const res = await fetch(`https://dummyjson.com/c/8e37-838f-4260-ae52`);
    return res;
  },
};

export default promo;
