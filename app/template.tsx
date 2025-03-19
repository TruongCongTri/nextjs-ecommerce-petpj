
import Header from "@/components/layouts/Header";

import React, { ReactNode } from "react";
type LayoutProps = {
  children: ReactNode;
};
export default function RootTemplate({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      {/* <HeaderNavigation /> */}
      {children}
    </div>
  );
}
