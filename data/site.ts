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
  accounts: {
    dashboard: "/account",
    order: "/account/order-history",
    wishlist: "/wishlist",
    cart: "/cart",
    checkOut: "/cart/check-out",
    setting: "/account/setting",
  },
  helps: {
    contact: "/contact-us",
    faqs: "/faqs",
    terms: "/terms",
    policies: "/policies",
  },
  proxy: {
    about: "/about-us",
    shop: "/categories",
    product: "/products",
    blog: "/blogs",
  },
  authorization: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
