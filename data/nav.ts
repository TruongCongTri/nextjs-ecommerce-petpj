import {
  Command,
  AudioWaveform,
  GalleryVerticalEnd,
  LayoutDashboard,
  Headphones,
  Settings,
  BookOpenText,
  Pencil,
  MessagesSquare,
} from "lucide-react";
import { siteConfig } from "./site-config";


export const data = {
  teams: [
    {
      name: `${siteConfig.name}`,
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Dashlab Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: `/`,
      icon: LayoutDashboard,
    },
    //   {
    //     title: "Product",
    //     url: "#",
    //     icon: ShoppingBag,
    //     isActive: true,
    //     isGroup: true,
    //     items: [
    //       {
    //         title: "Products List",
    //         url: `/`,
    //       },
    //       {
    //         title: "Categories",
    //         url: `/`,
    //       },
    //     ],
    //   },
    {
      title: "Listening",
      url: `${siteConfig.topic.listening}`,
      icon: Headphones,
    },
    {
      title: "Reading",
      url: `${siteConfig.topic.reading}`,
      icon: BookOpenText,
    },
    {
      title: "Writing",
      url: `${siteConfig.topic.writing}`,
      icon: Pencil,
    },
    {
      title: "Speaking",
      url: `${siteConfig.topic.speaking}`,
      icon: MessagesSquare,
    },
  ],
  settings: [
    {
      title: "Support",
      url: `/`,
      icon: Headphones,
    },
    {
      title: "Settings",
      url: `/`,
      icon: Settings,
    },
  ],
};
