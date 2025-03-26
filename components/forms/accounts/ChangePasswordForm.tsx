"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { resetPasswordFormSchema } from "@/commons/formValidation";
import { PasswordInput } from "@/components/ui/customize/inputs/password-input";
import { useRouter } from "next/navigation";
import { IUserType } from "@/models/authorization";
import { deleteCookie, getCookie } from "cookies-next";
import { siteConfig } from "@/data/site";
import { Pen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Schema = z.infer<typeof resetPasswordFormSchema>;

export default function ChangePasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, setAuth] = useState<IUserType>();
  const [isEdit, setIsEdit] = useState(false);

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

  const form = useForm<Schema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: Schema) {
    try {
      // Assuming an async reset password function
      console.log(values);
      toast.success("Password reset successful.");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to reset password. Please try again.");
    }
  }
  return (
    <>
      {isLoading ? (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">
              <Skeleton className="h-10 w-[200px]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="lg:flex lg:justify-between lg:gap-4">
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ) : (
        <>
          {!isExpired && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-2xl  flex items-center gap-2">
                  <div className="font-medium text-xl">Change Password</div>
                  <Button
                    onClick={() => setIsEdit(true)}
                    className={`mr-auto ${isEdit && "hidden"}`}
                    disabled={isLoading}
                    variant="ghost"
                  >
                    <Pen />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    className="space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="grid gap-4">
                      {/* current password field */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                            <FormLabel htmlFor="current-password">
                              Current Password
                            </FormLabel>
                            <FormControl>
                              <PasswordInput
                                id="password"
                                placeholder="******"
                                disabled={!isEdit || isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between gap-4">
                        {/* new password field */}
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                              <FormLabel htmlFor="password">
                                New Password
                              </FormLabel>
                              <FormControl>
                                <PasswordInput
                                  id="password"
                                  placeholder="******"
                                  autoComplete="new-password"
                                  disabled={!isEdit || isLoading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Confirm Password Field */}
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                              <FormLabel htmlFor="confirmPassword">
                                Confirm Password
                              </FormLabel>
                              <FormControl>
                                <PasswordInput
                                  id="confirmPassword"
                                  placeholder="******"
                                  autoComplete="new-password"
                                  disabled={!isEdit || isLoading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* btn */}
                      <Button
                        type="submit"
                        size="lg"
                        className={`mr-auto font-semibold text-sm rounded-full ${
                          !isEdit && "hidden" 
                        }`}
                        disabled={!form.formState.isValid}
                        // disabled={!form.formState.isDirty}
                      >
                        Change Password
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </>
  );
}
