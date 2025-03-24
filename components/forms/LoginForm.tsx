"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { loginFormSchema } from "@/commons/formValidation";
import { PasswordInput } from "../ui/customize/inputs/password-input";
import { siteConfig } from "@/data/site";

type Schema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestUrl = searchParams.get("nextRequest");

  const [isLoading, setIsLoading] = useState(false);

  // import state from AuthStore

  const form = useForm<Schema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: Schema) {
    try {
      console.log(values);
      setIsLoading(true);

      // do a post call to the auth endpoint
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.getValues("username"),
          password: form.getValues("password"),
        }),
      });

      // check if response was ok
      if (!res.ok) {
        console.log("Error", res);
        toast.error("Oops! Fail to Login.");

        setIsLoading(false);
        return console.error(res);
      }

      toast.success("Login success");
      // retrieve data from the response
      const data = await res.json();
      setCookie("token", data?.accessToken); // set token to the cookie

      if (requestUrl) {
        router.push(`${requestUrl}`); // redirect to home page
      } else {
        router.push(`${siteConfig.home}`); // redirect to home page
      }
      // check if we have data
      // if (data) {
      //   const authRes = await fetch("https://dummyjson.com/auth/me", {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${data.accessToken}`, // Pass JWT via Authorization header
      //     },
      //     // credentials: "include", // Include cookies (e.g., accessToken) in the request
      //   });
      //   if (!authRes.ok) {
      //     return console.error(authRes);
      //   }
      //   console.log(`get auth by token success`);
      //   const userData = await authRes.json();
      //   setUser(userData);
      //   setAuthentication(true); // set our authentication state to true
      //   setCookie("token", data?.accessToken); // set token to the cookie

      //   if (requestUrl) {
      //     router.push(`${requestUrl}`); // redirect to home page
      //   } else {
      //     router.push(`${siteConfig.home}`); // redirect to home page
      //   }
      // }
      setIsLoading(false);
      console.log("Success!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 flex flex-col justify-top">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="ex@gmail.com"
                          type="text"
                          autoComplete="username"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 flex flex-col justify-top">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href={siteConfig.authorization.forgotPassword}
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button
              variant="link"
              onClick={() =>
                requestUrl
                  ? router.push(
                      `${siteConfig.authorization.register}?nextRequest=${requestUrl}`
                    )
                  : router.push(`${siteConfig.authorization.register}`)
              }
            >
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
