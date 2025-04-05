export const siteConfig = {
  name: "shadcn/ui",
  url: "https://ui.shadcn.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
  home: "/",
  topic: {
    listening: "/listening",
    reading: "/reading",
    speaking: "/speaking",
    writing: "/writing",
  },
  dashboard: {
    dashboard: "/dashboard",
    create: "/create",
    createCategory: "/create/category",
    createPost: "/create/post",
    edit: "/edit",
    editCategory: "/edit/category",
    editPost: "/edit/post",
  },
};

export type SiteConfig = typeof siteConfig;
