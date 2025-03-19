export const apiConfig = {
  authorization: {
    login: `${process.env.PUBLIC_DB_API}/auth/login`, //post - body
    currentUser: `${process.env.PUBLIC_DB_API}/auth/me`, //get - header
  },
  user: {
    user: `${process.env.PUBLIC_DB_API}/users`,
  },
  product: {
    products: `${process.env.PUBLIC_DB_API}/products`,
    addProd: `${process.env.PUBLIC_DB_API}/products/add`, //post - body
    prodByCate: `${process.env.PUBLIC_DB_API}/products/category`,
  },
  category: {
    categories: `${process.env.PUBLIC_DB_API}/products/categories`,
    categoryList: `https://dummyjson.com/products/category-list`,
  },
  cart: {
    carts: `${process.env.PUBLIC_DB_API}/carts`,
    cartByUser: `${process.env.PUBLIC_DB_API}/carts/user`,
    addCart: `${process.env.PUBLIC_DB_API}/carts/add`, //post - body
  },
  post: {
    posts: `${process.env.PUBLIC_DB_API}/posts`,
    addPost: `${process.env.PUBLIC_DB_API}/posts/add`, //post - body
  },
  comment: {
    comments: `${process.env.PUBLIC_DB_API}/comments`,
    addComment: `${process.env.PUBLIC_DB_API}/comments/add`, //post - body
    cmtByPost: `${process.env.PUBLIC_DB_API}/comments/post`,
  },
  quote: {
    quotes: `${process.env.PUBLIC_DB_API}/quotes`,
  },
};

export type ApiConfig = typeof apiConfig;
