import React from "react";

import { breadcrumbConfig } from "@/data/breadcrumb";

import BreadcrumbResponsive from "@/components/layouts/Breadcrumb";

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-gray-200 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="lg:px-4 ">
            <div className="py-10">
              <BreadcrumbResponsive items={breadcrumbConfig.blogs} />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
