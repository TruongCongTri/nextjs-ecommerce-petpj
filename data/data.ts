// import { IUserType } from "@/models/authorization";
import {
  IProductType,
  ICategoryType,
  IPromoType,
  ITagType,
  ISingleCartType,
  // INewsType,
  // ICustomerReviewType,
  // IOrderType,
  IFAQType,
} from "@/models/types";

export const productsData: IProductType[] = [
  {
    id: 1,
    name: "Green Apple",
    description: "descssssssssssssssssssssssss",
    images: [
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
      "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
      "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
      "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
    ],
    price: "10.0",
    categoryId: 1,
    category: {
      id: 1,
      name: "Fresh Fruit",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  {
    id: 2,
    name: "Tomato",
    description: "descssssssssssssssssssssssss",
    images: ["string", "string", "string"],
    price: "10.0",
    categoryId: 1,
    category: {
      id: 1,
      name: "Fresh Fruit",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  {
    id: 3,
    name: "Carrot",
    description: "descssssssssssssssssssssssss",
    images: ["string", "string", "string"],
    price: "10.0",
    categoryId: 1,
    category: {
      id: 1,
      name: "Fresh Fruit",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  {
    id: 4,
    name: "Pork Chop",
    description: "descssssssssssssssssssssssss",
    images: ["string", "string", "string"],
    price: "10.0",
    categoryId: 2,
    category: {
      id: 2,
      name: "Meat & Fish",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  {
    id: 5,
    name: "Tuna",
    description: "descssssssssssssssssssssssss",
    images: ["string", "string", "string"],
    price: "10.0",
    categoryId: 2,
    category: {
      id: 2,
      name: "Meat & Fish",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  {
    id: 6,
    name: "Tender loin",
    description: "descssssssssssssssssssssssss",
    images: ["string", "string", "string"],
    price: "10.0",
    categoryId: 2,
    category: {
      id: 2,
      name: "Meat & Fish",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  {
    id: 7,
    name: "Salmon",
    description: "descssssssssssssssssssssssss",
    images: ["string", "string", "string"],
    price: "10.0",
    categoryId: 2,
    category: {
      id: 2,
      name: "Meat & Fish",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
];

export const categoriesData: ICategoryType[] = [
  {
    id: 1,
    name: "Fresh Fruit",
    description: "descssssssssssssssssssssssss",
    image: "string",
  },
  {
    id: 2,
    name: "Meat & Fish",
    description: "descssssssssssssssssssssssss",
    image: "string",
  },
  {
    id: 3,
    name: "Bread & Bakery",
    description: "descssssssssssssssssssssssss",
    image: "string",
  },
  {
    id: 4,
    name: "Vegetable",
    description: "descssssssssssssssssssssssss",
    image: "string",
  },
];

// export const customerReviewsData: ICustomerReviewType[] = [
//   {
//     id: 1,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 1,
//       name: "Robert Fox",
//       email: "robert-fox@gmail.com",
//       role: "user",
//       avatar: "https://github.com/shadcn.png",
//     },
//     rating: 4.5,
//     comment:
//       "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 2,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 2,
//       name: "Dianne Russell",
//       email: "dianne-russell@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 4,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 3,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 3,
//       name: "Eleanor Pena",
//       email: "eleanor-pena@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 3.5,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 4,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 4,
//       name: "Eleanor Penabb",
//       email: "eleanor-penabb@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 1,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 5,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 5,
//       name: "Eleanor Penacc",
//       email: "eleanor-penacc@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 1.5,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 6,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 6,
//       name: "Eleanor Penadd",
//       email: "eleanor-penadd@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 2.5,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 7,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 6,
//       name: "Eleanor Penadd",
//       email: "eleanor-penadd@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 3,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },

//   {
//     id: 8,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 5,
//       name: "Eleanor Penacc",
//       email: "eleanor-penacc@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 2,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 9,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 1,
//       name: "Robert Fox",
//       email: "robert-fox@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 5,
//     comment:
//       "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
//   {
//     id: 10,
//     productId: 1,
//     product: {
//       id: 1,
//       name: "Green Apple",
//       description: "descssssssssssssssssssssssss",
//       images: [
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//         "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
//         "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
//       ],
//       price: "10.0",
//       categoryId: 1,
//       category: {
//         id: 1,
//         name: "Fresh Fruit",
//         description: "descssssssssssssssssssssssss",
//         image: "string",
//       },
//     },
//     user: {
//       id: 2,
//       name: "Dianne Russell",
//       email: "dianne-russell@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     rating: 0.5,
//     comment:
//       " Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
//     publishedTime: "2 min ago",
//   },
// ];

export const promosData: IPromoType[] = [
  {
    id: 1,
    type: "Summer Sale",
    size: "large",
    title: "Fresh & Healthy Organic Food",
    description: "Sale up to 30% OFF",
    policies: "Free shipping on all your order.",
    href: "",
    image: "",
  },
  {
    id: 2,
    type: "Summer Sale",
    size: "small",
    title: "75% OFF",
    description: "",
    policies: "Only Fruit & Vegetable",
    href: "",
    image: "",
  },
  {
    id: 3,
    type: "Best Deal",
    size: "small",
    title: "Special Products Deal of the Month",
    description: "",
    policies: "",
    href: "",
    image: "",
  },
  {
    id: 4,
    type: "Best Deal",
    size: "medium",
    title: "Sale of the Month",
    description: "",
    policies: "",
    href: "",
    image: "",
  },
  {
    id: 5,
    type: "85% Fat Free",
    size: "medium",
    title: "Low-Fat Meat",
    description: "Started at $79.99",
    policies: "",
    href: "",
    image: "",
  },
  {
    id: 6,
    type: "Summer Sale",
    size: "medium",
    title: "100% Fresh Fruit",
    description: "Up to 64% OFF",
    policies: "",
    href: "",
    image: "",
  },
  {
    id: 7,
    type: "Summer Sale",
    size: "full",
    title: "37% OFF",
    description: "",
    policies:
      "Free on all your order, Free Shipping and 30 days money-back guarantee",
    href: "",
    image: "",
  },
];

// export const newsData: INewsType[] = [
//   {
//     id: 1,
//     author: {
//       id: 1,
//       username: "Robert Fox",
//       email: "robert-fox@gmail.com",
//       role: "user",
//       image: "string",
//     },
//     tittle:
//       "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
//     content: "string",
//     publishedDate: "29 Jan",
//     image: "",
//   },
//   {
//     id: 2,
//     author: {
//       id: 1,
//       name: "Robert Fox",
//       email: "robert-fox@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     tittle:
//       "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
//     content: "string",
//     publishedDate: "21 Feb",
//     image: "",
//   },
//   {
//     id: 3,
//     author: {
//       id: 1,
//       name: "Robert Fox",
//       email: "robert-fox@gmail.com",
//       role: "user",
//       avatar: "string",
//     },
//     tittle:
//       "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
//     content: "string",
//     publishedDate: "18 Nov",
//     image: "",
//   },
// ];

// export const usersData: IUserType[] = [
//   {
//     id: 1,
//     name: "Robert Fox",
//     email: "robert-fox@gmail.com",
//     role: "user",
//     avatar: "https://github.com/shadcn.png",
//   },
//   {
//     id: 2,
//     name: "Dianne Russell",
//     email: "dianne-russell@gmail.com",
//     role: "user",
//     avatar: "string",
//   },
//   {
//     id: 3,
//     name: "Eleanor Pena",
//     email: "eleanor-pena@gmail.com",
//     role: "user",
//     avatar: "string",
//   },
//   {
//     id: 4,
//     name: "Eleanor Penabb",
//     email: "eleanor-penabb@gmail.com",
//     role: "user",
//     avatar: "string",
//   },
//   {
//     id: 5,
//     name: "Eleanor Penacc",
//     email: "eleanor-penacc@gmail.com",
//     role: "user",
//     avatar: "string",
//   },
//   {
//     id: 6,
//     name: "Eleanor Penadd",
//     email: "eleanor-penadd@gmail.com",
//     role: "user",
//     avatar: "string",
//   },
// ];

export const tagsData: ITagType[] = [
  { value: "healthy", label: "Healthy" },
  { value: "lowfat", label: "Low Fat" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "kidfoods", label: "Kid foods" },
  { value: "vitamins", label: "Vitamins" },
  { value: "bread", label: "Bread" },
  { value: "meat", label: "Meat" },
  { value: "snacks", label: "Snacks" },
  { value: "tiffin", label: "Tiffin" },
  { value: "launch", label: "Launch" },
  { value: "dinner", label: "Dinner" },
  { value: "breakfast", label: "Breakfast" },
  { value: "fruit", label: "Fruit" },
];

export const singleCartData: ISingleCartType = {
  quantity: 10,
  product: {
    id: 1,
    name: "Green Apple",
    description: "descssssssssssssssssssssssss",
    images: [
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
      "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
      "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
      "https://i.postimg.cc/dVX61dzH/prop-greenapple.jpg",
      "https://i.postimg.cc/TPGPZ44x/prod-greenapple-02.jpg",
    ],
    price: "10.0",
    categoryId: 1,
    category: {
      id: 1,
      name: "Fresh Fruit",
      description: "descssssssssssssssssssssssss",
      image: "string",
    },
  },
  subTotal: 70,
};

export const cartsData: ISingleCartType[] = [
  singleCartData,
  singleCartData,
  singleCartData,
];

// export const singleOrdersData: IOrderType = {
//   id: "728ed52f",
//   date: "4 April, 2021",
//   status: "processing",
//   buyer: {
//     id: 1,
//     name: "Robert Fox",
//     email: "robert-fox@gmail.com",
//     role: "user",
//     avatar: "https://github.com/shadcn.png",
//   },
//   // cart: cartsData,
//   discount: 20,
//   shipping: "Free",
//   total: 84,
//   paymentMethod: "Paypal",
// };

// export const ordersData: IOrderType[] = [
//   singleOrdersData,
//   singleOrdersData,
//   singleOrdersData,
//   singleOrdersData,
// ];

export const faqsData: IFAQType[] = [
  {
    question: "In elementum est a ante sodales iaculis.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.",
  },
  {
    question: "Etiam lobortis massa eu nibh tempor elementum.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.",
  },
  {
    question: "In elementum est a ante sodales iaculis.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.",
  },
  {
    question: "Aenean quis quam nec lacus semper dignissim.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.",
  },
  {
    question: "Nulla tincidunt eros id tempus accumsan.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.",
  },
];

export const partnersData = [
  {
    name: "steps",
    icon: "/partners/steps.svg",
    url: "/",
  },

  {
    name: "mango",
    icon: "/partners/mango.svg",
    url: "/",
  },
  {
    name: "food",
    icon: "/partners/food.svg",
    url: "/",
  },
  {
    name: "steps",
    icon: "/partners/food-capital.svg",
    url: "/",
  },
  {
    name: "bookoff",
    icon: "/partners/bookoff.svg",
    url: "/",
  },
  {
    name: "gseries",
    icon: "/partners/gseries.svg",
    url: "/",
  },
];
