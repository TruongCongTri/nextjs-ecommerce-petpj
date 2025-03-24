"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { siteConfig } from "@/data/site";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

import { MultiSelect } from "@/components/ui/customize/multi-select";

import { ChevronDown, ChevronRight, SlidersHorizontalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE_BLOG,
  DEFAULT_SORT,
  PostFormSchema,
} from "@/commons/filterValidation";

// import { categoryList } from "@/commons/categories";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { postTagsList } from "@/commons/tags";
import { fetchProductCategoryList } from "@/apis/fetchAPI/product";
import { fetchPostTagList } from "@/apis/fetchAPI/post";

type Schema = z.infer<typeof PostFormSchema>;
export default function BlogsFilterForm() {
  const [catList, setCateList] = useState<string[]>();
  const [isCateLoading, setIsCateLoading] = useState(true);
  const [tagList, setTagList] = useState<string[]>([]);
  const [isTagLoading, setIsTagLoading] = useState(true);

  useEffect(() => {
    const fetchCates = async () => {
      const res = await fetchProductCategoryList();
      // // const data = await res.json();
      setCateList(res);
      // setCateList(categoryList);
      setIsCateLoading(false);
    };
    const fetchTags = async () => {
      const res = await fetchPostTagList();;
      // // const data = await res.json();
      setTagList(res);
      // setTagList(postTagsList);
      setIsTagLoading(false);
    };
    fetchCates();
    fetchTags();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const catesParam = searchParams.getAll("cate") || "";
  const tagParams = searchParams.getAll("tag") || "";
  const queryParam = searchParams.get("query") || "";

  // const sortParam = searchParams.get("sort") || DEFAULT_SORT;
  // const currentPageParam = searchParams.get("page") || DEFAULT_PAGE;
  // const perPageParam = searchParams.get("perPage") || DEFAULT_PER_PAGE_BLOG;

  const form = useForm<Schema>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      query: queryParam,
      cates: catesParam,
      tags: tagParams,
    },
  });

  function onSubmit(data: Schema) {
    let cateParamsList = "";
    if (data.cates) {
      data.cates.map((o, idx) => {
        if (idx + 1 === data.cates?.length) {
          cateParamsList += `cate=${o}`;
        } else {
          cateParamsList += `cate=${o}&`;
        }
      });
    }
    let tagParamsList = "";
    if (data.tags) {
      data.tags.map((o, idx) => {
        if (idx + 1 === data.tags?.length) {
          tagParamsList += `tag=${o}`;
        } else {
          tagParamsList += `tag=${o}&`;
        }
      });
    }

    router.push(
      `${siteConfig.proxy.blog}?${cateParamsList}&${tagParamsList}&query=${data.query}&sort=${DEFAULT_SORT}&page=${DEFAULT_PAGE}&perPage=${DEFAULT_PER_PAGE_BLOG}`
    );
  }

  //
  const [openCate, setOpenCate] = React.useState(true);
  const [openTag, setOpenTag] = React.useState(true);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Button type="submit" className="rounded-full w-full">
          Filter <SlidersHorizontalIcon />
        </Button>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <VisuallyHidden>
                <FormLabel className="text-xl font-medium">Search</FormLabel>
              </VisuallyHidden>
              <FormControl>
                <Input placeholder="Search..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="cates"
          render={() => (
            <FormItem>
              <Collapsible
                className="w-full space-y-5"
                open={openCate}
                onOpenChange={setOpenCate}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full inline-flex items-center justify-center">
                    <FormLabel className="text-xl font-medium">Categories</FormLabel>
                    {openCate ? (
                      <ChevronDown className="ml-auto" />
                    ) : (
                      <ChevronRight className="ml-auto" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  {isCateLoading ? (
                    <div>Loading categories...</div>
                  ) : (
                    <ScrollArea className="h-[200px] ">
                      {catList?.map((item, idx) => (
                        <FormField
                          key={idx}
                          control={form.control}
                          name="cates"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={idx}
                                className="flex flex-row items-center space-x-4 "
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(`${item}`)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal ">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </ScrollArea>
                  )}

                  <FormMessage />
                </CollapsibleContent>
              </Collapsible>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <Collapsible
                className="w-full space-y-5"
                open={openTag}
                onOpenChange={setOpenTag}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full inline-flex items-center justify-center">
                    <FormLabel className="text-xl font-medium">Tags</FormLabel>
                    {openTag ? (
                      <ChevronDown className="ml-auto" />
                    ) : (
                      <ChevronRight className="ml-auto" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <FormControl>
                    <MultiSelect
                      options={tagList}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                      disabled={isTagLoading}
                    />
                  </FormControl>
                </CollapsibleContent>
              </Collapsible>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
