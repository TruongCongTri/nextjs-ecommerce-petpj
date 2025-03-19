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

import { addressFormSchema } from "@/commons/formValidation";
import { Input } from "@/components/ui/input";
import { Country } from "../../ui/customize/countrySelector/country-select";
import {
  CountryData,
  PhoneInput,
} from "@/components/ui/customize/phoneInput/phone-input";
import { CountryDropdown } from "@/components/ui/customize/countrySelector/country-select";
import { useRouter } from "next/navigation";
import { IUserType } from "@/models/authorization";
import { deleteCookie, getCookie } from "cookies-next";
import { siteConfig } from "@/data/site";
import { Skeleton } from "@/components/ui/skeleton";
import { Pen } from "lucide-react";

type Schema = z.infer<typeof addressFormSchema>;

export default function ProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [auth, setAuth] = useState<IUserType>();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
  const [countryData, setCountryData] = React.useState<CountryData>();

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

  const defaultValues: Partial<Schema> = {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    // country: "",
    email: "",
    phone: "",
  };

  const values: Schema = {
    firstName: auth?.firstName || "",
    lastName: auth?.lastName || "",
    company: auth?.company.name || "",
    address: auth?.address.address || "",
    // country: auth?.address.country || "",
    email: auth?.email || "",
    phone: auth?.phone || "",
  };

  const form = useForm<Schema>({
    resolver: zodResolver(addressFormSchema),
    defaultValues,
    mode: "onChange",
    values,
  });

  async function onSubmit(values: Schema) {
    try {
      // Assuming an async reset password function
      console.log(values);
      toast.success("Address update successful.");
    } catch (error) {
      console.error("Error updating address", error);
      toast.error("Failed to update address. Please try again.");
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
                  Billing Address{" "}
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
                      <div className="flex justify-between gap-4">
                        {/* first name field */}
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="grid gap-2 w-full">
                              <FormLabel htmlFor="fistName">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="firstName"
                                  placeholder="John"
                                  disabled={!isEdit || isLoading}
                                  {...field}
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
                            <FormItem className="grid gap-2 w-full">
                              <FormLabel htmlFor="lastName">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="lastName"
                                  placeholder="Doe"
                                  disabled={!isEdit || isLoading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* last name field */}
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem className="grid gap-2 w-full">
                              <FormLabel htmlFor="company">
                                Company (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="company"
                                  placeholder="company name..."
                                  disabled={!isEdit || isLoading}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="address">
                              Street Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="address"
                                placeholder="address..."
                                disabled={!isEdit || isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between gap-4">
                        {/* <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Country</FormLabel>
                              <CountryDropdown
                                placeholder="Select country"
                                defaultValue={field.value}
                                onChange={(country) => {
                                  field.onChange(country.alpha3);
                                  // setSelectedCountry(country);
                                  // Update PhoneInput
                                  // setCountryData(country);
                                  // form.setValue(
                                  //   "phone",
                                  //   country.countryCallingCodes[0]
                                  // );
                                }}
                                disabled={!isEdit || isLoading}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}
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
                      {/* new password field */}
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
                                disabled={!isEdit || isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Confirm Password Field */}

                      {/* btn */}
                      <Button
                        type="submit"
                        className={`mr-auto ${!isEdit && "hidden"}`}
                      >
                        Save Changes
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
