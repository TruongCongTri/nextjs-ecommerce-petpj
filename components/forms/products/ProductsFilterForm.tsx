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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

import { DualRangeSlider } from "@/components/ui/customize/range-slider";

import { ChevronDown, ChevronRight, SlidersHorizontalIcon } from "lucide-react";
import { MultiSelect } from "@/components/ui/customize/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_RATE,
  DEFAULT_SORT,
  FilterSchema,
  MAX_PRICE,
  MIN_PRICE,
  RATINGS,
} from "@/commons/filterValidation";
// import { fetchProductCategoryList } from "@/apis/fetchAPI/product";
// import { categoryList } from "@/commons/categories";
// import { productTagsList } from "@/commons/tags";
import {
  fetchProductCategoryList,
  fetchProductTagList,
} from "@/apis/fetchAPI/product";
import { LoadingSpinner } from "@/components/icons/loading-icon";

type Schema = z.infer<typeof FilterSchema>;

export default function ProductsFilterForm() {
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
      const res = await fetchProductTagList();
      // // const data = await res.json();
      setTagList(res);
      // setTagList(productTagsList);
      setIsTagLoading(false);
    };
    fetchCates();
    fetchTags();
  }, []);
  const router = useRouter();
  const searchParams = useSearchParams();

  const catesParam = searchParams.getAll("cate") || "";
  const ratingParam = searchParams.get("rating") || DEFAULT_RATE;
  const priceStartParam = searchParams.get("priceStart") || `${MIN_PRICE}`;
  const priceEndParam = searchParams.get("priceEnd") || `${MAX_PRICE}`;
  const tagParams = searchParams.getAll("tag") || "";

  // const sortParam = searchParams.get("sort") || DEFAULT_SORT;
  // const currentPageParam = searchParams.get("page") || `${DEFAULT_PAGE}`;
  // const perPageParam = searchParams.get("perPage") || `${DEFAULT_PER_PAGE}`;

  const form = useForm<Schema>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      cates: catesParam,
      rating: ratingParam,
      price: [parseInt(priceStartParam), parseInt(priceEndParam)],
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
    let priceFrom = MIN_PRICE;
    let priceTo = MAX_PRICE;
    if (data.price) {
      priceFrom = data.price[0];
      priceTo = data.price[1];
    }
    router.push(
      `${siteConfig.proxy.shop}?${cateParamsList}&rating=${data.rating}&priceStart=${priceFrom}&priceEnd=${priceTo}&${tagParamsList}&sort=${DEFAULT_SORT}&page=${DEFAULT_PAGE}&perPage=${DEFAULT_PER_PAGE}`
      // `${siteConfig.proxy.shop}?${cateParamsList}&rating=${data.rating}&price=${data.price}&${tagParamsList}`
    );
  }

  //
  const [openCate, setOpenCate] = React.useState(true);
  const [openPrice, setOpenPrice] = React.useState(true);
  const [openRating, setOpenRating] = React.useState(true);
  const [openTag, setOpenTag] = React.useState(true);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <Button type="submit" className="rounded-full mx-4" size="lg">
          Filter <SlidersHorizontalIcon />
        </Button>
        <div className="h-[400px] overflow-y-scroll lg:h-full lg:overflow-auto space-y-6 px-4">
          <FormField
            control={form.control}
            name="cates"
            render={() => (
              <FormItem className=" w-full flex flex-col justify-top">
                <Collapsible
                  className="w-full space-y-5"
                  open={openCate}
                  onOpenChange={setOpenCate}
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full inline-flex items-center justify-center">
                      <FormLabel className="text-xl font-medium">
                        All Categories
                      </FormLabel>
                      {openCate ? (
                        <ChevronDown className="ml-auto" />
                      ) : (
                        <ChevronRight className="ml-auto" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4">
                    {isCateLoading ? (
                      <div className="w-full flex justify-center items-center">
                        <LoadingSpinner />
                      </div>
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
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
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
            name="price"
            render={({ field: { value, onChange } }) => (
              <FormItem className=" w-full flex flex-col justify-top">
                <Collapsible
                  className="w-full space-y-5"
                  open={openPrice}
                  onOpenChange={setOpenPrice}
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full inline-flex items-center justify-center">
                      <FormLabel className="text-xl font-medium">
                        Price
                      </FormLabel>
                      {openPrice ? (
                        <ChevronDown className="ml-auto" />
                      ) : (
                        <ChevronRight className="ml-auto" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4">
                    <FormControl>
                      <DualRangeSlider
                        // label={(value) => <span>${value}</span>}
                        value={form.getValues("price")}
                        defaultValue={value}
                        onValueChange={(vals) => {
                          onChange(vals);
                        }}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={10}
                      />
                      {/* <DualRangeSlider
                      // label={(value) => <span>{value}$</span>}
                      value={values}
                      defaultValue={[10, 40000]}
                      onValueChange={setValues}
                      min={0}
                      max={40000}
                      step={10}
                    /> */}
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Price:{" "}
                      {value &&
                        Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(value[0])}{" "}
                      -{" "}
                      {value &&
                        Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(value[1])}
                    </FormDescription>
                  </CollapsibleContent>
                </Collapsible>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className=" w-full flex flex-col justify-top">
                <Collapsible
                  className="w-full space-y-5"
                  open={openRating}
                  onOpenChange={setOpenRating}
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full inline-flex items-center justify-center">
                      <FormLabel className="text-xl font-medium">
                        Rating
                      </FormLabel>
                      {openRating ? (
                        <ChevronDown className="ml-auto" />
                      ) : (
                        <ChevronRight className="ml-auto" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col justify-center space-y-4"
                      >
                        {RATINGS.map((o, idx) => (
                          <FormItem
                            key={idx}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={o.key} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {o.value}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </CollapsibleContent>
                </Collapsible>

                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className=" w-full flex flex-col justify-top">
                <Collapsible
                  className="w-full space-y-5"
                  open={openTag}
                  onOpenChange={setOpenTag}
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full inline-flex items-center justify-center">
                      <FormLabel className="text-xl font-medium">
                        Tags
                      </FormLabel>
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
        </div>
      </form>
    </Form>
  );
}
