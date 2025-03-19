import BreadcrumbResponsive from "@/components/layouts/Breadcrumb";
import { breadcrumbConfig } from "@/data/breadcrumb";
import React from "react";

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gray-400 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="lg:px-4 ">
            <div className="py-10">
              <BreadcrumbResponsive items={breadcrumbConfig.resetPassword} />
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
