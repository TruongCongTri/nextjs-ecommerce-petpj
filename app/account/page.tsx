"use client";
import React, { useEffect, useState } from "react";

import RecentOrderTable from "@/components/tables/orders/RecentOrderTable";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/data/site";

import { IUserType } from "@/models/authorization";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [auth, setAuth] = useState<IUserType>();

  const token = getCookie("token");
  useEffect(() => {
    // console.log(token); // Logging the token value for debugging purposes
    try {
      setIsLoading(true);

      const fetchAuth = async () => {
        const authRes = await /* providing accessToken in bearer */
        fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
          },
          // credentials: "include", // Include cookies (e.g., accessToken) in the request
        });
        if (!authRes.ok) {
          console.log(`error getting auth data`);
          setIsLoading(false);
          setIsExpired(true);
          deleteCookie("token");
        } else {
          const authData = await authRes.json();
          setAuth(authData);
          setIsLoading(false);
          setIsExpired(false);
        }
      };

      fetchAuth();
    } catch (error) {
      console.error("error", error);
      router.push(`${siteConfig.authorization.login}`);
      setIsLoading(false);
      setIsExpired(true);
      deleteCookie("token");
    }
  }, [router, token]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-6 basis-full lg:basis-3/4">
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="w-full py-8">
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <Skeleton className="rounded-full size-[120px]" />
                {/* name */}
                <Skeleton className="h-6 w-[200px]" />
                {/* role */}
                <Skeleton className="h-6 w-[200px]" />
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center space-y-2">
                <Skeleton className="h-6 w-[100px]" />
              </CardFooter>
            </Card>
            <Card className="w-full py-8">
              <CardHeader className="flex flex-col space-y-2 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start">
                {/* billing */}
                <Skeleton className="h-6 w-[100px]" />
              </CardHeader>
              <CardContent className="flex flex-col space-y-2 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start">
                {/* address */}
                <Skeleton className="h-6 w-[250px]" />
                {/* email */}
                <Skeleton className="h-6 w-[200px]" />
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start">
                <Skeleton className="h-6 w-[100px]" />
              </CardFooter>
            </Card>
          </div>
          <Card className="w-full h-full"></Card>
        </div>
      ) : (
        <>
          {isExpired ? (
            <></>
          ) : (
            <div className="flex flex-col gap-6 basis-full lg:basis-3/4">
              <div className="flex flex-col lg:flex-row gap-6">
                <Card className="w-full py-8">
                  <CardContent className="flex flex-col items-center justify-center">
                    <Avatar className="size-[120px]">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      {auth?.firstName} {auth?.maidenName} {auth?.lastName}
                    </div>
                    <div>Customer</div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center justify-center">
                    <Button
                      asChild
                      variant="link"
                      className="text-green-400 dark:text-white"
                    >
                      <Link
                        href={`${siteConfig.accounts.setting}`}
                        className=""
                      >
                        Edit Profile
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full">
                  <CardHeader className="flex flex-col space-y-2 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start">
                    Billing Address
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-2 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start">
                    <div>
                      {auth?.firstName} {auth?.maidenName} {auth?.lastName}
                    </div>
                    <div>
                      {auth?.address.address}, {auth?.address.city},{" "}
                      {auth?.address.state}, {auth?.address.country}
                    </div>
                    <div>{auth?.email}</div>
                    <div>{auth?.phone}</div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2 justify-center items-center text-center lg:justify-start lg:items-start lg:text-start">
                    <Button
                      asChild
                      variant="link"
                      className="text-green-400 dark:text-white -px-4"
                    >
                      <Link
                        href={`${siteConfig.accounts.setting}`}
                        className=""
                      >
                        Edit Address
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <Card className="">
                <RecentOrderTable />
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
}
