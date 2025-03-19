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

import { commentFormSchema } from "@/commons/formValidation";
import { Textarea } from "../ui/textarea";

type Schema = z.infer<typeof commentFormSchema>;
export default function CommentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Schema>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: Schema) {
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
              <FormItem className="grid gap-2 w-full ">
                <FormLabel htmlFor="name">
                  Full Name
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
              <FormItem className="grid gap-2 w-full ">
                <FormLabel htmlFor="email">
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
          name="message"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="message">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  id="message"
                  placeholder="Write your comment here…..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="rounded-full px-10">
          Post Comments
        </Button>
      </form>
    </Form>
  );
}
