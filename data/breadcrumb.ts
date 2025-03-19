import { BreadCrumbType } from "@/commons/breadcrumb";

export const breadcrumbConfig = {
  login: [{ href: "/", label: "Home" }, { label: "Login" }] as BreadCrumbType[],
  register: [
    { href: "/", label: "Home" },
    { label: "Register" },
  ] as BreadCrumbType[],
  forgotPassword: [
    { href: "/", label: "Home" },
    { label: "Forgot Password" },
  ] as BreadCrumbType[],
  resetPassword: [
    { href: "/", label: "Home" },
    { label: "Reset Password" },
  ] as BreadCrumbType[],

  categories: [
    { href: "/", label: "Home" },
    { label: "Categories" },
  ] as BreadCrumbType[],
  product: [
    { href: "/", label: "Home" },
    { label: "Product" },
  ] as BreadCrumbType[],

  account: [
    { href: "/", label: "Home" },
    { label: "Account" },
  ] as BreadCrumbType[],

  blogs: [{ href: "/", label: "Home" }, { label: "Blog" }] as BreadCrumbType[],

  wishlist: [
    { href: "/", label: "Home" },
    { label: "Wishlist" },
  ] as BreadCrumbType[],
  shoppingCart: [
    { href: "/", label: "Home" },
    { label: "Shopping Cart" },
  ] as BreadCrumbType[],
  checkOut: [
    { href: "/", label: "Home" },
    { href: "/cart", label: "Shopping Cart" },
    { label: "Check Out" },
  ] as BreadCrumbType[],

  contact: [
    { href: "/", label: "Home" },
    { label: "Contact Us" },
  ] as BreadCrumbType[],
  about: [
    { href: "/", label: "Home" },
    { label: "About Us" },
  ] as BreadCrumbType[],
};
