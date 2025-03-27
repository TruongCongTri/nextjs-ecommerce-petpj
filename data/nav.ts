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
import { siteConfig } from "./site";

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
      title: "Dashboard",
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
      url: `${siteConfig.listening.listening}`,
      icon: Headphones,
    },
    {
      title: "Reading",
      url: `${siteConfig.reading.reading}`,
      icon: BookOpenText,
    },
    {
      title: "Writing",
      url: `${siteConfig.writing.writing}`,
      icon: Pencil,
    },
    {
      title: "Speaking",
      url: `${siteConfig.speaking.speaking}`,
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
