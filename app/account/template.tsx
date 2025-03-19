import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { accountConfig } from "@/data/navigation";
import Link from "next/link";
import React, { ReactNode } from "react";

import { LogOutIcon } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
};

export default function DashboardTemplate({ children }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 flex gap-4">
      <Card className="hidden lg:flex lg:flex-col basis-1/4">
        <CardHeader className="-p-6">
          <CardTitle className="px-2 py-4 capitalize">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="-p-6">
          <div className="flex flex-col w-full">
            {accountConfig.map((o, idx) => (
              <Link
                key={idx}
                href={o.url}
                className="px-2 py-4 flex gap-3 hover:bg-green-200 hover:bg-opacity-50 border-l-2 border-transparent hover:border-green-400"
              >
                {o.icon && <o.icon />}
                <span>{o.title}</span>
              </Link>
            ))}
            <div className="px-2 py-4 flex gap-3 hover:bg-green-200 hover:bg-opacity-50 border-l-2 border-transparent hover:border-green-400">
              <LogOutIcon />
              Logout
            </div>
          </div>
        </CardContent>
      </Card>
      {children}
    </div>
  );
}
