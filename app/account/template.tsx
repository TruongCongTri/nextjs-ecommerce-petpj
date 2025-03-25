"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { accountConfig } from "@/data/navigation";
import React, { ReactNode } from "react";

import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

export default function DashboardTemplate({ children }: LayoutProps) {
  const router = useRouter();
  const logout = async () => {
    deleteCookie("token"); // remove token from the cookie
    redirect("/"); // redirect to home page
  };

  return (
    <div className="h-full container mx-auto px-4 pt-4 pb-20 md:px-6 lg:px-8 lg:pt-8 lg:pb-20  flex gap-4">
      <Card className="hidden lg:flex lg:flex-col basis-1/4 lg:max-h-[410px]">
        <CardHeader className="-p-6">
          <CardTitle className="px-5 py-4 capitalize font-medium text-xl">
            Navigation
          </CardTitle>
        </CardHeader>
        <CardContent className="-p-6">
          <div className="flex flex-col w-full">
            {accountConfig.map((o, idx) => (
              <div
                key={idx}
                className="px-5 py-4 flex gap-3 font-normal text-base hover:bg-green-200 hover:bg-opacity-50 border-l-2 border-transparent hover:border-green-400  cursor-pointer"
                onClick={() => router.push(o.url)}
              >
                {o.icon && <o.icon className="size-6" />}
                <span>{o.title}</span>
              </div>
            ))}

            <div
              className="px-5 py-4 flex gap-3 font-normal text-base hover:bg-green-200 hover:bg-opacity-50 border-l-2 border-transparent hover:border-green-400 cursor-pointer"
              onClick={logout}
            >
              {/* <Button  variant='ghost' size='lg'> */}
              <LogOutIcon className="size-6" />
              Logout
              {/* </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
      {children}
    </div>
  );
}
