import { NavItem } from "@/commons/navigation";
import { Bot, SquareTerminal, LayoutDashboardIcon, RepeatIcon, HeartIcon, ShoppingBagIcon, SettingsIcon } from "lucide-react";
import { siteConfig } from "./site";

export const navConfig: NavItem[] = [
  {
    title: "Home",
    url: `${siteConfig.home}`,
    icon: SquareTerminal,
    isGroup: false,
  },
  {
    title: "Categories",
    url: `${siteConfig.proxy.shop}`,
    icon: SquareTerminal,
    isGroup: true,
    items: [
      {
        title: "Fruit & Vegetables",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "Meat & Fish",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "Beauty & Health",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "View all categories",
        url: `${siteConfig.proxy.shop}`,
      },
    ],
  },
  {
    title: "Blog",
    url: `${siteConfig.proxy.blog}`,
    icon: Bot,
    isGroup: false,
  },
  {
    title: "About Us",
    url: `${siteConfig.proxy.about}`,
    icon: Bot,
    isGroup: false,
  },
  {
    title: "Contact Us",
    url: `${siteConfig.helps.contact}`,
    icon: Bot,
    isGroup: false,
  },
];

export const footerConfig: NavItem[] = [
  {
    title: "My Account",
    url: `${siteConfig.accounts.dashboard}`,
    icon: SquareTerminal,
    isGroup: true,
    items: [
      {
        title: "My Account",
        url: `${siteConfig.accounts.dashboard}`,
      },
      {
        title: "Order History",
        url: `${siteConfig.accounts.order}`,
      },
      {
        title: "Shopping Cart",
        url: `${siteConfig.accounts.cart}`,
      },
      {
        title: "Wishlist",
        url: `${siteConfig.accounts.wishlist}`,
      },
    ],
  },
  {
    title: "Helps",
    url: `${siteConfig.accounts.dashboard}`,
    icon: SquareTerminal,
    isGroup: true,
    items: [
      {
        title: "Contact",
        url: `${siteConfig.helps.contact}`,
      },
      {
        title: "FAQS",
        url: `${siteConfig.helps.faqs}`,
      },
      {
        title: "Terms & Condition",
        url: `${siteConfig.helps.terms}`,
      },
      {
        title: "Privacy Policy",
        url: `${siteConfig.helps.policies}`,
      },
    ],
  },

  {
    title: "Proxy",
    url: `${siteConfig.accounts.dashboard}`,
    icon: SquareTerminal,
    isGroup: true,
    items: [
      {
        title: "About",
        url: `${siteConfig.proxy.about}`,
      },
      {
        title: "Shop",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "Product",
        url: `${siteConfig.proxy.product}`,
      },
      {
        title: "Blog",
        url: `${siteConfig.proxy.blog}`,
      },
    ],
  },
  {
    title: "Categories",
    url: `${siteConfig.accounts.dashboard}`,
    icon: SquareTerminal,
    isGroup: true,
    items: [
      {
        title: "Fruit & Vegetables",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "Meat & Fish",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "Bread & Bakery",
        url: `${siteConfig.proxy.shop}`,
      },
      {
        title: "Beauty & Health",
        url: `${siteConfig.proxy.shop}`,
      },
    ],
  },
];

export const accountConfig: NavItem[] = [
  {
    title: "Dashboard",
    url: `${siteConfig.accounts.dashboard}`,
    icon: LayoutDashboardIcon,
    isGroup: false,
  },
  {
    title: "Order History",
    url: `${siteConfig.accounts.order}`,
    icon: RepeatIcon,
    isGroup: false,
  },
  {
    title: "Wishlist",
    url: `${siteConfig.accounts.wishlist}`,
    icon: HeartIcon,
    isGroup: false,
  },
  {
    title: "Shopping Cart",
    url: `${siteConfig.accounts.cart}`,
    icon: ShoppingBagIcon,
    isGroup: false,
  },
  {
    title: "Setting",
    url: `${siteConfig.accounts.setting}`,
    icon: SettingsIcon,
    isGroup: false,
  },
];
