"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { CartItemsList } from "@/contexts/CartContext";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { billingFormSchema } from "@/commons/formValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CountryData,
  PhoneInput,
} from "@/components/ui/customize/phoneInput/phone-input";
import {
  Country,
  CountryDropdown,
} from "@/components/ui/customize/countrySelector/country-select";
import { Textarea } from "@/components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { paymentMethodData } from "@/data/paymentMethod";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/data/site";

type Schema = z.infer<typeof billingFormSchema>;

export default function CheckOutLayout() {
  const { cartItems, getCartTotal, clearAllCart } = React.useContext(
    CartContext
  ) as CartItemsList;

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countryData, setCountryData] = React.useState<CountryData>();

  const defaultValues: Partial<Schema> = {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    country: "",
    state: "",
    email: "",
    phone: "",
    zipCode: "",
  };
  const form = useForm<Schema>({
    resolver: zodResolver(billingFormSchema),
    defaultValues,
  });

  async function onSubmit(values: Schema) {
    try {
      // Assuming an async reset password function
      console.log(values);
      toast.success("Place Order successful.");
      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">
      //       {JSON.stringify(values, null, 2)}{" "}
      //       {JSON.stringify(cartItems, null, 2)}
      //     </code>
      //   </pre>
      // );
      clearAllCart();
      router.push(`${siteConfig.home}`);
    } catch (error) {
      console.error("Error placing order", error);
      toast.error("Failed to place order. Please try again.");
    }
  }

  return (
    <main className="">
      {cartItems.length !== 0 ? (
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6 md:gap-8 ">
              <div className="flex-1">
                <Card className="border-none rounded-none shadow-none">
                  <CardHeader className=" -p-6 pb-6">
                    <CardTitle>
                      <div className="font-medium text-2xl">
                        Billing Information
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className=" -p-6 pb-6">
                    <>
                      {cartItems.length === 0 ? (
                        <div>Cart is empty</div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-top gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="fistName">
                                    First Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="firstName"
                                      placeholder="John"
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="lastName">
                                    Last Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="lastName"
                                      placeholder="Doe"
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="company">
                                    Company (optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="company"
                                      placeholder="Company name"
                                      className=""
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem className="grid gap-2 flex flex-col justify-top">
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <FormControl>
                                  <Input
                                    id="address"
                                    placeholder="address..."
                                    disabled={
                                      isLoading || cartItems.length === 0
                                    }
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-between gap-4">
                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel>Country / Region</FormLabel>
                                  <CountryDropdown
                                    placeholder="Select country"
                                    defaultValue={field.value}
                                    onChange={(country) => {
                                      field.onChange(country.alpha3);
                                      setSelectedCountry(country);
                                      //Update PhoneInput
                                      setCountryData(country);
                                      form.setValue(
                                        "phone",
                                        country.countryCallingCodes[0]
                                      );
                                    }}
                                    disabled={
                                      isLoading || cartItems.length === 0
                                    }
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel>State</FormLabel>
                                  <CountryDropdown
                                    placeholder="Select state"
                                    defaultValue={field.value}
                                    onChange={(country) => {
                                      field.onChange(country.alpha3);
                                    }}
                                    disabled={
                                      isLoading || cartItems.length === 0
                                    }
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="zipCode">
                                    Zip Code
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="zipCode"
                                      placeholder="Zip Code"
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-between gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="email">Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="email"
                                      placeholder="johndoe@gmail.com"
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="phone">Phone</FormLabel>
                                  <FormControl>
                                    <PhoneInput
                                      {...field}
                                      value={field.value}
                                      placeholder="Enter your number"
                                      defaultCountry={selectedCountry?.alpha2}
                                      onCountryChange={setCountryData}
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <div className="font-medium text-2xl mb-6">
                              Additional Info
                            </div>
                            <FormField
                              control={form.control}
                              name="additional"
                              render={({ field }) => (
                                <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                                  <FormLabel htmlFor="additional">
                                    Order Notes (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      id="additional"
                                      placeholder="Notes about your order, e.g. special notes for delivery"
                                      disabled={
                                        isLoading || cartItems.length === 0
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full lg:w-80">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="font-medium text-xl">Order Summary</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      {cartItems.length !== 0 ? (
                        cartItems.map((o, idx) => (
                          // className="flex justify-center items-center"

                          <div
                            key={idx}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center gap-1">
                              <Image
                                src={`${
                                  o.thumbnail
                                    ? o.thumbnail
                                    : "/images/placeholder.svg"
                                }`}
                                alt={o.thumbnail || "image"}
                                width={60}
                                height={60}
                                className="aspect-square rounded-xl"
                              />
                              <div className="flex items-center gap-1">
                                <div className="font-normal text-sm">
                                  {o.title}
                                </div>
                                <X className="size-3" />
                                <div className="font-normal text-sm">
                                  {o.quantity}
                                </div>
                              </div>
                            </div>
                            <div className="font-semibold text-sm ">
                              {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(o.price)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Cart is empty</div>
                      )}
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between py-3">
                        <div className="font-normal text-sm text-muted-foreground">
                          Subtotal:
                        </div>
                        <div className="font-semibold text-sm">
                          {cartItems.length !== 0 &&
                            Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(getCartTotal())}
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div className="font-normal text-sm text-muted-foreground">
                          Shipping:
                        </div>
                        <div className="font-semibold text-sm">Free</div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div className="font-normal text-base text-muted-foreground">
                          Total
                        </div>
                        <div className="font-bold text-xl text-primary">
                          {cartItems.length !== 0 &&
                            Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(getCartTotal())}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="font-medium text-xl">Payment Method</div>
                      {/* form control payment method */}
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                            <VisuallyHidden>
                              <FormLabel htmlFor="paymentMethod">
                                Payment Method
                              </FormLabel>
                            </VisuallyHidden>
                            <FormControl>
                              <RadioGroup
                                id="paymentMethod"
                                defaultValue="comfortable"
                                disabled={isLoading || cartItems.length === 0}
                                {...field}
                              >
                                {paymentMethodData.map((o, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={o.type}
                                      id={o.type}
                                    />
                                    <Label
                                      htmlFor={o.type}
                                      className="font-normal text-muted-foreground"
                                    >
                                      {o.type}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  {cartItems.length !== 0 && (
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full rounded-full"
                        size="lg"
                        disabled={isLoading || cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <div className="font-semibold text-4xl text-center mb-8">
            Checkout Page
          </div>
          <div className="py-[80px] flex items-center justify-center">
            Cart is empty
          </div>
        </>
      )}
    </main>
  );
}
