"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { CountrySlimSelector } from "../ui/customize/countrySelector/country-slim-select";
import { siteConfig } from "@/data/site";
import { ModeToggle } from "@/components/buttons/ModeToggle";

// import { useAuthStore } from "@/store/userAuthStore";
import { useRouter, redirect } from "next/navigation";

import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { IUserType } from "../../models/authorization";
import { Skeleton } from "../ui/skeleton";
import { Slash } from "lucide-react";
import { Separator } from "../ui/separator";

export default function HeaderAuthorization() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [auth, setAuth] = useState<IUserType>();

  // const authenticated = useAuthStore((state) => state.authenticated);
  // const user = useAuthStore((state) => state.user);
  const token = getCookie("token");
  useEffect(() => {
    // console.log(token); // Logging the token value for debugging purposes
    try {
      setIsLoading(true);

      if (token) {
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
      }

      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      router.push(`${siteConfig.authorization.login}`);
      setIsLoading(false);
      setIsExpired(true);
      deleteCookie("token");
    }
  }, [router, token]);

  // import state from AuthStore
  const logout = async () => {
    deleteCookie("token"); // remove token from the cookie
    redirect("/"); // redirect to home page
  };

  return (
    // px-4 md:px-6

    <div className="bg-gray-800 text-muted-foreground ">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto flex h-12 w-full shrink-0 items-center">
        <div>
          <CountrySlimSelector />
        </div>
        <ModeToggle />
        <div className="ml-auto flex gap-2">
          <Separator orientation="vertical" />
          {!token ? (
            <div className="flex items-center gap-1">
              <Link href={siteConfig.authorization.login}>
                <Button
                  variant="link"
                  className="font-normal text-xs text-muted-foreground"
                >
                  Login
                </Button>
              </Link>
              <Slash className="size-4" />
              <Link href={siteConfig.authorization.register}>
                <Button
                  variant="link"
                  className="font-normal text-xs text-muted-foreground"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {isExpired ? (
                <div className="flex items-center gap-1">
                  <Link href={siteConfig.authorization.login}>
                    <Button
                      variant="link"
                      className="font-normal text-xs text-muted-foreground"
                    >
                      Login
                    </Button>
                  </Link>
                  <Slash className="size-4" />
                  <Link href={siteConfig.authorization.register}>
                    <Button
                      variant="link"
                      className="font-normal text-xs text-muted-foreground"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-1 items-center font-normal text-xs text-muted-foreground">
                  <Link
                    href={`${siteConfig.accounts.dashboard}`}
                    className="flex gap-1 underline-offset-4 hover:underline"
                  >
                    Welcome back{" "}
                    {isLoading ? (
                      <Skeleton></Skeleton>
                    ) : (
                      <div>
                        {auth?.firstName} {auth?.lastName}
                      </div>
                    )}
                  </Link>

                  <Slash className="size-4" />
                  <Button
                    onClick={logout}
                    variant="link"
                    className="font-normal text-xs text-muted-foreground"
                  >
                    Log out
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
