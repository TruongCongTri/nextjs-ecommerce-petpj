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

import { profileFormSchema } from "@/commons/formValidation";
import { Input } from "@/components/ui/input";
import {
  CountryData,
  PhoneInput,
} from "@/components/ui/customize/phoneInput/phone-input";
import { Country } from "@/components/ui/customize/countrySelector/country-select";
import { useRouter } from "next/navigation";
import { IUserType } from "@/models/authorization";
import { deleteCookie, getCookie } from "cookies-next";
import { siteConfig } from "@/data/site";
import { Skeleton } from "@/components/ui/skeleton";
import { Pen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Schema = z.infer<typeof profileFormSchema>;
export default function ProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [auth, setAuth] = useState<IUserType>();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<string>();

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
          setImage(authData.image);
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

  const defaultValues: Partial<Schema> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
  };

  const values: Schema = {
    firstName: auth?.firstName || "",
    lastName: auth?.lastName || "",
    email: auth?.email || "",
    phone: auth?.phone || "",
    image: image || "",
  };

  const form = useForm<Schema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
    values,
  });

  async function onSubmit(values: Schema) {
    try {
      // Assuming an async update profile function
      console.log(values);
      toast.success("Profile update successful.");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to update profile. Please try again.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countryData, setCountryData] = React.useState<CountryData>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
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
              <CardHeader className="border-b flex gap-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="font-medium text-xl">Account Setting</div>
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
              <CardContent className="py-6">
                <Form {...form}>
                  <form
                    className="space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="flex justify-between">
                      <div className="grid gap-4">
                        {/* first name field */}
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="grid gap-2">
                              <FormLabel htmlFor="fistName">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="firstName"
                                  placeholder="John"
                                  {...field}
                                  disabled={!isEdit || isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* last name field */}
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="grid gap-2">
                              <FormLabel htmlFor="lastName">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="lastName"
                                  placeholder="Doe"
                                  {...field}
                                  disabled={!isEdit || isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-between gap-4">
                          {/* email field */}
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="grid gap-2 w-full">
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    id="email"
                                    placeholder="johndoe@gmail.com"
                                    {...field}
                                    disabled={!isEdit || isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* phone Field */}
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="grid gap-2 w-full">
                                <FormLabel htmlFor="phone">Phone</FormLabel>
                                <FormControl>
                                  <PhoneInput
                                    {...field}
                                    value={field.value}
                                    placeholder="Enter your number"
                                    defaultCountry={selectedCountry?.alpha2}
                                    onCountryChange={setCountryData}
                                    disabled={!isEdit || isLoading}
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
                        >
                          Save Changes
                        </Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Avatar className="size-[120px]">
                          <AvatarImage src={image} alt={image} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem className="grid gap-2">
                              <VisuallyHidden>
                                <FormLabel htmlFor="image">Avatar</FormLabel>
                              </VisuallyHidden>
                              <FormControl>
                                <Input
                                  id="image"
                                  placeholder="insert image url"
                                  {...field}
                                  disabled={!isEdit || isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
