"use client";
import React, { useState } from "react";
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

import { Input } from "@/components/ui/input";

import { contactFormSchema } from "@/commons/formValidation";
import { Textarea } from "../ui/textarea";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      setIsLoading(true);
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-2 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                <FormLabel htmlFor="name" hidden>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Your name"
                    type="text"
                    autoComplete="name"
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
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2 w-full flex flex-col justify-top">
                <FormLabel htmlFor="email" hidden>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Your email address"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
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
          name="subject"
          render={({ field }) => (
            <FormItem className="grid gap-2 w-full flex flex-col justify-top">
              <FormLabel htmlFor="subject" hidden>
                Subject
              </FormLabel>
              <FormControl>
                <Input
                  id="subject"
                  placeholder="Subject"
                  type="text"
                  autoComplete="subject"
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
          name="subject"
          render={({ field }) => (
            <FormItem className="grid gap-2 w-full flex flex-col justify-top">
              <FormLabel htmlFor="message" hidden>
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  id="message"
                  placeholder="message..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading || !form.formState.isValid}
          className="rounded"
          size="lg"
        >
          Send Message
        </Button>
      </form>
    </Form>
  );
}
