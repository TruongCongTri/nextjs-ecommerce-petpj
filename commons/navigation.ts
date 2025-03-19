import { LucideIcon } from "lucide-react";

interface NavType {
    title: string;
    url: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isGroup?: boolean;
  items?: NavType[];
}
