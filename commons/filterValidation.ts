import { z } from "zod";

export const MIN_PRICE: number = 0;
export const MAX_PRICE: number = 40000;
export const DEFAULT_PAGE: number = 1;
export const DEFAULT_PER_PAGE: number = 15;
export const DEFAULT_PER_PAGE_BLOG: number = 10;
export const DEFAULT_SORT: string = "asc";
export const DEFAULT_RATE: string = "0";
export const RATINGS = [
  {
    key: "0",
    value: "All ratings",
  },
  {
    key: "1",
    value: "1 Star and above",
  },
  {
    key: "2",
    value: "2 Stars and above",
  },
  {
    key: "3",
    value: "3 Stars and above",
  },
  {
    key: "4",
    value: "4 Stars and above",
  },
  {
    key: "5",
    value: "5 Stars",
  },
];

export const FilterSchema = z.object({
  cates: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one category.",
  }),

  price: z
    .array(
      z
        .number()
        .min(MIN_PRICE, {
          message: `Price must be at least ${MIN_PRICE}.`,
        })
        .max(MAX_PRICE, {
          message: `Price must be at most ${MAX_PRICE}.`,
        })
    )
    .optional(),
  // rating: z.enum(RATINGS, {
  //   required_error: "You need to select a rating.",
  // }),
  // rating: z.string({
  //   required_error: "You need to select a rating.",
  // }),
  rating: z.string().optional(),
  tags: z
    .array(z.string())
    // .min(1)
    // .nonempty("Please select at least one tag."),
    .optional(),
});

export const FilterWithoutCateSchema = z.object({
  price: z
    .array(
      z
        .number()
        .min(MIN_PRICE, {
          message: `Price must be at least ${MIN_PRICE}.`,
        })
        .max(MAX_PRICE, {
          message: `Price must be at most ${MAX_PRICE}.`,
        })
    )
    .optional(),
  // rating: z.enum(RATINGS, {
  //   required_error: "You need to select a rating.",
  // }),
  // rating: z.string({
  //   required_error: "You need to select a rating.",
  // }),
  rating: z.string().optional(),
  tags: z
    .array(z.string())
    // .min(1)
    // .nonempty("Please select at least one tag."),
    .optional(),
});

export const PostFormSchema = z.object({
  query: z
    .string()
    // .min(2, {
    //   message: "search query must has at least 2 characters.",
    // })
    .optional(),
  cates: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one category.",
  }),
  tags: z
    .array(z.string())
    // .min(1)
    // .nonempty("Please select at least one tag."),
    .optional(),
});
